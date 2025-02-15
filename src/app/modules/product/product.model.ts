import mongoose, { Schema, Document, model } from 'mongoose';
import { TInventory, TProduct, TProductVariant } from './product.interface';

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const variantSchema = new Schema<TProductVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: [{ type: variantSchema, required: true }],
  inventory: { type: inventorySchema, required: true },
});

export const Product = model<TProduct>('Product', productSchema);
