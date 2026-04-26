import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getImageUrl } from "../api/axiosInstance";
import { getCategoryFallbackImage } from "../utils/imageFallbacks";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartData, loading, updateCartItem, removeCartItem } = useCart();
  const items = cartData?.cart?.items || [];

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await updateCartItem(productId, quantity);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update quantity");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeCartItem(productId);
      toast.success("Item removed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to remove item");
    }
  };

  if (loading) return <Loader text="Fetching your cart..." />;

  return (
    <section className="container page-section">
      <div className="section-head">
        <h2>Your Cart</h2>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article key={item.product._id} className="cart-item">
                <img
                  src={getImageUrl(item.product.image)}
                  alt={item.product.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getCategoryFallbackImage(
                      item.product.category,
                      item.product.name
                    );
                  }}
                />
                <div>
                  <h3>{item.product.name}</h3>
                  <p>₹{item.product.price}</p>
                  <div className="qty-row">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(item.product._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.product._id, Number(e.target.value))
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(item.product._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-btn danger"
                    onClick={() => handleRemove(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
          <aside className="price-summary">
            <h3>Price Summary</h3>
            <p>
              Items: <strong>{cartData.totalItems}</strong>
            </p>
            <p>
              Total: <strong>₹{cartData.totalAmount}</strong>
            </p>
            <Link to="/checkout" className="btn-primary">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
};

export default CartPage;
