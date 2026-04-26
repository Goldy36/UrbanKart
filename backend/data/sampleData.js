const users = [
  {
    name: "Urban Buyer",
    email: "buyer@urbankart.com",
    password: "buyer123",
    role: "buyer"
  },
  {
    name: "Urban Seller",
    email: "seller@urbankart.com",
    password: "seller123",
    role: "seller"
  }
];

const products = [
  {
    name: "Noise Cancelling Headphones",
    price: 2999,
    category: "Electronics",
    description: "Over-ear wireless headphones with premium active noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    stock: 20
  },
  {
    name: "AirPods Pro 2nd Gen",
    price: 21999,
    category: "Audio",
    description: "Premium wireless AirPods with active noise cancellation and spatial audio.",
    image:
      "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=1000&q=80",
    stock: 14
  },
  {
    name: "AirPods Matte Black Edition",
    price: 15999,
    category: "Audio",
    description: "Stylish matte finish earbuds with long battery life and fast pairing.",
    image:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1000&q=80",
    stock: 11
  },
  {
    name: "NeoBuds Wireless Earbuds",
    price: 3999,
    category: "Audio",
    description: "Compact wireless earbuds with low-latency gaming mode.",
    image:
      "https://images.unsplash.com/photo-1631176093617-63490a3d785a?auto=format&fit=crop&w=1000&q=80",
    stock: 26
  },
  {
    name: "SportX Waterproof Earbuds",
    price: 4299,
    category: "Audio",
    description: "Sweat-resistant earbuds for running and gym workouts.",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80",
    stock: 22
  },
  {
    name: "StudioPods ANC Earbuds",
    price: 4999,
    category: "Audio",
    description: "Hybrid ANC earbuds with balanced studio-grade sound.",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1000&q=80",
    stock: 18
  },
  {
    name: "Running Sneakers",
    price: 2199,
    category: "Fashion",
    description: "Breathable lightweight sneakers designed for daily comfort.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    stock: 35
  },
  {
    name: "StreetFlex White Sneakers",
    price: 2299,
    category: "Shoes",
    description: "Clean everyday sneakers with lightweight cushioning and firm grip.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
    stock: 30
  },
  {
    name: "TrailStorm Trek Shoes",
    price: 3199,
    category: "Shoes",
    description: "Outdoor shoes built for traction and long walking comfort.",
    image:
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=1000&q=80",
    stock: 22
  },
  {
    name: "UrbanSlip Canvas Shoes",
    price: 1799,
    category: "Shoes",
    description: "Casual slip-on canvas shoes for daily city wear.",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
    stock: 34
  },
  {
    name: "SprintEdge Sport Shoes",
    price: 2899,
    category: "Shoes",
    description: "Supportive sport shoes with responsive sole for active movement.",
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80",
    stock: 27
  },
  {
    name: "PowerLift Training Shoes",
    price: 2799,
    category: "Shoes",
    description: "Stable gym training shoes with durable outsole and arch support.",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
    stock: 24
  },
  {
    name: "Smart Watch Pro",
    price: 4499,
    category: "Electronics",
    description: "AMOLED display smartwatch with health and fitness tracking.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    stock: 15
  },
  {
    name: "Samsung Galaxy S24 5G",
    price: 74999,
    category: "Smartphones",
    description:
      "Flagship Samsung smartphone with AI camera features, bright AMOLED display, and all-day battery.",
    image:
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1000",
    stock: 12
  },
  {
    name: "Samsung Galaxy A55 5G",
    price: 42999,
    category: "Smartphones",
    description:
      "Balanced mid-range Samsung phone with premium finish, smooth display, and reliable performance.",
    image:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1000",
    stock: 18
  },
  {
    name: "Apple iPhone 15",
    price: 79900,
    category: "Smartphones",
    description:
      "Latest-generation iPhone with dynamic camera system, strong battery life, and seamless iOS experience.",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
    stock: 10
  },
  {
    name: "Apple iPhone 14",
    price: 67900,
    category: "Smartphones",
    description:
      "Powerful iPhone with advanced camera features, fast chipset, and smooth everyday usability.",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80",
    stock: 14
  },
  {
    name: "Vivo V30 Pro 5G",
    price: 41999,
    category: "Smartphones",
    description:
      "Slim premium Vivo phone with portrait-focused camera setup and ultra-smooth display performance.",
    image:
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1000",
    stock: 16
  },
  {
    name: "Vivo T3 5G",
    price: 23999,
    category: "Smartphones",
    description:
      "Value-focused Vivo smartphone with fast charging, responsive performance, and modern design.",
    image:
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1000",
    stock: 21
  },
  {
    name: "OPPO Reno11 5G",
    price: 38999,
    category: "Smartphones",
    description:
      "Stylish OPPO phone built for portrait photography, vivid display quality, and fast charging.",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1000&q=80",
    stock: 15
  },
  {
    name: "OPPO F25 Pro 5G",
    price: 27999,
    category: "Smartphones",
    description:
      "Lightweight OPPO smartphone with smooth UI experience, capable camera, and long battery endurance.",
    image:
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1000",
    stock: 19
  },
  {
    name: "Classic Analog Wrist Watch",
    price: 3299,
    category: "Watches",
    description: "Elegant analog wrist watch with leather strap and clean dial.",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1000&q=80",
    stock: 24
  },
  {
    name: "Silver Analog Chronograph Watch",
    price: 3899,
    category: "Watches",
    description: "Analog chronograph watch with stainless steel finish.",
    image:
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1000&q=80",
    stock: 20
  },
  {
    name: "Minimal Black Analog Wrist Watch",
    price: 2999,
    category: "Watches",
    description: "Minimal analog watch designed for formal and casual looks.",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=80",
    stock: 28
  },
  {
    name: "Pulse Digital Sports Watch",
    price: 2499,
    category: "Watches",
    description: "Digital sports wrist watch with stopwatch and alarm features.",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1000&q=80",
    stock: 26
  },
  {
    name: "Active Digital Smart Wrist Watch",
    price: 5299,
    category: "Watches",
    description: "Digital smartwatch with fitness tracking and notifications.",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80",
    stock: 19
  },
  {
    name: "Dual Display Analog-Digital Watch",
    price: 3599,
    category: "Watches",
    description: "Hybrid analog-digital wrist watch with multi-function display.",
    image:
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=1000&q=80",
    stock: 21
  },
  {
    name: "Minimal Desk Lamp",
    price: 1299,
    category: "Home",
    description: "Adjustable LED desk lamp with eye comfort technology.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    stock: 28
  },
  {
    name: "Scandinavian Wall Art Set",
    price: 1599,
    category: "Home Decor",
    description: "Modern 3-piece framed wall art set for living spaces.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80",
    stock: 22
  },
  {
    name: "Decorative Indoor Planter",
    price: 1099,
    category: "Home Decor",
    description: "Minimal indoor planter with stand for modern homes.",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80",
    stock: 18
  },
  {
    name: "Wooden Table Clock",
    price: 999,
    category: "Home Decor",
    description: "Compact wooden desk clock with silent movement.",
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=80",
    stock: 26
  },
  {
    name: "Classic White Formal Shirt",
    price: 1399,
    category: "Shirts",
    description: "Premium cotton formal shirt with a clean tailored fit.",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
    stock: 32
  },
  {
    name: "Slim Fit Blue Shirt",
    price: 1499,
    category: "Shirts",
    description: "Modern slim-fit shirt designed for office and casual wear.",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80",
    stock: 26
  },
  {
    name: "Checked Casual Shirt",
    price: 1299,
    category: "Shirts",
    description: "Soft checked shirt with all-day comfort and versatile styling.",
    image:
      "https://images.unsplash.com/photo-1602810319428-019690571b5b?auto=format&fit=crop&w=1000&q=80",
    stock: 38
  },
  {
    name: "Linen Summer Shirt",
    price: 1599,
    category: "Shirts",
    description: "Lightweight linen shirt perfect for warm-weather outings.",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80",
    stock: 24
  },
  {
    name: "Black Party Shirt",
    price: 1549,
    category: "Shirts",
    description: "Stylish black shirt with a sleek finish for evening events.",
    image:
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&w=1000&q=80",
    stock: 29
  },
  {
    name: "Navy Oxford Office Shirt",
    price: 1649,
    category: "Shirts",
    description: "Premium oxford weave shirt designed for office and formal occasions.",
    image:
      "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1000&q=80",
    stock: 25
  },
  {
    name: "Pastel Pink Casual Shirt",
    price: 1449,
    category: "Shirts",
    description: "Soft pastel cotton shirt ideal for smart-casual everyday looks.",
    image:
      "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?auto=format&fit=crop&w=1000&q=80",
    stock: 31
  },
  {
    name: "Plaid Weekend Shirt",
    price: 1349,
    category: "Shirts",
    description: "Comfort-fit plaid shirt for weekend outings and relaxed styling.",
    image:
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1000&q=80",
    stock: 33
  },
  {
    name: "Mandarin Collar White Shirt",
    price: 1499,
    category: "Shirts",
    description: "Minimal mandarin collar shirt with breathable premium fabric.",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
    stock: 22
  },
  {
    name: "Denim Button-Down Shirt",
    price: 1699,
    category: "Shirts",
    description: "Durable denim shirt with button-down style and modern fit.",
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1000&q=80",
    stock: 27
  },
  {
    name: "Indigo Slim Jeans",
    price: 1899,
    category: "Jeans",
    description: "Slim-fit stretch jeans made for daily comfort and movement.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    stock: 40
  },
  {
    name: "Classic Blue Denim Jeans",
    price: 1999,
    category: "Jeans",
    description: "Timeless blue denim jeans with durable premium fabric.",
    image:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80",
    stock: 33
  },
  {
    name: "Jet Black Skinny Jeans",
    price: 2099,
    category: "Jeans",
    description: "Skinny-fit black jeans with a clean and modern look.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    stock: 27
  },
  {
    name: "Relaxed Fit Washed Jeans",
    price: 1849,
    category: "Jeans",
    description: "Relaxed-fit washed denim jeans ideal for everyday use.",
    image:
      "https://images.unsplash.com/photo-1511105043137-7e66f28270e3?auto=format&fit=crop&w=1000&q=80",
    stock: 35
  },
  {
    name: "Grey Straight Jeans",
    price: 1949,
    category: "Jeans",
    description: "Straight-cut grey jeans with classic five-pocket styling.",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80",
    stock: 31
  },
  {
    name: "Dark Indigo Regular Jeans",
    price: 2049,
    category: "Jeans",
    description: "Regular-fit dark indigo jeans with long-lasting comfort.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    stock: 28
  },
  {
    name: "Faded Blue Tapered Jeans",
    price: 2149,
    category: "Jeans",
    description: "Tapered-fit faded blue jeans for a modern casual style.",
    image:
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80",
    stock: 34
  },
  {
    name: "Mid-Rise Stretch Jeans",
    price: 1899,
    category: "Jeans",
    description: "Mid-rise stretch denim with flexible all-day comfort.",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    stock: 30
  },
  {
    name: "Stone Wash Slim Jeans",
    price: 1999,
    category: "Jeans",
    description: "Stone-wash slim jeans crafted for everyday urban wear.",
    image:
      "https://images.unsplash.com/photo-1511105043137-7e66f28270e3?auto=format&fit=crop&w=1000&q=80",
    stock: 36
  },
  {
    name: "Charcoal Straight Fit Jeans",
    price: 2199,
    category: "Jeans",
    description: "Charcoal straight-fit jeans with premium stitched finish.",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80",
    stock: 25
  },
  {
    name: "Vintage Wash Relaxed Jeans",
    price: 2249,
    category: "Jeans",
    description: "Relaxed vintage-wash jeans with soft-touch denim fabric.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    stock: 29
  },
  {
    name: "GlowCare Vitamin C Serum",
    price: 1199,
    category: "Beauty",
    description: "Brightening serum with vitamin C and hyaluronic acid for daily glow.",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80",
    stock: 44
  },
  {
    name: "Herbal Aloe Face Cleanser",
    price: 699,
    category: "Beauty",
    description: "Gentle gel cleanser that removes impurities without drying skin.",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=80",
    stock: 52
  },
  {
    name: "Velvet Matte Lip Color Set",
    price: 899,
    category: "Beauty",
    description: "Long-lasting matte lip shades with smooth lightweight texture.",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=80",
    stock: 41
  },
  {
    name: "HydraBoost Gel Moisturizer",
    price: 949,
    category: "Beauty",
    description: "Hydrating water-gel moisturizer for soft, non-greasy daily care.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
    stock: 37
  },
  {
    name: "CloudRest Memory Foam Pillow Pair",
    price: 1799,
    category: "Home",
    description: "Ergonomic memory-foam pillows designed for neck and shoulder comfort.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    stock: 34
  },
  {
    name: "AromaMist Essential Oil Diffuser",
    price: 1499,
    category: "Home",
    description: "Ultrasonic aroma diffuser with ambient glow and silent operation.",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=1000&q=80",
    stock: 29
  },
  {
    name: "ChefCore Non-Stick Cookware Set",
    price: 3299,
    category: "Home",
    description: "Durable non-stick cookware set for quick everyday home cooking.",
    image: "/uploads/chefcore-cookware.jpg",
    stock: 22
  },
  {
    name: "BambooFold Laundry Basket",
    price: 999,
    category: "Home",
    description: "Foldable bamboo laundry basket with breathable inner lining.",
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80",
    stock: 31
  },
  {
    name: "PowerFlex Resistance Bands Kit",
    price: 1299,
    category: "Sports & Fitness",
    description: "Multi-resistance workout bands for strength, mobility, and rehab.",
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=1000&q=80",
    stock: 48
  },
  {
    name: "ZenGrip Yoga Mat 6mm",
    price: 1399,
    category: "Sports & Fitness",
    description: "Anti-slip yoga mat with cushioned support for training sessions.",
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=80",
    stock: 43
  },
  {
    name: "IronCore Adjustable Dumbbell Pair",
    price: 4599,
    category: "Sports & Fitness",
    description: "Space-saving adjustable dumbbells for progressive home workouts.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80",
    stock: 18
  },
  {
    name: "SmartCount Jump Rope",
    price: 799,
    category: "Sports & Fitness",
    description: "Weighted jump rope with digital count tracking and ergonomic handles.",
    image:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1000&q=80",
    stock: 57
  },
  {
    name: "IronGrip Hex Dumbbell Pair 10kg",
    price: 2999,
    category: "Sports & Fitness",
    description: "Rubber-coated hex dumbbells for strength training with stable floor grip.",
    image: "/uploads/fit-dumbbells.jpg",
    stock: 24
  },
  {
    name: "ForgeCast Kettlebell 16kg",
    price: 2399,
    category: "Sports & Fitness",
    description: "Cast-iron kettlebell for swings, goblet squats, and core power routines.",
    image: "/uploads/fit-kettlebell.jpg",
    stock: 19
  },
  {
    name: "CoreBench Adjustable Workout Bench",
    price: 6999,
    category: "Sports & Fitness",
    description: "Multi-angle adjustable bench for chest, shoulder, and dumbbell exercises.",
    image: "/uploads/fit-benchpress.jpg",
    stock: 11
  },
  {
    name: "CardioRun Foldable Treadmill",
    price: 28999,
    category: "Sports & Fitness",
    description: "Home treadmill with compact fold design and multiple cardio intensity modes.",
    image: "/uploads/fit-treadmill.jpg",
    stock: 8
  },
  {
    name: "Titan Olympic Barbell Rod 20kg",
    price: 8499,
    category: "Sports & Fitness",
    description: "Heavy-duty barbell rod with balanced knurling for strength and power lifts.",
    image: "/uploads/fit-barbell.jpg",
    stock: 13
  },
  {
    name: "Saanvi Embroidered Salwar Suit Set",
    price: 2899,
    category: "Fashion",
    description: "Elegant ladies salwar suit set with detailed embroidery for festive wear.",
    image: "/uploads/women-suit-embroidered.jpg",
    stock: 26
  },
  {
    name: "Mehera Classic Silk Saree",
    price: 3499,
    category: "Fashion",
    description: "Graceful silk saree with rich drape and matching blouse piece for occasions.",
    image: "/uploads/women-saree-classic.jpg",
    stock: 21
  },
  {
    name: "Aarika Festive Suit Collection",
    price: 3199,
    category: "Fashion",
    description: "Modern ethnic ladies suit designed for parties, ceremonies, and family functions.",
    image: "/uploads/women-suit-festive.jpg",
    stock: 19
  },
  {
    name: "RoseGlow Lipstick Trio for Women",
    price: 1099,
    category: "Beauty",
    description: "Smooth matte lipstick set with three wearable shades for daily and party looks.",
    image: "/uploads/beauty-women-lipsticks.jpg",
    stock: 47
  },
  {
    name: "LumiSkin Makeup Essentials Kit for Women",
    price: 1499,
    category: "Beauty",
    description: "Daily beauty kit with curated makeup essentials for a clean and polished finish.",
    image: "/uploads/beauty-women-makeup-kit.jpg",
    stock: 34
  },
  {
    name: "UrbanBeard Nourishing Beard Oil for Men",
    price: 899,
    category: "Beauty",
    description: "Lightweight beard oil for men that softens facial hair and hydrates the skin.",
    image: "/uploads/beauty-men-beard-oil.jpg",
    stock: 39
  },
  {
    name: "EdgeMan Aqua Perfume for Men",
    price: 1299,
    category: "Beauty",
    description: "Fresh long-lasting fragrance for men with clean citrus and woody base notes.",
    image: "/uploads/beauty-men-perfume.jpg",
    stock: 33
  },
  {
    name: "ManCare Grooming Kit for Men",
    price: 1699,
    category: "Beauty",
    description: "Complete men's grooming combo with skincare essentials for everyday routine.",
    image: "/uploads/beauty-men-grooming-kit.jpg",
    stock: 28
  }
];

module.exports = { users, products };
