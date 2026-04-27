require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  {
    name: "Men Cotton Shirt",
    price: 799,
    category: "Fashion",
    description: "Stylish cotton shirt for daily wear.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    stock: 20
  },
  {
    name: "Blue Denim Jeans",
    price: 1299,
    category: "Fashion",
    description: "Comfortable slim-fit denim jeans.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    stock: 15
  },
  {
    name: "Smartphone 5G",
    price: 14999,
    category: "Electronics",
    description: "Latest 5G smartphone with fast performance.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    stock: 10
  },
  {
    name: "Wireless Earbuds",
    price: 1999,
    category: "Electronics",
    description: "Bluetooth earbuds with clear sound.",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46",
    stock: 25
  },
  {
    name: "Gym Dumbbells Set",
    price: 2499,
    category: "Sports & Fitness",
    description: "Adjustable dumbbells for home workout.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    stock: 12
  },
  {
    name: "Yoga Mat",
    price: 699,
    category: "Sports & Fitness",
    description: "Anti-slip yoga mat for fitness training.",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0",
    stock: 30
  },
  {
    name: "Face Beauty Kit",
    price: 999,
    category: "Beauty",
    description: "Complete skincare and beauty kit.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    stock: 18
  },
  {
    name: "Home Decor Lamp",
    price: 1199,
    category: "Home",
    description: "Modern decorative lamp for bedroom and living room.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    stock: 14
  },
  {
    name: "Wall Decor Frame",
    price: 899,
    category: "Home",
    description: "Beautiful wall frame for home decoration.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    stock: 22
  }
];

const resolveSeller = async () => {
  let seller = await User.findOne({ role: "seller" });
  if (seller) return seller;

  seller = await User.findOne({ email: "seller@urbankart.com" });
  if (seller) {
    seller.role = "seller";
    await seller.save();
    return seller;
  }

  return User.create({
    name: "Default Seller",
    email: "seller@urbankart.com",
    password: "seller123",
    role: "seller"
  });
};

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const seller = await resolveSeller();
    const productsWithSeller = products.map((product) => ({
      ...product,
      sellerId: seller._id
    }));

    await Product.deleteMany({});
    await Product.insertMany(productsWithSeller);

    console.log("Products added successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
