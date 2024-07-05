"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(product_validation_1.ProductValidation.createProductZodSchema), product_controller_1.ProductControllers.createProduct);
router.get('/:productId', product_controller_1.ProductControllers.getSingleProduct);
router.patch('/:productId', (0, validateRequest_1.default)(product_validation_1.ProductValidation.updateProductValidationSchema), product_controller_1.ProductControllers.updateSingleProduct);
router.delete('/:productId', product_controller_1.ProductControllers.deleteProduct);
router.get('/', product_controller_1.ProductControllers.getAllProducts);
exports.ProductRoutes = router;
