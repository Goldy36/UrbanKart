import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance, { getImageUrl } from "../api/axiosInstance";
import { getCategoryFallbackImage } from "../utils/imageFallbacks";
import Loader from "../components/Loader";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/products/seller/listings/me");
      setProducts(data.products || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch your listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchMyProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete product");
    }
  };

  const lowStockProducts = useMemo(
    () => products.filter((product) => Number(product.stock) <= 5),
    [products]
  );

  const inventoryValue = useMemo(
    () =>
      products.reduce(
        (sum, product) => sum + Number(product.price || 0) * Number(product.stock || 0),
        0
      ),
    [products]
  );

  const totalUnits = useMemo(
    () => products.reduce((sum, product) => sum + Number(product.stock || 0), 0),
    [products]
  );

  const topCategory = useMemo(() => {
    if (products.length === 0) return "N/A";
    const categoryCounts = products.reduce((acc, product) => {
      const key = product.category || "Uncategorized";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0][0];
  }, [products]);

  const exportToCsv = () => {
    if (products.length === 0) {
      toast.info("No products to export");
      return;
    }

    const headers = ["Name", "Category", "Price", "Stock", "Created At"];
    const rows = products.map((product) => [
      product.name,
      product.category,
      product.price,
      product.stock,
      new Date(product.createdAt).toISOString()
    ]);

    const escapeCsv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csvContent = [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "seller-inventory-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Inventory report downloaded");
  };

  return (
    <section className="container page-section">
      <div className="dashboard-head">
        <div>
          <h2>Seller Dashboard</h2>
          <p>Manage products, monitor inventory, and export a quick report.</p>
        </div>
        <div className="recent-actions">
          <button type="button" className="btn-secondary" onClick={exportToCsv}>
            Export CSV
          </button>
          <Link to="/seller/add-product" className="btn-primary">
            Add Product
          </Link>
        </div>
      </div>

      {!loading && (
        <div className="insights-grid">
          <article className="insight-card">
            <span>Total Listings</span>
            <strong>{products.length}</strong>
          </article>
          <article className="insight-card">
            <span>Total Units in Stock</span>
            <strong>{totalUnits}</strong>
          </article>
          <article className="insight-card">
            <span>Inventory Value</span>
            <strong>INR {inventoryValue}</strong>
          </article>
          <article className="insight-card">
            <span>Top Category</span>
            <strong>{topCategory}</strong>
          </article>
        </div>
      )}

      {!loading && lowStockProducts.length > 0 && (
        <div className="low-stock-alert">
          <h3>Low Stock Alert</h3>
          <p>{lowStockProducts.length} product(s) need restock soon.</p>
          <ul>
            {lowStockProducts.slice(0, 5).map((product) => (
              <li key={product._id}>
                {product.name} - only {product.stock} left
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <Loader text="Loading your products..." />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>You have not listed any products yet.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {products.map((product) => (
            <article key={product._id} className="seller-card">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getCategoryFallbackImage(
                    product.category,
                    product.name
                  );
                }}
              />
              <div>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>INR {product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
              <div className="seller-actions">
                <Link className="btn-secondary" to={`/seller/edit-product/${product._id}`}>
                  Edit
                </Link>
                <button
                  type="button"
                  className="text-btn danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default SellerDashboard;
