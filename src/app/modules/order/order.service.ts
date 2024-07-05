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
  const orderQuery = new QueryBuilder(Order.find(), query).search(
    OrderSearchableFields,
  );

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
