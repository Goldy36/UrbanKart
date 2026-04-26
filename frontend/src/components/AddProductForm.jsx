import { useState } from "react";

const AddProductForm = ({ initialValues, onSubmit, submitting }) => {
  const [formData, setFormData] = useState(
    initialValues || {
      name: "",
      price: "",
      category: "",
      description: "",
      stock: "",
      image: "",
      imageFile: null
    }
  );
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description ||
      !formData.stock
    ) {
      setValidationError("Please fill all required fields.");
      return;
    }

    if (!formData.image && !formData.imageFile) {
      setValidationError("Please add an image URL or upload local image.");
      return;
    }

    setValidationError("");
    onSubmit(formData);
  };

  return (
    <form className="form-card product-form" onSubmit={submitForm}>
      <h2>{initialValues ? "Edit Product" : "Add New Product"}</h2>
      {validationError && <p className="error-text">{validationError}</p>}

      <label htmlFor="name">Product Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price (INR)</label>
      <input
        id="price"
        name="price"
        type="number"
        min="0"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        type="text"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <label htmlFor="stock">Stock</label>
      <input
        id="stock"
        name="stock"
        type="number"
        min="0"
        value={formData.stock}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="image">Image URL</label>
      <input
        id="image"
        name="image"
        type="url"
        placeholder="https://..."
        value={formData.image}
        onChange={handleChange}
      />

      <label htmlFor="imageFile">Or Upload Local Image</label>
      <input id="imageFile" name="imageFile" type="file" accept="image/*" onChange={handleFile} />

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Saving..." : initialValues ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
