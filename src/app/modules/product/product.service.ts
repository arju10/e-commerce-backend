import QueryBuilder from '../../builder/QueryBuilder';

import { ProductSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

// Create Single Product  ==== API: ("/api/products") === Method :[ POST]
const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// Get all Products ==== API: ("/api/products") === Method :[ GET]
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

// Get Single Product By ID ==== API: ("/api/products/:productId") === Method :[ GET]
const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  // console.log(`Searching for Product with ID: ${productId}`);

  return result;
};

// Update Single Product By ID ==== API: ("/api/products/:productId") === Method :[ PATCH]

const updateProductIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  const result = await Product.findOneAndUpdate({ _id: productId }, payload, {
    new: true,
  });
  return result;
};

// Delete Single Product By ID ==== API: ("/api/products/:productId") === Method :[ DELETE]
const deleteProductFromDB = async (
  productId: string,
): Promise<TProduct | null> => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
