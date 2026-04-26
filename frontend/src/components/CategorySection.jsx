import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: "Devices" },
  { name: "Fashion", icon: "Style" },
  { name: "Home", icon: "Living" },
  { name: "Beauty", icon: "Care" },
  { name: "Sports & Fitness", icon: "Fitness" }
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="container page-section">
      <div className="section-head">
        <h2>Popular Categories</h2>
        <p>Quickly explore trending sections in UrbanKart.</p>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <button
            type="button"
            key={category.name}
            className="category-card"
            onClick={() =>
              navigate(`/products?category=${encodeURIComponent(category.name)}`)
            }
          >
            <span>{category.icon}</span>
            <strong>{category.name}</strong>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
