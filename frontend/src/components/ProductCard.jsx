import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getImageUrl } from "../api/axiosInstance";
import { getCategoryFallbackImage } from "../utils/imageFallbacks";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const fallbackImage = getCategoryFallbackImage(product.category, product.name);
  const wishlisted = isWishlisted(product._id);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add to cart");
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product._id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <article className="product-card">
      <button
        type="button"
        className={`wishlist-fab ${wishlisted ? "wishlist-fab-active" : ""}`}
        onClick={handleWishlistToggle}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {wishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/products/${product._id}`} className="product-image-wrap">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </Link>

      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-meta">
          <strong>INR {product.price}</strong>
          <span>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
        </div>
        <div className="product-actions">
          <Link to={`/products/${product._id}`} className="btn-secondary">
            View
          </Link>
          {user?.role === "buyer" && (
            <button
              type="button"
              className="btn-primary"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
