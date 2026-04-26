import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      toast.success(`Welcome back, ${data.user.name}`);
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="container page-section auth-wrap">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login to UrbanKart</h2>
        <label htmlFor="identifier">Email or Username</label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          value={formData.identifier}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>
          New user? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
