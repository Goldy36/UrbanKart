import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { getImageUrl } from "../api/axiosInstance";
import { getCategoryFallbackImage } from "../utils/imageFallbacks";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const route = user?.role === "seller" ? "/orders/seller-orders" : "/orders/my-orders";
        const { data } = await axiosInstance.get(route);
        setOrders(data.orders || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.role]);

  if (loading) return <Loader text="Loading orders..." />;

  return (
    <section className="container page-section">
      <div className="section-head">
        <h2>{user?.role === "seller" ? "Seller Sales History" : "My Orders"}</h2>
      </div>
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found yet.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <article key={order._id} className="order-card">
              <div className="order-head">
                <strong>Order #{order._id.slice(-6).toUpperCase()}</strong>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.totalAmount}</p>
              <div className="order-items">
                {order.products.map((item) => (
                  <div key={`${order._id}-${item.productId}`} className="order-item">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = getCategoryFallbackImage(
                          item.category || "Products",
                          item.name
                        );
                      }}
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>
                        Qty: {item.quantity} x ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrdersPage;
