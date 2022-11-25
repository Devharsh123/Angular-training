"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserType = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "admin";
    UserType["CUSTOMER"] = "customer";
})(UserType = exports.UserType || (exports.UserType = {}));
// class Cart {
//     @prop({ type: () => String })
//     productId?: string
// }
class User {
}
__decorate([
    (0, typegoose_1.prop)({ type: () => String, required: true })
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, required: true, unique: true })
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, required: true })
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, required: true })
], User.prototype, "dob", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, required: true })
], User.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => Number, required: true })
], User.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => String, enum: Object.values(UserType), default: UserType.CUSTOMER })
], User.prototype, "user", void 0);
exports.UserModel = (0, typegoose_1.getModelForClass)(User, { schemaOptions: { timestamps: true } });
//# sourceMappingURL=User.js.map