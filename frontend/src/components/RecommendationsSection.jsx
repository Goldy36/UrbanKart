import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { useAuth } from "../context/AuthContext";

const targetCategories = ["Beauty", "Home", "Sports & Fitness"];

const RecommendationsSection = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axiosInstance.get("/products");
        setProducts(data.products || []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const recommendationCategories = useMemo(() => {
    const fromData = targetCategories.filter((category) =>
      products.some((product) => product.category === category && product.stock > 0)
    );
    return ["All", ...fromData];
  }, [products]);

  useEffect(() => {
    if (!recommendationCategories.includes(activeCategory)) {
      setActiveCategory("All");
    }
  }, [activeCategory, recommendationCategories]);

  const recommendedProducts = useMemo(() => {
    const available = products.filter((product) => product.stock > 0);
    const scoped =
      activeCategory === "All"
        ? available.filter((product) => targetCategories.includes(product.category))
        : available.filter((product) => product.category === activeCategory);

    return [...scoped]
      .sort((a, b) => {
        if (b.stock !== a.stock) return b.stock - a.stock;
        return a.price - b.price;
      })
      .slice(0, 6);
  }, [activeCategory, products]);

  return (
    <section className="container page-section">
      <div className="section-head">
        <h2>Recommended For You</h2>
        <p>
          {user
            ? `${user.name}, here are fresh picks in categories shoppers love right now.`
            : "Curated picks from Beauty, Home, and Sports & Fitness."}
        </p>
      </div>

      <div className="recommendation-chips">
        {recommendationCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`recommendation-chip ${
              activeCategory === category ? "recommendation-chip-active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category === "All" ? "All Picks" : category}
          </button>
        ))}
      </div>

      {loading && <Loader text="Curating recommendations..." />}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {recommendedProducts.length === 0 ? (
            <p className="empty-text">No recommendations available right now.</p>
          ) : (
            recommendedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default RecommendationsSection;
