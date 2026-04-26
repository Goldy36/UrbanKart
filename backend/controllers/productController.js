const Product = require("../models/Product");
const { resolveUploadedImageUrl } = require("../utils/imageStorage");

const getProducts = async (req, res, next) => {
  try {
    const { q, category, minPrice, maxPrice, sort = "-createdAt" } = req.query;
    const query = {};

    if (q) {
      query.name = { $regex: q, $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query)
      .populate("sellerId", "name email")
      .sort(sort);

    return res.status(200).json({ products });
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "sellerId",
      "name email"
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    return res.status(200).json({ product });
  } catch (error) {
    return next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, description, stock, image } = req.body;

    if (!name || !price || !category || !description || !stock) {
      res.status(400);
      throw new Error("All product fields are required");
    }

    const uploadedImageUrl = await resolveUploadedImageUrl(req.file);
    const imagePath = uploadedImageUrl || image;
    if (!imagePath) {
      res.status(400);
      throw new Error("Product image is required");
    }

    const product = await Product.create({
      name,
      price: Number(price),
      category,
      description,
      stock: Number(stock),
      image: imagePath,
      sellerId: req.user._id
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (String(product.sellerId) !== String(req.user._id)) {
      res.status(403);
      throw new Error("You can edit only your own products");
    }

    const { name, price, category, description, stock, image } = req.body;
    product.name = name ?? product.name;
    product.price = price !== undefined ? Number(price) : product.price;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.stock = stock !== undefined ? Number(stock) : product.stock;
    if (req.file) {
      product.image = await resolveUploadedImageUrl(req.file);
    } else {
      product.image = image ?? product.image;
    }

    await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (String(product.sellerId) !== String(req.user._id)) {
      res.status(403);
      throw new Error("You can delete only your own products");
    }

    await product.deleteOne();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

const getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ sellerId: req.user._id }).sort("-createdAt");
    return res.status(200).json({ products });
  } catch (error) {
    return next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    return res.status(200).json({ categories });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getCategories
};
