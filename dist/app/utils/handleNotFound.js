"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInsufficientQuantity = exports.handleNotFound = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleNotFound = (res, data, message) => {
    if (!data) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: message,
            data: null || undefined,
        });
    }
};
exports.handleNotFound = handleNotFound;
const handleInsufficientQuantity = (res, data, message) => {
    return res.status(http_status_1.default.BAD_REQUEST).json({
        success: false,
        message: message,
        data: data,
    });
};
exports.handleInsufficientQuantity = handleInsufficientQuantity;
