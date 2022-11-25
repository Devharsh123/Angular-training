import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

class FavouriteProduct {
    @prop({ type: () => mongoose.Types.ObjectId })
    userId!: mongoose.Types.ObjectId

    @prop({ type: () => mongoose.Types.ObjectId })
    productId!: mongoose.Types.ObjectId
}

export const FavouriteProductModel = getModelForClass(FavouriteProduct, { schemaOptions: { timestamps: true } })