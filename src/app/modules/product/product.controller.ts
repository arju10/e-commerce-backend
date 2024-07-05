import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { TProduct } from './product.interface';
import { logger } from '../../shared/logger';
import { handleNotFound } from '../../utils/handleNotFound';

// Create Single Product  ==== API: ("/api/products") === Method :[ POST]
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product is created successfully',
    data: result,
  });
});

// Get all Products ==== API: ("/api/products") === Method :[ GET]
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  handleNotFound(res, result, 'Products not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

// Get Single Product By ID ==== API: ("/api/products/:productId") === Method :[ GET]
const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductServices.getSingleProductFromDB(productId);

  handleNotFound(res, result, 'Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved successfully',
    data: result,
  });
});

// Update Single Product By ID ==== API: ("/api/products/:productId") === Method :[ PATCH]
const updateSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.updateProductIntoDB(productId, req.body);

  handleNotFound(res, result, 'Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated successfully',
    data: result,
  });
});

// Delete Single Product By ID ==== API: ("/api/products/:productId") === Method :[ DELETE]

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  // logger.info(req.params.productId)
  const productId = req.params.productId;

  const result = await ProductServices.deleteProductFromDB(productId);

  handleNotFound(res, result, 'Product not found');

  sendResponse<TProduct | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
