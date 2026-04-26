const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role
});

const normalizeText = (value) => (typeof value === "string" ? value.trim() : "");
const normalizeEmail = (value) => normalizeText(value).toLowerCase();
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const registerUser = async (req, res, next) => {
  try {
    const { name, username, email, password, role } = req.body;
    const normalizedName = normalizeText(name || username);
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedName || !normalizedEmail || !password) {
      res.status(400);
      throw new Error("Username, email, and password are required");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      res.status(400);
      throw new Error("Email already registered");
    }

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password,
      role: role === "seller" ? "seller" : "buyer"
    });

    return res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id),
      user: sanitizeUser(user)
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, username, name, identifier, password } = req.body;
    const loginIdentifier = normalizeText(identifier || email || username || name);

    if (!loginIdentifier || !password) {
      res.status(400);
      throw new Error("Username or email, and password are required");
    }

    let user = null;
    const normalizedEmail = normalizeEmail(loginIdentifier);

    if (loginIdentifier.includes("@")) {
      user = await User.findOne({ email: normalizedEmail });
    } else {
      user = await User.findOne({
        name: { $regex: `^${escapeRegex(loginIdentifier)}$`, $options: "i" }
      });
      if (!user) {
        user = await User.findOne({ email: normalizedEmail });
      }
    }

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    return res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: sanitizeUser(user)
    });
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

module.exports = { registerUser, loginUser, getCurrentUser };
