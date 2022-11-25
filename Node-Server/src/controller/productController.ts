import { Request, Response } from "express";
import { listAll, ref, uploadBytes } from 'firebase/storage';
import mongoose from "mongoose";
import {
    createProductPayload,
    updateProductPayload,
    deleteProductPayload,
    getProductPayload,
    toggleFavouriteProductPayload,
    getCartPayload,
} from "../dto/UserDto";
import { storage } from "../firebase";
import { FavouriteProductModel } from "../model/FavouriteProducts";
import { Product, productModel } from "../model/Products";
import { UserModel, UserType } from "../model/User";
import { Utilities } from "../utils";

const utils = new Utilities();

export class ProductController {

    upload = async (req: Request, res: Response): Promise<Response> => {
        const file = req.file
        const imageRef = ref(storage, file.originalname)
        const metatype = { contentType: file.mimetype, name: file.originalname }
        try {
            await uploadBytes(imageRef, file.buffer, metatype)
                .then((snapshot) => {
                    console.log(snapshot)
                    return res.json({
                        message: "Image uploaded!"
                    })
                })
        } catch (error) {
            return res.json({
                error: error
            })
        }
    }

    getImage = async (req: Request, res: Response): Promise<Response> => {
        const listRef = ref(storage)
        let productPictures = []

        await listAll(listRef)
            .then((image) => {
                productPictures = image.items.map((item: any) => {
                    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
                    return {
                        url: publicUrl,
                        name: item._location.path_,
                    };
                });
                return res.json({
                    pictures: productPictures
                })
            })
        return res.json({
            pics: 'got'
        })
    }
    create = async (req: Request, res: Response): Promise<Response> => {
        const args: createProductPayload = { ...req.body };
        try {
            const IsAdmin = await UserModel.findOne({
                _id: args._id,
                user: UserType.ADMIN,
            });
            if (!IsAdmin) {
                return res.json({
                    message: "Invalid user for product creation",
                });
            }
            const productDetail = new productModel({
                userId: IsAdmin.id,
                img: args.img,
                pname: args.pname,
                description: args.description,
                price: args.price,
                discount: args.discount,
                tax: args.tax,
            });

            const totalAmount: number = await utils.getTotalAmount(
                args.price,
                args.tax,
                args.discount
            );
            productDetail.totalAmount = totalAmount;

            await productDetail.save();

            return res.json({
                message: "Product created succesfully",
            });
        } catch (error) {
            console.log(error, "product creation error");
            return res.json({
                error: error,
            });
        }
    };

    update = async (req: Request, res: Response): Promise<Response> => {
        const params: unknown = { ...req.body, ...req.params };
        if (params && typeof params === "object") {
            const args = { ...params } as updateProductPayload;

            try {
                const productDetail = await productModel.findById({
                    _id: args.productId,
                });
                if (!productDetail) {
                    return res.json({
                        message: "Invalid productId",
                    });
                }
                const updatedPrice: number = args.price
                    ? args.price
                    : productDetail.price;
                const updatedTax: number = args.tax ? args.tax : productDetail.tax;
                const updatedDiscount: number = args.discount
                    ? args.discount
                    : productDetail.discount;

                const calculateTotalAmount: number = await utils.getTotalAmount(
                    updatedPrice,
                    updatedTax,
                    updatedDiscount
                );
                const product = await productModel.findByIdAndUpdate(
                    { _id: args.productId },
                    {
                        pname: args.pname ? args.pname : productDetail.pname,
                        description: args.description
                            ? args.description
                            : productDetail.description,
                        price: updatedPrice,
                        discount: updatedDiscount,
                        tax: updatedTax,
                        totalAmount: calculateTotalAmount,
                    }
                );
                if (!product) {
                    return res.json({
                        message: "Invalid productId",
                    });
                }
                return res.json({
                    message: "Product Update succesfully",
                });
            } catch (error) {
                return res.json({
                    error: error,
                });
            }
        }
    };
    delete = async (req: Request, res: Response): Promise<Response> => {
        const params: unknown = { ...req.body, ...req.params };
        try {
            if (params && typeof params === "object") {
                const args = { ...params } as deleteProductPayload;
                if (args.productId) {
                    const response = await productModel.deleteOne({
                        _id: args.productId,
                    });
                    if (!response) {
                        return res.json({
                            message: "invalid productId",
                        });
                    }
                    return res.json({
                        message: "Product deleted successfully",
                    });
                }
            }
        } catch (error) {
            return res.json({
                error: error,
            });
        }
    };

    getProduct = async (req: Request, res: Response): Promise<Response> => {
    console.log('aya')
        const args: getProductPayload = { ...req.query };

        const pipeline: mongoose.PipelineStage[] = [
                {
                    $match: {
                        $or: [
                            { pname: { $regex: new RegExp(args.search || '', 'i') } },
                        ]
                    }
                }
        ]
        if (args.userId) {
        try {
        const IsAdmin = await UserModel.findOne({
            _id: args.userId,
            user: UserType.ADMIN,
        });

                if (!IsAdmin) {
                    return res.json({
                        message: "Invalid user to get product",
                    });
                }
                pipeline.push({ $match:{ userId: new mongoose.Types.ObjectId(args.userId) }});

            } catch (error) {
                return res.json({
                    error: error,
                });
            }
        }
        if (args.productId) {
            pipeline.push({ $match: { _id: new mongoose.Types.ObjectId(args.productId) } });
        }
        if (args.offset) {
            pipeline.push({ $skip: args.offset ? Number(args.offset) : 0 })
        }
        if (args.rows) {
            pipeline.push({ $limit: args.rows ? Number(args.rows) : 10 })
        }
        if (args.sort) {
            let _sort: Record<string, 1 | -1> | null = null

            switch (args.sort) {
                case 'NEWEST':
                    _sort = { createdAt: -1 }
                    break;
                case 'OLDEST':
                    _sort = { createdAt: 1 }
                    break;
                default:
                    break;
            }

            if (_sort) {
                pipeline.push({ $sort: _sort })
            }
        }
        const response = await productModel.aggregate(pipeline)
        return res.json({
            products: response,
        });
    };

    toggleCart = async (req: Request, res: Response): Promise<boolean | Response> => {
        const args: toggleFavouriteProductPayload = {
            ...req.body, ...req.query, ...req.params,
        };
        if (!args.productId) {
            return res.json({
                message: "invalid data found",
            });
        }
        try {
            const productFound = await FavouriteProductModel.findOne({
                userId: args._id,
                productId: args.productId,
            });
            if (productFound) {
                await FavouriteProductModel.deleteOne({ _id: productFound._id });
            } else {
                await FavouriteProductModel.create({
                    userId: args._id,
                    productId: args.productId,
                });
            }
            return res.json({
                res: true,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: error,
            });
        }
    };

    getCartProducts = async (req: Request, res: Response): Promise<Response> => {
        const args: getCartPayload = { ...req.body, ...req.query };
        const productDetail = [];
        let product: Product;
        try {
            const response = await FavouriteProductModel.find({ userId: args._id });
            if (!response) {
                return res.json({
                    message: "invalide user Id",
                });
            }
            for (let i = 0; i < response.length; i++) {
                product = await productModel.findById({ _id: response[i].productId });
                productDetail.push(product);
            }
            return res.json({
                cart: productDetail,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: error,
            });
        }
    };
}
