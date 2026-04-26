import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer"
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      toast.success(`Welcome to UrbanKart, ${data.user.name}`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="container page-section auth-wrap">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Create UrbanKart Account</h2>
        <label htmlFor="name">Username</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="username"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={6}
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
        <p>
          Already have account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;
