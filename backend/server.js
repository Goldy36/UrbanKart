const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { createCorsOptions, buildAllowedOrigins } = require("./config/corsOptions");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { validateEnv } = require("./utils/validateEnv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
validateEnv();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(createCorsOptions()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "UrbanKart backend is live",
    health: "/api/health",
    apiBase: "/api"
  });
});

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "UrbanKart API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Allowed client origins: ${Array.from(buildAllowedOrigins()).join(", ")}`);
  console.log(`Server running on port ${PORT}`);
});
