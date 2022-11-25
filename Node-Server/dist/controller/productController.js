"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const storage_1 = require("firebase/storage");
const mongoose_1 = __importDefault(require("mongoose"));
const firebase_1 = require("../firebase");
const FavouriteProducts_1 = require("../model/FavouriteProducts");
const Products_1 = require("../model/Products");
const User_1 = require("../model/User");
const utils_1 = require("../utils");
const utils = new utils_1.Utilities();
class ProductController {
    constructor() {
        this.upload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const file = req.file;
            const imageRef = (0, storage_1.ref)(firebase_1.storage, file.originalname);
            const metatype = { contentType: file.mimetype, name: file.originalname };
            try {
                yield (0, storage_1.uploadBytes)(imageRef, file.buffer, metatype)
                    .then((snapshot) => {
                    console.log(snapshot);
                    return res.json({
                        message: "Image uploaded!"
                    });
                });
            }
            catch (error) {
                return res.json({
                    error: error
                });
            }
        });
        this.getImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const listRef = (0, storage_1.ref)(firebase_1.storage);
            let productPictures = [];
            yield (0, storage_1.listAll)(listRef)
                .then((image) => {
                productPictures = image.items.map((item) => {
                    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`;
                    return {
                        url: publicUrl,
                        name: item._location.path_,
                    };
                });
                return res.json({
                    pictures: productPictures
                });
            });
            return res.json({
                pics: 'got'
            });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, req.body);
            try {
                const IsAdmin = yield User_1.UserModel.findOne({
                    _id: args._id,
                    user: User_1.UserType.ADMIN,
                });
                if (!IsAdmin) {
                    return res.json({
                        message: "Invalid user for product creation",
                    });
                }
                const productDetail = new Products_1.productModel({
                    userId: IsAdmin.id,
                    img: args.img,
                    pname: args.pname,
                    description: args.description,
                    price: args.price,
                    discount: args.discount,
                    tax: args.tax,
                });
                const totalAmount = yield utils.getTotalAmount(args.price, args.tax, args.discount);
                productDetail.totalAmount = totalAmount;
                yield productDetail.save();
                return res.json({
                    message: "Product created succesfully",
                });
            }
            catch (error) {
                console.log(error, "product creation error");
                return res.json({
                    error: error,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign(Object.assign({}, req.body), req.params);
            if (params && typeof params === "object") {
                const args = Object.assign({}, params);
                try {
                    const productDetail = yield Products_1.productModel.findById({
                        _id: args.productId,
                    });
                    if (!productDetail) {
                        return res.json({
                            message: "Invalid productId",
                        });
                    }
                    const updatedPrice = args.price
                        ? args.price
                        : productDetail.price;
                    const updatedTax = args.tax ? args.tax : productDetail.tax;
                    const updatedDiscount = args.discount
                        ? args.discount
                        : productDetail.discount;
                    const calculateTotalAmount = yield utils.getTotalAmount(updatedPrice, updatedTax, updatedDiscount);
                    const product = yield Products_1.productModel.findByIdAndUpdate({ _id: args.productId }, {
                        pname: args.pname ? args.pname : productDetail.pname,
                        description: args.description
                            ? args.description
                            : productDetail.description,
                        price: updatedPrice,
                        discount: updatedDiscount,
                        tax: updatedTax,
                        totalAmount: calculateTotalAmount,
                    });
                    if (!product) {
                        return res.json({
                            message: "Invalid productId",
                        });
                    }
                    return res.json({
                        message: "Product Update succesfully",
                    });
                }
                catch (error) {
                    return res.json({
                        error: error,
                    });
                }
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign(Object.assign({}, req.body), req.params);
            try {
                if (params && typeof params === "object") {
                    const args = Object.assign({}, params);
                    if (args.productId) {
                        const response = yield Products_1.productModel.deleteOne({
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
            }
            catch (error) {
                return res.json({
                    error: error,
                });
            }
        });
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('aya');
            const args = Object.assign({}, req.query);
            const pipeline = [
                {
                    $match: {
                        $or: [
                            { pname: { $regex: new RegExp(args.search || '', 'i') } },
                        ]
                    }
                }
            ];
            if (args.userId) {
                try {
                    const IsAdmin = yield User_1.UserModel.findOne({
                        _id: args.userId,
                        user: User_1.UserType.ADMIN,
                    });
                    if (!IsAdmin) {
                        return res.json({
                            message: "Invalid user to get product",
                        });
                    }
                    pipeline.push({ $match: { userId: new mongoose_1.default.Types.ObjectId(args.userId) } });
                }
                catch (error) {
                    return res.json({
                        error: error,
                    });
                }
            }
            if (args.productId) {
                pipeline.push({ $match: { _id: new mongoose_1.default.Types.ObjectId(args.productId) } });
            }
            if (args.offset) {
                pipeline.push({ $skip: args.offset ? Number(args.offset) : 0 });
            }
            if (args.rows) {
                pipeline.push({ $limit: args.rows ? Number(args.rows) : 10 });
            }
            if (args.sort) {
                let _sort = null;
                switch (args.sort) {
                    case 'NEWEST':
                        _sort = { createdAt: -1 };
                        break;
                    case 'OLDEST':
                        _sort = { createdAt: 1 };
                        break;
                    default:
                        break;
                }
                if (_sort) {
                    pipeline.push({ $sort: _sort });
                }
            }
            const response = yield Products_1.productModel.aggregate(pipeline);
            return res.json({
                products: response,
            });
        });
        this.toggleCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign(Object.assign(Object.assign({}, req.body), req.query), req.params);
            if (!args.productId) {
                return res.json({
                    message: "invalid data found",
                });
            }
            try {
                const productFound = yield FavouriteProducts_1.FavouriteProductModel.findOne({
                    userId: args._id,
                    productId: args.productId,
                });
                if (productFound) {
                    yield FavouriteProducts_1.FavouriteProductModel.deleteOne({ _id: productFound._id });
                }
                else {
                    yield FavouriteProducts_1.FavouriteProductModel.create({
                        userId: args._id,
                        productId: args.productId,
                    });
                }
                return res.json({
                    res: true,
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: error,
                });
            }
        });
        this.getCartProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign(Object.assign({}, req.body), req.query);
            const productDetail = [];
            let product;
            try {
                const response = yield FavouriteProducts_1.FavouriteProductModel.find({ userId: args._id });
                if (!response) {
                    return res.json({
                        message: "invalide user Id",
                    });
                }
                for (let i = 0; i < response.length; i++) {
                    product = yield Products_1.productModel.findById({ _id: response[i].productId });
                    productDetail.push(product);
                }
                return res.json({
                    cart: productDetail,
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: error,
                });
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map