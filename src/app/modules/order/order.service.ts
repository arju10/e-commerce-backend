import QueryBuilder from '../../builder/QueryBuilder';

import { OrderSearchableFields } from './order.constant';
import { TOrder } from './order.interface';
import Order from './order.model';

// Create Order ==== API: ("/api/orders") === Method :[ POST]
const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
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
