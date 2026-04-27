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
    name: "Classic Indigo Jeans",
    price: 1399,
    category: "Fashion",
    description: "Classic indigo denim jeans with everyday comfort.",
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=1200&q=80",
    stock: 18
  },
  {
    name: "Black Skinny Jeans",
    price: 1499,
    category: "Fashion",
    description: "Stretchable black skinny jeans with modern fit.",
    image: "https://images.unsplash.com/photo-1580644228275-2b826dbec5bf?auto=format&fit=crop&w=1200&q=80",
    stock: 16
  },
  {
    name: "Ripped Streetwear Jeans",
    price: 1599,
    category: "Fashion",
    description: "Trendy ripped denim jeans for streetwear styling.",
    image: "https://images.unsplash.com/photo-1543404783-573c188fb64d?auto=format&fit=crop&w=1200&q=80",
    stock: 14
  },
  {
    name: "High-Waist Mom Jeans",
    price: 1699,
    category: "Fashion",
    description: "High-waist mom jeans with relaxed silhouette.",
    image: "https://images.unsplash.com/photo-1621609764049-5ee1db3d7c35?auto=format&fit=crop&w=1200&q=80",
    stock: 20
  },
  {
    name: "Straight Fit Denim Jeans",
    price: 1549,
    category: "Fashion",
    description: "Straight fit denim jeans for clean casual looks.",
    image: "https://images.unsplash.com/photo-1609873814058-a8928924184a?auto=format&fit=crop&w=1200&q=80",
    stock: 17
  },
  {
    name: "Denim-On-Denim Jeans",
    price: 1799,
    category: "Fashion",
    description: "Premium denim jeans inspired by layered denim styling.",
    image: "https://images.unsplash.com/photo-1518555743503-6ae9ce0395b2?auto=format&fit=crop&w=1200&q=80",
    stock: 12
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
  },
  {
    name: "Women Floral Kurti",
    price: 1099,
    category: "Fashion",
    description: "Elegant floral kurti for casual and festive wear.",
    image: "https://images.pexels.com/photos/35521738/pexels-photo-35521738.jpeg?cs=srgb&dl=pexels-kunal-yadav-photography-2158088461-35521738.jpg&fm=jpg",
    stock: 26
  },
  {
    name: "Running Shoes",
    price: 2199,
    category: "Fashion",
    description: "Lightweight running shoes with breathable mesh.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 19
  },
  {
    name: "Bluetooth Speaker",
    price: 2599,
    category: "Electronics",
    description: "Portable speaker with deep bass and long battery life.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab",
    stock: 17
  },
  {
    name: "Laptop Backpack",
    price: 1499,
    category: "Electronics",
    description: "Water-resistant backpack with padded laptop compartment.",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    stock: 21
  },
  {
    name: "Air Fryer 4L",
    price: 4899,
    category: "Home",
    description: "Healthy low-oil cooking with digital controls.",
    image: "https://images.pexels.com/photos/29461935/pexels-photo-29461935.jpeg?cs=srgb&dl=pexels-fotios-photos-29461935.jpg&fm=jpg",
    stock: 11
  },
  {
    name: "Cotton Bedsheet Set",
    price: 1799,
    category: "Home",
    description: "Soft king-size cotton bedsheet with two pillow covers.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    stock: 24
  },
  {
    name: "Protein Powder 1kg",
    price: 2999,
    category: "Sports & Fitness",
    description: "High-protein supplement for muscle recovery and strength.",
    image: "https://images.unsplash.com/photo-1774935989990-5b46f7ad7f3e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    stock: 16
  },
  {
    name: "Skipping Rope",
    price: 399,
    category: "Sports & Fitness",
    description: "Adjustable skipping rope for cardio workouts.",
    image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc",
    stock: 40
  },
  {
    name: "Vitamin C Serum",
    price: 749,
    category: "Beauty",
    description: "Brightening face serum for daily skincare routine.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    stock: 28
  },
  {
    name: "Hair Dryer",
    price: 1399,
    category: "Beauty",
    description: "Compact hair dryer with heat and speed settings.",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da",
    stock: 20
  },
  {
    name: "Organic Almonds 500g",
    price: 649,
    category: "Grocery",
    description: "Premium crunchy almonds rich in protein and fiber.",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
    stock: 33
  },
  {
    name: "Basmati Rice 5kg",
    price: 899,
    category: "Grocery",
    description: "Long-grain aromatic basmati rice for everyday meals.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    stock: 29
  },
  {
    name: "Non-Stick Cookware Set",
    price: 3299,
    category: "Kitchen",
    description: "Durable 5-piece non-stick cookware set for modern kitchens.",
    image: "https://images.unsplash.com/photo-1556910602-38f53e68e15d?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    stock: 13
  },
  {
    name: "Electric Kettle 1.5L",
    price: 1199,
    category: "Kitchen",
    description: "Fast boiling kettle with auto shut-off protection.",
    image: "https://images.unsplash.com/photo-1559761340-1e6a341f0b51?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    stock: 27
  },
  {
    name: "Kids Building Blocks",
    price: 999,
    category: "Toys",
    description: "Creative building blocks set for learning and play.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
    stock: 31
  },
  {
    name: "Remote Control Car",
    price: 1599,
    category: "Toys",
    description: "Rechargeable remote control car with smooth handling.",
    image: "https://images.pexels.com/photos/34080822/pexels-photo-34080822.jpeg?cs=srgb&dl=pexels-owen-outdoors-409204690-34080822.jpg&fm=jpg",
    stock: 18
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
