import asyncHandler from 'express-async-handler';
import Product from '../Models/Product.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// Get all products (with optional category filter)
export const getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = {};
  if (category) query.category = category;
  const products = await Product.find(query).lean();
  res.json(products);
});

// Get featured products for main page
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = { showOnProductsPage: true };
  if (category) query.category = category;

  const products = await Product.find(query).lean();
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description } = req.body;

  if (!name || !category || !price) {
    res.status(400);
    throw new Error('Name, category and price are required');
  }

  const images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const url = await uploadToCloudinary(file);
      images.push({ url });
    }
  }

  const product = await Product.create({
    name,
    category,
    price: Number(price),
    description: description || '',
    images,
    showOnProductsPage: true,
  });

  res.status(201).json(product);
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, category, price, description } = req.body;

  if (name) product.name = name;
  if (category) product.category = category;
  if (price !== undefined) product.price = Number(price);
  if (description !== undefined) product.description = description;

  // Handle images
  if (req.files && req.files.length > 0) {
    const newImages = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file);
      newImages.push({ url });
    }
    product.images = [...product.images, ...newImages];
  }

  const updated = await product.save();
  res.json(updated);
});

export const toggleShowOnProductsPage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product.showOnProductsPage = !product.showOnProductsPage;
  await product.save();
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  await Product.deleteOne({ _id: req.params.id });
  res.json({ message: 'Product deleted' });
});