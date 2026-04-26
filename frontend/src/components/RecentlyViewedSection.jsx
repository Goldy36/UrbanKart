import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDiscovery } from "../context/DiscoveryContext";

const RecentlyViewedSection = () => {
  const { recentlyViewed, clearRecentlyViewed } = useDiscovery();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="container page-section">
      <div className="dashboard-head">
        <div className="section-head">
          <h2>Recently Viewed</h2>
          <p>Continue exploring products you checked recently.</p>
        </div>
        <div className="recent-actions">
          <button type="button" className="btn-secondary" onClick={clearRecentlyViewed}>
            Clear History
          </button>
          <Link to="/products" className="btn-primary">
            Explore More
          </Link>
        </div>
      </div>

      <div className="product-grid">
        {recentlyViewed.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedSection;
