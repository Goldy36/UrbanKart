import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartData, fetchCart } = useCart();
  const items = cartData?.cart?.items || [];

  const placeOrder = async () => {
    try {
      const { data } = await axiosInstance.post("/orders/checkout");
      toast.success(data.message || "Order placed successfully");
      await fetchCart();
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <section className="container page-section">
      <div className="section-head">
        <h2>Checkout</h2>
        <p>Verify your final amount and place order.</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>No items available for checkout.</p>
        </div>
      ) : (
        <div className="checkout-card">
          <ul>
            {items.map((item) => (
              <li key={item.product._id}>
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <strong>₹{item.subtotal}</strong>
              </li>
            ))}
          </ul>
          <hr />
          <h3>Total Amount: ₹{cartData.totalAmount}</h3>
          <button type="button" className="btn-primary" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
