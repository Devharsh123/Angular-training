import { getModelForClass, prop } from "@typegoose/typegoose";

export enum UserType {
    ADMIN = 'admin',
    CUSTOMER = 'customer'
}

// class Cart {
//     @prop({ type: () => String })
//     productId?: string
// }

class User {
    @prop({ type: () => String, required: true })
    public name!: string;

    @prop({ type: () => String, required: true, unique: true })
    public email!: string;

    @prop({ type: () => String, required: true })
    public password!: string;

    @prop({ type: () => String, required: true })
    public dob!: string;

    @prop({ type: () => String, required: true })
    public address!: string

    @prop({ type: () => Number, required: true })
    public phone!: number

    @prop({ type: () => String, enum: Object.values(UserType), default: UserType.CUSTOMER })
    user!: string

}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } })