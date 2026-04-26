const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const {
  uploadProductImage,
  resolveUploadedImageUrl
} = require("../utils/imageStorage");

const router = express.Router();

router.post(
  "/product-image",
  protect,
  authorize("seller"),
  uploadProductImage.single("imageFile"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    try {
      const imageUrl = await resolveUploadedImageUrl(req.file);

      return res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl
      });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
