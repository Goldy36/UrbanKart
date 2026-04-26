const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "..", "uploads");
const cloudinaryFolder = process.env.CLOUDINARY_FOLDER || "urbankart/products";
const maxUploadMb = Number(process.env.MAX_IMAGE_UPLOAD_MB || 5);
const maxFileSize = Number.isFinite(maxUploadMb) && maxUploadMb > 0
  ? maxUploadMb * 1024 * 1024
  : 5 * 1024 * 1024;

const ensureUploadDir = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const isCloudinaryConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }
  return cb(new Error("Only image files are allowed"), false);
};

const localDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

if (!isCloudinaryConfigured()) {
  ensureUploadDir();
}

const uploadProductImage = multer({
  storage: isCloudinaryConfigured() ? multer.memoryStorage() : localDiskStorage,
  fileFilter,
  limits: {
    fileSize: maxFileSize
  }
});

const uploadBufferToCloudinary = async (file) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary is not configured");
  }

  if (!file?.buffer) {
    throw new Error("Image buffer not found for upload");
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signaturePayload = `folder=${cloudinaryFolder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signaturePayload).digest("hex");

  const formData = new FormData();
  formData.set("file", new Blob([file.buffer]), file.originalname || "product-image");
  formData.set("api_key", apiKey);
  formData.set("timestamp", String(timestamp));
  formData.set("folder", cloudinaryFolder);
  formData.set("signature", signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData
  });
  const data = await response.json();

  if (!response.ok || !data?.secure_url) {
    const errorMessage = data?.error?.message || "Cloudinary upload failed";
    throw new Error(errorMessage);
  }

  return data.secure_url;
};

const resolveUploadedImageUrl = async (file) => {
  if (!file) return "";
  if (isCloudinaryConfigured()) {
    return uploadBufferToCloudinary(file);
  }
  return `/uploads/${file.filename}`;
};

module.exports = {
  uploadProductImage,
  resolveUploadedImageUrl,
  isCloudinaryConfigured
};
