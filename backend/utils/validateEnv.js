const requiredVars = ["MONGO_URI", "JWT_SECRET"];

const validateEnv = () => {
  const missing = requiredVars.filter((key) => !process.env[key]);
  const isProduction = process.env.NODE_ENV === "production";
  const hasClientOrigins = Boolean(process.env.CLIENT_URL || process.env.CLIENT_URLS);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  if (isProduction && !hasClientOrigins) {
    throw new Error(
      "Missing required CORS configuration in production. Set CLIENT_URLS (or CLIENT_URL) to your frontend domain(s)."
    );
  }

  if (isProduction && !process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn(
      "[UrbanMart] CLOUDINARY_CLOUD_NAME is not set. Local /uploads storage may not persist across redeploys on many hosting providers."
    );
  }
};

module.exports = { validateEnv };
