import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const BecomeSellerPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    storeName: user?.storeName || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await axiosInstance.put("/auth/become-seller", formData);
      updateUser(data.user);
      toast.success("Seller profile updated. You can now add products.");
      navigate("/seller/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to activate seller profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container page-section auth-wrap">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Become a Seller</h2>
        <p>Share your seller information to start listing products for all buyers.</p>

        <label htmlFor="storeName">Store Name</label>
        <input
          id="storeName"
          name="storeName"
          type="text"
          value={formData.storeName}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Business Address (Optional)</label>
        <textarea
          id="address"
          name="address"
          rows="3"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? "Activating..." : "Activate Seller Account"}
        </button>
      </form>
    </section>
  );
};

export default BecomeSellerPage;
