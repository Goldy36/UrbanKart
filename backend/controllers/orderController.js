const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

const checkout = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      res.status(400);
      throw new Error("Cart is empty");
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        res.status(404);
        throw new Error(`Product not found: ${item.product.name}`);
      }

      if (product.stock < item.quantity) {
        res.status(400);
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save();

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderProducts.push({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
        sellerId: product.sellerId
      });
    }

    const order = await Order.create({
      userId: req.user._id,
      products: orderProducts,
      totalAmount: Number(totalAmount.toFixed(2)),
      status: "Placed"
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    return next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("products.sellerId", "name email")
      .sort("-createdAt");

    return res.status(200).json({ orders });
  } catch (error) {
    return next(error);
  }
};

const getSellerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ "products.sellerId": req.user._id }).sort(
      "-createdAt"
    );

    const filtered = orders
      .map((order) => ({
        ...order.toObject(),
        products: order.products.filter(
          (item) => String(item.sellerId) === String(req.user._id)
        )
      }))
      .filter((order) => order.products.length > 0);

    return res.status(200).json({ orders: filtered });
  } catch (error) {
    return next(error);
  }
};

module.exports = { checkout, getMyOrders, getSellerOrders };
