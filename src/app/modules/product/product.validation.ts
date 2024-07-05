import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Product name must be string',
    }),
    description: z
      .string({
        invalid_type_error: 'Description must be string',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be number',
      })
      .optional(),
    category: z.string({
      invalid_type_error: 'Category  must be string',
    }),
    tags: z
      .array(z.string({ invalid_type_error: 'Tag is not required' }))
      .optional(),
    variants: z.array(
      z.object({
        type: z.string(),
        value: z.string(),
      }),
    ),
    inventory: z.object({
      quantity: z
        .number()
        .nonnegative('Quantity must be greater than or equal to 0'),
      inStock: z.boolean(),
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Product name must be string',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'Description must be string',
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: 'Price must be number',
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: 'Category  must be string',
      })
      .optional(),
    tags: z
      .array(z.string({ invalid_type_error: 'Tag is not required' }))
      .optional(),
    variants: z
      .array(
        z
          .object({
            type: z.string().optional(),
            value: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
    inventory: z
      .object({
        quantity: z
          .number()
          .nonnegative('Quantity must be greater than or equal to 0')
          .optional(),
        inStock: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
  updateProductValidationSchema,
};
