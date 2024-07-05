import { z } from 'zod';

const createOrderZodSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: 'Product name must be string',
    }),
    price: z.number({
      invalid_type_error: 'Price must be number',
    }),
    quantity: z.number(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
