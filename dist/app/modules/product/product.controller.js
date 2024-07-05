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
exports.ProductControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
const handleNotFound_1 = require("../../utils/handleNotFound");
// Create Single Product  ==== API: ("/api/products") === Method :[ POST]
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.createProductIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Product is created successfully',
        data: result,
    });
}));
// Get all Products ==== API: ("/api/products") === Method :[ GET]
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.getAllProductsFromDB(req.query);
    (0, handleNotFound_1.handleNotFound)(res, result, 'Products not found');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Products are retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
// Get Single Product By ID ==== API: ("/api/products/:productId") === Method :[ GET]
const getSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
    (0, handleNotFound_1.handleNotFound)(res, result, 'Product not found');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product is retrieved successfully',
        data: result,
    });
}));
// Update Single Product By ID ==== API: ("/api/products/:productId") === Method :[ PATCH]
const updateSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_service_1.ProductServices.updateProductIntoDB(productId, req.body);
    (0, handleNotFound_1.handleNotFound)(res, result, 'Product not found');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product is updated successfully',
        data: result,
    });
}));
// Delete Single Product By ID ==== API: ("/api/products/:productId") === Method :[ DELETE]
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logger.info(req.params.productId)
    const productId = req.params.productId;
    const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
    (0, handleNotFound_1.handleNotFound)(res, result, 'Product not found');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Product deleted successfully',
        data: result,
    });
}));
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct,
};
