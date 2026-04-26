const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  if (err.name === "MulterError") {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? `Image is too large. Max upload size is ${
            process.env.MAX_IMAGE_UPLOAD_MB || 5
          }MB`
        : err.message;
    return res.status(400).json({ message });
  }

  if (err.message?.startsWith("CORS blocked for origin")) {
    return res.status(403).json({ message: err.message });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
};

module.exports = { notFound, errorHandler };
