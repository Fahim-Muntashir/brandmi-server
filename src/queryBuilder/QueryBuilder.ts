/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Document } from "mongoose";

export interface IPaginationResult {
    totalDocuments: number;
    limitPage: number;
    currentPage: number;
    totalPage: number;
    hasNextPage: boolean;
    filterResult: number;
}

interface IQuery {
    searchTerm?: string;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    page?: string;
    limit?: string;
    [key: string]: any;

}

export class AggregationQueryBuilder<T extends Document> {
    private model: Model<T>;
    private query: IQuery;
    private aggregationPipeline: any[] = [];
    private page: number = 1;
    private limit: number = 5;
    private sortField = "createdAt"
    private sortOrder = -1

    constructor(query: IQuery, model: Model<T>) {
        this.query = query;
        this.model = model;
    }
    applyProject(projection: any = {}): this {

        this.aggregationPipeline.push(
            {
                $project: projection
            }
        );
        return this

    }

    // Apply filters
    // filter(): this {
    //     const queryRef = { ...this.query } // reference of main query
    //     const excludedFields = ['searchTerm', 'sortField', 'sortOrder', 'page', 'limit', "price", "maxPrice", "minPrice"];
    //     excludedFields.forEach(field => delete queryRef[field as keyof IQuery]);
    //     const matchConditions: any[] = [];

    //     // Handle general filters
    //     if (queryRef) {
    //         Object.entries(queryRef).forEach(([key, value]) => {
    //             matchConditions.push({ [key]: value });
    //         });
    //     }

    //     // Combine conditions with $and if necessary
    //     if (matchConditions.length > 0) {
    //         this.aggregationPipeline.push({ $match: { $and: matchConditions } });
    //     }

    //     return this;
    // }

    // Apply search
    search(searchableFields: (keyof T | string)[]): this {
        if (this.query.searchTerm) {
            const searchConditions = searchableFields.map((field) => ({
                [field]: { $regex: this.query.searchTerm, $options: "i" },
            }));
            this.aggregationPipeline.push({ $match: { $or: searchConditions } });
        }
        return this;
    }

    filterByPackagePrice(): this {
        if (this.query.minPrice && this.query.maxPrice) {
            const minPrice = Number(this.query.minPrice);
            const maxPrice = Number(this.query.maxPrice);

            this.aggregationPipeline.push(
                // Unwind the packages array
                { $unwind: "$packages" },

                // Match the packages within the minPrice and maxPrice range
                {
                    $match: {
                        "packages.price": {
                            $gte: minPrice,
                            $lte: maxPrice
                        }
                    }
                },


            );
        }
        if (this.query.type) {


            this.aggregationPipeline.push(
                // Unwind the packages array
                { $unwind: "$packages" },

                // Match the packages within the minPrice and maxPrice range
                {
                    $match: {
                        "packages.type": this.query.type
                    }
                },


            );
        }
        return this;
    }

    // Apply sorting
    sort(): this {
        if (this.query.sortField && this.query.sortOrder) {
            this.sortField = this.query.sortField
            this.sortOrder = this.query.sortOrder === "desc" ? -1 : 1;

            // this.aggregationPipeline.push({ $sort: { [this.query.sortField]: sortOrder } });
        }
        //  else {
        //     this.aggregationPipeline.push({ $sort: { [this.sortField]: this.sortOrder } });

        // }
        return this;
    }

    // Apply pagination
    pagination(): this {
        if (this.query.page) {
            this.page = parseInt(this.query.page, 10);
        }
        if (this.query.limit) {
            this.limit = parseInt(this.query.limit, 10);
        }
        // const skip = (this.page - 1) * this.limit;
        // this.aggregationPipeline.push({ $skip: skip }, { $limit: this.limit });
        return this;
    }

    // Execute the aggregation pipeline
    async execute(): Promise<T[]> {
        const skip = (this.page - 1) * this.limit;

        return await this.model.aggregate(this.aggregationPipeline).limit(this.limit).skip(skip).sort({ [this.sortField]: this.sortOrder as any })
    }

    // Generate metadata for pagination
    async metaData(): Promise<IPaginationResult> {
        const totalDocuments = await this.model.countDocuments().exec();
        const filteredPipeline = [...this.aggregationPipeline];
        filteredPipeline.push({ $count: "filterResult" });
        const filterResult = (await this.model.aggregate(filteredPipeline).exec())[0]?.filterResult || 0;
        const totalPage = Math.ceil(filterResult / this.limit);
        const hasNextPage = this.page < totalPage;
        return {
            totalDocuments,
            filterResult,
            limitPage: this.limit,
            currentPage: this.page,
            totalPage,
            hasNextPage,
        };
    }
}
