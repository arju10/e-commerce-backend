import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductControllers.createProduct,
);

router.get('/:productId', ProductControllers.getSingleProduct);

router.patch(
  '/:productId',
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateSingleProduct,
);
router.delete('/:productId', ProductControllers.deleteProduct);

router.get('/', ProductControllers.getAllProducts);

export const ProductRoutes = router;
