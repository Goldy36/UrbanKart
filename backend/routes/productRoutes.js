const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getCategories
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { uploadProductImage } = require("../utils/imageStorage");

const router = express.Router();

router.get("/", getProducts);
router.get("/categories/all", getCategories);
router.get(
  "/seller/listings/me",
  protect,
  authorize("seller"),
  getMyProducts
);
router.get("/:id", getProductById);

router.post(
  "/",
  protect,
  authorize("seller"),
  uploadProductImage.single("imageFile"),
  createProduct
);
router.put(
  "/:id",
  protect,
  authorize("seller"),
  uploadProductImage.single("imageFile"),
  updateProduct
);
router.delete("/:id", protect, authorize("seller"), deleteProduct);

module.exports = router;
