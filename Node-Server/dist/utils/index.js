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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilities = exports.firebaseUrl = void 0;
exports.firebaseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
class Utilities {
    constructor() {
        this.getTotalAmount = (price, tax, discount) => __awaiter(this, void 0, void 0, function* () {
            const addTax = price * (tax / 100);
            const sellingPrice = price + addTax;
            return (sellingPrice - (sellingPrice / 100) * discount);
        });
    }
}
exports.Utilities = Utilities;
//# sourceMappingURL=index.js.map