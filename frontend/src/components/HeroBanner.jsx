import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="container hero-content">
        <p className="hero-badge">Trusted by modern shoppers</p>
        <h1>UrbanKart: Shop Fast, Sell Smart, Grow Everyday</h1>
        <p>
          Discover premium electronics, fashion, and lifestyle products from verified
          sellers. Built for smooth shopping on desktop and mobile.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
          <Link to="/register" className="btn-secondary">
            Become a Seller
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
