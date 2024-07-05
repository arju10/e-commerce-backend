import QueryBuilder from '../../builder/QueryBuilder';
import { handleInsufficientQuantity } from '../../utils/handleNotFound';
import { Product } from '../product/product.model';

import { OrderSearchableFields } from './order.constant';
import { TOrder } from './order.interface';
import Order from './order.model';

// Create Order ==== API: ("/api/orders") === Method :[ POST]
const createOrderIntoDB = async (payload: TOrder) => {
  try {
    // Check product availability and update inventory
    const { productId, quantity } = payload;
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.inventory.quantity < quantity) {
      throw new Error('Insufficient quantity available in inventory');
    }

    // Create order
    const result = await Order.create(payload);

    // Update inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    return result;
  } catch (error) {
    throw error;
  }
};

// Get all Orders ==== API: ("/api/orders") === Method :[ GET]
const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const { email, ...restQuery } = query;

  let orderQuery = Order.find();

  if (email) {
    orderQuery = orderQuery.where({ email });
  }

  const queryBuilder = new QueryBuilder(orderQuery, restQuery)
    .search(OrderSearchableFields)
    .filter();

  const result = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    meta,
    result,
  };
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
