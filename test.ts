/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Document } from "mongoose";


interface IQuey {
    filters?: Record<string, any>;
}

export class QueryBuilder<T extends Document> {
    private model: Model<T>;
    private query: IQuey;
    constructor(query: IQuey, model: Model<T>) {
        this.query = query;
        this.model = model;
    }


    //    default value :
    private queryObj: Record<string, any> = {};


    async execute(): Promise<T[]> {

        const queryOperation = this.model.find(this.queryObj,)

        return await queryOperation.exec()
    }




}

// const services = await queryHandler.filter(["price", "category"]).execute()