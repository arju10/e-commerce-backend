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
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
// Create Single Product  ==== API: ("/api/products") === Method :[ POST]
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// Get all Products ==== API: ("/api/products") === Method :[ GET]
const getAllProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield productQuery.modelQuery;
    const meta = yield productQuery.countTotal();
    return {
        meta,
        result,
    };
});
// Get Single Product By ID ==== API: ("/api/products/:productId") === Method :[ GET]
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    // console.log(`Searching for Product with ID: ${productId}`);
    return result;
});
// Update Single Product By ID ==== API: ("/api/products/:productId") === Method :[ PATCH]
const updateProductIntoDB = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: productId }, payload, {
        new: true,
    });
    return result;
});
// Delete Single Product By ID ==== API: ("/api/products/:productId") === Method :[ DELETE]
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
};
