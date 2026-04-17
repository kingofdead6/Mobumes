import express from 'express';
import multer from 'multer';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  toggleShowOnProductsPage,
  getFeaturedProducts,
  deleteProduct,
} from '../Controllers/product.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', upload.array('images', 10), createProduct);
router.put('/:id', upload.array('images', 10), updateProduct);
router.patch('/:id/toggle-products-page',  toggleShowOnProductsPage);
router.delete('/:id', deleteProduct);

export default router;