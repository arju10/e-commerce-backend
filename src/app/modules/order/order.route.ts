import express from 'express';
import { OrderControllers } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post('/',validateRequest(OrderValidation.createOrderZodSchema), OrderControllers.createOrder);

export const OrderRoutes = router;
