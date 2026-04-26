const Cart = require("../models/Cart");
const Product = require("../models/Product");

const buildCartResponse = (cart) => {
  const items = cart.items
    .filter((item) => item.product)
    .map((item) => ({
      product: item.product,
      quantity: item.quantity,
      subtotal: Number((item.product.price * item.quantity).toFixed(2))
    }));

  const totalAmount = Number(
    items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart: {
      _id: cart._id,
      userId: cart.userId,
      items
    },
    totalAmount,
    totalItems
  };
};

const findOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate("items.product");
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
    cart = await cart.populate("items.product");
  }
  return cart;
};

const getCart = async (req, res, next) => {
  try {
    const cart = await findOrCreateCart(req.user._id);
    return res.status(200).json(buildCartResponse(cart));
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Number(quantity);

    if (!productId || qty < 1) {
      res.status(400);
      throw new Error("Valid productId and quantity are required");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const cart = await findOrCreateCart(req.user._id);
    const existingItem = cart.items.find(
      (item) => String(item.product._id) === String(productId)
    );

    if (existingItem) {
      existingItem.quantity += qty;
      if (existingItem.quantity > product.stock) {
        res.status(400);
        throw new Error("Requested quantity exceeds stock");
      }
    } else {
      if (qty > product.stock) {
        res.status(400);
        throw new Error("Requested quantity exceeds stock");
      }
      cart.items.push({ product: productId, quantity: qty });
    }

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Item added to cart",
      ...buildCartResponse(cart)
    });
  } catch (error) {
    return next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!productId || Number.isNaN(qty)) {
      res.status(400);
      throw new Error("Valid productId and quantity are required");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const cart = await findOrCreateCart(req.user._id);
    const item = cart.items.find(
      (cartItem) => String(cartItem.product._id) === String(productId)
    );

    if (!item) {
      res.status(404);
      throw new Error("Item not found in cart");
    }

    if (qty <= 0) {
      cart.items = cart.items.filter(
        (cartItem) => String(cartItem.product._id) !== String(productId)
      );
    } else {
      if (qty > product.stock) {
        res.status(400);
        throw new Error("Requested quantity exceeds stock");
      }
      item.quantity = qty;
    }

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Cart updated",
      ...buildCartResponse(cart)
    });
  } catch (error) {
    return next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await findOrCreateCart(req.user._id);

    cart.items = cart.items.filter(
      (item) => String(item.product._id) !== String(productId)
    );

    await cart.save();
    await cart.populate("items.product");

    return res.status(200).json({
      message: "Item removed from cart",
      ...buildCartResponse(cart)
    });
  } catch (error) {
    return next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await findOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();

    return res.status(200).json({
      message: "Cart cleared",
      cart: { _id: cart._id, userId: cart.userId, items: [] },
      totalAmount: 0,
      totalItems: 0
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
