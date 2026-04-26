# UrbanKart - Full Stack MERN E-commerce Project

UrbanKart is a complete full-stack online shopping platform where users can act as **Buyer** or **Seller**.

## Tech Stack
- Frontend: React.js (Vite)
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: JWT

## Key Features

### User Authentication
- Register / Login
- Login using email or username
- JWT based secure login
- Role based user flow (`buyer` / `seller`)
- Protected routes on frontend + backend

### Buyer Features
- Browse all products
- Search products
- Filter by category and price
- Product details page
- Add/Remove cart items
- Update cart quantity
- Persistent cart in database
- Checkout and place order
- View order history

### Seller Features
- Seller dashboard for own listings
- Add product
- Edit product
- Delete product
- Upload image via URL or local file
- Manage stock, category, description, pricing

### Additional Quality Features
- Responsive modern UI (desktop + mobile)
- Toast notifications
- Loading spinners
- Form validation
- Error handling
- Dark/Light mode toggle

## Project Structure

```text
UrbanMart/
  backend/
    config/
    controllers/
    data/
    middleware/
    models/
    routes/
    scripts/
    uploads/
    server.js
  frontend/
    src/
      api/
      components/
      context/
      pages/
      App.jsx
      main.jsx
  README.md
```

## Database Collections (Mongoose Models)
- `Users`: `name, email, password, role`
- `Products`: `name, price, category, description, image, stock, sellerId`
- `Cart`: `userId, items[] (product, quantity)`
- `Orders`: `userId, products[], totalAmount, status`

## Backend API Overview

### Auth APIs
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Product APIs
- `GET /api/products`
- `GET /api/products/categories/all`
- `GET /api/products/:id`
- `GET /api/products/seller/listings/me`
- `POST /api/products` (seller)
- `PUT /api/products/:id` (seller)
- `DELETE /api/products/:id` (seller)

### Cart APIs (buyer)
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/update`
- `DELETE /api/cart/remove/:productId`
- `DELETE /api/cart/clear`

### Order APIs
- `POST /api/orders/checkout` (buyer)
- `GET /api/orders/my-orders`
- `GET /api/orders/seller-orders` (seller)

### Upload API
- `POST /api/upload/product-image` (seller image upload)

## Local Setup Instructions

## 1. Clone and open folder
```bash
cd UrbanMart
```

## 2. Backend setup
```bash
cd backend
npm install
```

Create `.env` from `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/urbankart
JWT_SECRET=urbankart_super_secret_key
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173
MAX_IMAGE_UPLOAD_MB=5
# Optional for persistent production image uploads:
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=urbankart/products
```

Run backend:
```bash
npm run dev
```

Optional: seed sample data:
```bash
npm run seed
```

Optional: full reset including users:
```bash
npm run seed:full
```

## 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create `.env` from `.env.example`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```

## 4. Open app
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Dummy Login Credentials (after seed)
- Buyer: `buyer@urbankart.com` / `buyer123`
- Seller: `seller@urbankart.com` / `seller123`

## Production Deployment (Render)

This repo includes [`render.yaml`](./render.yaml) for one-click service setup.

### 1. Push this repo to GitHub

### 2. In Render, create Blueprint from `render.yaml`
- Backend service root: `backend`
- Frontend static service root: `frontend`

### 3. Configure environment variables

Backend required:
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URLS` (comma-separated frontend URLs)

Backend recommended (for persistent image uploads):
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_FOLDER` (optional, default: `urbankart/products`)

Frontend required:
- `VITE_API_URL` (example: `https://your-backend.onrender.com/api`)

### 4. Important deployment note for images
- Without Cloudinary env vars, local file uploads are stored on backend disk (`/uploads`) and may be lost on redeploy/restart.
- With Cloudinary env vars set, uploaded images are persistent and production-safe.

## Viva Explanation (Short)

UrbanKart is built using MERN architecture:
1. React frontend handles UI, routing, and role-wise pages.
2. Express backend provides REST APIs for auth, products, cart, and orders.
3. MongoDB stores users, products, cart, and order history using Mongoose schemas.
4. JWT secures protected APIs and role-based access for buyer and seller actions.
5. Buyer cart is stored in DB for persistence; checkout converts cart items into an order and updates stock.
6. Seller dashboard allows CRUD operations for products including image support (URL or local upload).

This project demonstrates practical real-world e-commerce workflow with clean UI and complete full-stack integration.
