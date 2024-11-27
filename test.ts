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


    filter(): this {
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




    // Execute the aggregation pipeline
    async execute(): Promise<T[]> {
        const skip = (this.page - 1) * this.limit;

        return await this.model.aggregate(this.aggregationPipeline).limit(this.limit).skip(skip).sort({ [this.sortField]: this.sortOrder as any })
    }


}
