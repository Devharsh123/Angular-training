import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { firebaseUrl } from "../utils";


class ProductComment {
    @prop({ type: () => String })
    userCommented: string;

    @prop({ type: () => String })
    comment: string;
}

export class Product {
    @prop({ type: () => mongoose.Types.ObjectId })
    userId!: mongoose.Types.ObjectId;

    @prop({ set:(val: string)=>firebaseUrl + val,get:(val:string)=> val,type: ()=> String})
    img!: string;

    @prop({ type: () => String })
    pname!: string;

    @prop({ type: () => String })
    description!: string;

    @prop({ type: () => Number })
    price!: number;

    @prop({ type: () => Number, default: 0 })
    discount?: number;

    @prop({ type: () => Number, default: 0 })
    tax?: number

    @prop({ type: () => Number, default: 0 })
    totalAmount: number

    @prop({ type: () => [ProductComment] })
    comments: ProductComment[]
}

export const productModel = getModelForClass(Product, { schemaOptions: { timestamps: true } })