import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "./ProductCard";
import Loader from "./Loader";

const ProductList = ({ showFilters = true, limit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "-createdAt");

  useEffect(() => {
    setSearch(searchParams.get("q") || "");
    setCategory(searchParams.get("category") || "All");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSort(searchParams.get("sort") || "-createdAt");
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/products/categories/all");
        setCategories(data.categories || []);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {
          q: searchParams.get("q") || undefined,
          category: searchParams.get("category") || undefined,
          minPrice: searchParams.get("minPrice") || undefined,
          maxPrice: searchParams.get("maxPrice") || undefined,
          sort: searchParams.get("sort") || undefined
        };
        const { data } = await axiosInstance.get("/products", { params });
        setProducts(data.products || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const applyFilters = (e) => {
    e.preventDefault();
    const params = {};
    if (search.trim()) params.q = search.trim();
    if (category && category !== "All") params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort && sort !== "-createdAt") params.sort = sort;
    setSearchParams(params);
  };

  const filteredProducts = useMemo(
    () => (limit ? products.slice(0, limit) : products),
    [products, limit]
  );

  return (
    <section className="container page-section">
      <div className="section-head">
        <h2>{limit ? "Featured Products" : "All Products"}</h2>
        <p>Browse top collections with live stock and price details.</p>
      </div>

      {showFilters && (
        <form className="filter-bar" onSubmit={applyFilters}>
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="-createdAt">Latest</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="-name">Name: Z to A</option>
          </select>
          <button type="submit" className="btn-primary">
            Apply
          </button>
        </form>
      )}

      {loading && <Loader text="Loading products..." />}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && (
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p className="empty-text">No products found for selected filters.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default ProductList;
