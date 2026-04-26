import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axiosInstance, { getImageUrl } from "../api/axiosInstance";
import { getCategoryFallbackImage } from "../utils/imageFallbacks";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useDiscovery } from "../context/DiscoveryContext";
import Loader from "./Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { trackProductView } = useDiscovery();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProduct(data.product);
        trackProductView(data.product);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, trackProductView]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      toast.success("Item added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to add to cart");
    }
  };

  if (loading) return <Loader text="Loading product details..." />;
  if (error) return <div className="container page-section error-text">{error}</div>;
  if (!product) return null;

  const fallbackImage = getCategoryFallbackImage(product.category, product.name);
  const wishlisted = isWishlisted(product._id);

  const handleWishlistToggle = () => {
    toggleWishlist(product._id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <section className="container page-section">
      <div className="details-layout">
        <div className="details-image-wrap">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImage;
            }}
          />
        </div>
        <div className="details-content">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="details-top-row">
            <h2>INR {product.price}</h2>
            <button
              type="button"
              className={`wishlist-inline-btn ${wishlisted ? "wishlist-inline-btn-active" : ""}`}
              onClick={handleWishlistToggle}
            >
              {wishlisted ? <FaHeart /> : <FaRegHeart />}
              {wishlisted ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
          <p>
            Seller: <strong>{product.sellerId?.name || "Unknown Seller"}</strong>
          </p>
          <p className={product.stock > 0 ? "stock-yes" : "stock-no"}>
            {product.stock > 0 ? `${product.stock} items available` : "Out of stock"}
          </p>

          {user?.role === "buyer" ? (
            <div className="details-actions">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                type="button"
                className="btn-primary"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="btn-secondary">
                Go to Cart
              </Link>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">
              Login as Buyer to Purchase
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
