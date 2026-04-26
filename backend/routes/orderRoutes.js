const express = require("express");
const {
  checkout,
  getMyOrders,
  getSellerOrders
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/checkout", protect, authorize("buyer"), checkout);
router.get("/my-orders", protect, getMyOrders);
router.get("/seller-orders", protect, authorize("seller"), getSellerOrders);

module.exports = router;
