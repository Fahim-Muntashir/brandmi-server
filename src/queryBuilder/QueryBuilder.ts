/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Document, FilterQuery } from "mongoose";
import BuyerProfileModel from "../modules/buyerProfile/buyerProfile.models";

export const demoModel = BuyerProfileModel.find({

});

interface IQuey {
    searchTerm?: string;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    page?: string;
    limit?: string;
    filterKey?: string;
    filterValue?: string;
}

export class QueryBuilder<T extends Document> {
    private model: Model<T>;
    private query: IQuey;
    constructor(query: IQuey, model: Model<T>) {
        this.query = query;
        this.model = model;
    }

    //    default value :
    private queryObj: FilterQuery<T> = {};
    private page: number = 1;
    private limit: number = 10;
    private sortField: string | null = null;
    private sortOrder: 1 | -1 = 1;
    private projection: any = null;

    // Add projections to limit which fields are retrieved from the documents

    applyProjections(projectedField: string[]): this {
        this.projection = {};
        projectedField.forEach((field) => {
            this.projection[field] = 1;
        });
        return this;
    }

    search(searchableFields: (keyof T | string)[]) {
        if (this.query.searchTerm) {
            this.queryObj.$or = searchableFields.map((field) => {
                return {
                    [field]: {
                        $regex: this.query.searchTerm,
                        $options: "i", // Note the lowercase "options" for case-insensitive search
                    },
                };
            }) as FilterQuery<T>[];
        }
        return this;
    }

    sort(): this {

        if (this.query.sortField && this.query.sortOrder) {
            this.sortField = this.query.sortField
            this.sortOrder = this.query.sortOrder === "desc" ? -1 : 1
        }
        return this
    }


    pagination() {
        if (this.query.page) {
            this.page = parseInt(this.query.page)
        }
        if (this.query.limit) {
            this.limit = parseInt(this.query.limit)

        }
    }


    async execute(): Promise<T[]> {
        const skip = (this.page - 1) * this.limit
        const queryOperation = this.model.find(this.queryObj, this.projection).skip(skip).limit(this.limit)
        if (this.sortField) {
            queryOperation.sort({
                [this.sortField]: this.sortOrder
            })
        }
        return await queryOperation.exec()
    }

    async metaData() {
        const totalDocuments = await this.model.countDocuments().exec()
        const filterResult = await this.model.countDocuments(this.queryObj).exec()

        // 3. Calculate total pages based on filtered results
        const totalPage = Math.ceil(totalDocuments / this.limit);
        const hasNextPage = this.page < totalPage;
        return {
            totalDocuments,             // Total documents after filter is applied
            filterResult,         // Total documents in the whole collection
            limitPage: this.limit,      // The limit (documents per page)
            currentPage: this.page,     // Current page number
            totalPage,                  // Total number of pages based on filtered documents
            hasNextPage,                // Whether there are more pages to display
        };
    }


}
