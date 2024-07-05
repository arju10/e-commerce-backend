"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProductZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Product name must be string',
        }),
        description: zod_1.z
            .string({
            invalid_type_error: 'Description must be string',
        })
            .optional(),
        price: zod_1.z
            .number({
            invalid_type_error: 'Price must be number',
        })
            .optional(),
        category: zod_1.z.string({
            invalid_type_error: 'Category  must be string',
        }),
        tags: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: 'Tag is not required' }))
            .optional(),
        variants: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.string(),
            value: zod_1.z.string(),
        })),
        inventory: zod_1.z.object({
            quantity: zod_1.z
                .number()
                .nonnegative('Quantity must be greater than or equal to 0'),
            inStock: zod_1.z.boolean(),
        }),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Product name must be string',
        })
            .optional(),
        description: zod_1.z
            .string({
            invalid_type_error: 'Description must be string',
        })
            .optional(),
        price: zod_1.z
            .number({
            invalid_type_error: 'Price must be number',
        })
            .optional(),
        category: zod_1.z
            .string({
            invalid_type_error: 'Category  must be string',
        })
            .optional(),
        tags: zod_1.z
            .array(zod_1.z.string({ invalid_type_error: 'Tag is not required' }))
            .optional(),
        variants: zod_1.z
            .array(zod_1.z
            .object({
            type: zod_1.z.string().optional(),
            value: zod_1.z.string().optional(),
        })
            .optional())
            .optional(),
        inventory: zod_1.z
            .object({
            quantity: zod_1.z
                .number()
                .nonnegative('Quantity must be greater than or equal to 0')
                .optional(),
            inStock: zod_1.z.boolean().optional(),
        })
            .optional(),
    }),
});
exports.ProductValidation = {
    createProductZodSchema,
    updateProductValidationSchema,
};
