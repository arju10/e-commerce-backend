"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        price: zod_1.z.number({
            invalid_type_error: 'Price must be number',
        }),
        quantity: zod_1.z.number({
            invalid_type_error: 'Quantity must be number',
        }),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
};
