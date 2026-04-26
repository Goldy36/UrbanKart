import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaMoon, FaShoppingCart, FaSun, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartData } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo">
          UrbanKart
        </Link>

        <form className="search-form" onSubmit={submitSearch}>
          <input
            type="text"
            value={searchTerm}
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          Menu
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>

          {isAuthenticated && (
            <NavLink to="/orders">{user.role === "seller" ? "Sales" : "Orders"}</NavLink>
          )}

          {user?.role === "seller" && <NavLink to="/seller/dashboard">Dashboard</NavLink>}

          {user?.role === "buyer" && (
            <>
              <NavLink to="/wishlist" className="cart-link">
                <FaHeart />
                <span>Wishlist</span>
                <strong>{wishlistCount || 0}</strong>
              </NavLink>
              <NavLink to="/cart" className="cart-link">
                <FaShoppingCart />
                <span>Cart</span>
                <strong>{cartData?.totalItems || 0}</strong>
              </NavLink>
            </>
          )}

          <button className="icon-btn" type="button" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="primary-nav-btn">
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="user-actions">
              <span>
                <FaUser /> {user?.name}
              </span>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
