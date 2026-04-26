import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlistIds, clearWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const { data } = await axiosInstance.get("/products");
        const allProducts = data.products || [];
        const byId = new Map(allProducts.map((item) => [item._id, item]));
        const ordered = wishlistIds.map((id) => byId.get(id)).filter(Boolean);
        setProducts(ordered);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlistIds]);

  const totalWishlistValue = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.price || 0), 0),
    [products]
  );

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success("Wishlist cleared");
  };

  return (
    <section className="container page-section">
      <div className="dashboard-head">
        <div>
          <h2>Your Wishlist</h2>
          <p>Saved picks in one place. Track favorites before you buy.</p>
        </div>
        {wishlistIds.length > 0 && (
          <button type="button" className="btn-secondary" onClick={handleClearWishlist}>
            Clear Wishlist
          </button>
        )}
      </div>

      {!loading && !error && products.length > 0 && (
        <div className="insights-grid">
          <article className="insight-card">
            <span>Saved Products</span>
            <strong>{products.length}</strong>
          </article>
          <article className="insight-card">
            <span>Potential Spend</span>
            <strong>INR {totalWishlistValue}</strong>
          </article>
        </div>
      )}

      {loading && <Loader text="Loading wishlist..." />}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <div className="empty-state">
          <p>No products in wishlist yet.</p>
          <Link to="/products" className="btn-primary">
            Discover Products
          </Link>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
