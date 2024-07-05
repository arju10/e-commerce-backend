// src/app/modules/order/order.controller.ts

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';
import { handleNotFound } from '../../utils/handleNotFound';

// Create Order ==== API: ("/api/orders") === Method :[ POST]
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

// Get all Orders ==== API: ("/api/orders") === Method :[ GET]
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { email, ...restQuery } = req.query;

  const result = await OrderServices.getAllOrdersFromDB({
    email,
    ...restQuery,
  });

  handleNotFound(res, result.result, 'Order not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: email
      ? 'Orders fetched successfully for user email!'
      : 'Orders retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
