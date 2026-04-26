const parseOrigins = (value) =>
  (value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const buildAllowedOrigins = () => {
  const list = new Set([
    ...parseOrigins(process.env.CLIENT_URL),
    ...parseOrigins(process.env.CLIENT_URLS)
  ]);

  if (list.size === 0 && process.env.NODE_ENV !== "production") {
    list.add("http://localhost:5173");
  }

  return list;
};

const createCorsOptions = () => {
  const allowedOrigins = buildAllowedOrigins();

  return {
    origin: (origin, callback) => {
      // Allow non-browser tools and same-origin requests without an Origin header.
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  };
};

module.exports = {
  createCorsOptions,
  buildAllowedOrigins
};
