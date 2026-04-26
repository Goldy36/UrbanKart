const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { users, products } = require("../data/sampleData");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const seedDatabase = async () => {
  try {
    await connectDB();
    const shouldResetUsers = process.argv.includes("--reset-users");

    if (shouldResetUsers) {
      await User.deleteMany({});
    }

    await Promise.all([Product.deleteMany({}), Cart.deleteMany({}), Order.deleteMany({})]);

    let seller = await User.findOne({ role: "seller" });

    if (shouldResetUsers) {
      const createdUsers = [];
      for (const userData of users) {
        const user = new User(userData);
        await user.save();
        createdUsers.push(user);
      }
      seller = createdUsers.find((user) => user.role === "seller");
    } else if (!seller) {
      const sampleSeller = users.find((user) => user.role === "seller");
      const existingByEmail = await User.findOne({ email: sampleSeller.email.toLowerCase() });
      if (existingByEmail) {
        existingByEmail.role = "seller";
        await existingByEmail.save();
        seller = existingByEmail;
      } else {
        const createdSeller = new User(sampleSeller);
        await createdSeller.save();
        seller = createdSeller;
      }
    }

    const productPayload = products.map((product) => ({
      ...product,
      sellerId: seller._id
    }));

    await Product.insertMany(productPayload);

    console.log("Database seeded successfully.");
    console.log(
      shouldResetUsers
        ? "Users were reset to sample credentials."
        : "Existing users were preserved."
    );
    console.log("Buyer Login: buyer@urbankart.com / buyer123");
    console.log("Seller Login: seller@urbankart.com / seller123");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
