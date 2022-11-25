"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
class ProductComment {
}
__decorate([
    (0, typegoose_1.prop)({ type: () => String })
], ProductComment.prototype, "userCommented", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String })
], ProductComment.prototype, "comment", void 0);
class Product {
}
__decorate([
    (0, typegoose_1.prop)({ type: () => mongoose_1.default.Types.ObjectId })
], Product.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ set: (val) => utils_1.firebaseUrl + val, get: (val) => val, type: () => String })
], Product.prototype, "img", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String })
], Product.prototype, "pname", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String })
], Product.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number })
], Product.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number, default: 0 })
], Product.prototype, "discount", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number, default: 0 })
], Product.prototype, "tax", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number, default: 0 })
], Product.prototype, "totalAmount", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [ProductComment] })
], Product.prototype, "comments", void 0);
exports.Product = Product;
exports.productModel = (0, typegoose_1.getModelForClass)(Product, { schemaOptions: { timestamps: true } });
//# sourceMappingURL=Products.js.map