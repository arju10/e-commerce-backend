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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_model_1 = require("../product/product.model");
const order_constant_1 = require("./order.constant");
const order_model_1 = __importDefault(require("./order.model"));
// Create Order ==== API: ("/api/orders") === Method :[ POST]
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check product availability and update inventory
        const { productId, quantity } = payload;
        const product = yield product_model_1.Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.inventory.quantity < quantity) {
            throw new Error('Insufficient quantity available in inventory');
        }
        // Create order
        const result = yield order_model_1.default.create(payload);
        // Update inventory
        product.inventory.quantity -= quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        return result;
    }
    catch (error) {
        throw error;
    }
});
// Get all Orders ==== API: ("/api/orders") === Method :[ GET]
const getAllOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = query, restQuery = __rest(query, ["email"]);
    let orderQuery = order_model_1.default.find();
    if (email) {
        orderQuery = orderQuery.where({ email });
    }
    const queryBuilder = new QueryBuilder_1.default(orderQuery, restQuery)
        .search(order_constant_1.OrderSearchableFields)
        .filter();
    const result = yield queryBuilder.modelQuery;
    const meta = yield queryBuilder.countTotal();
    return {
        meta,
        result,
    };
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
};
