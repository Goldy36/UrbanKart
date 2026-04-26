import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import AddProductForm from "../components/AddProductForm";
import Loader from "../components/Loader";

const AddEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        const product = data.product;
        setInitialValues({
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          stock: product.stock,
          image: product.image,
          imageFile: null
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isEdit]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("price", formData.price);
      payload.append("category", formData.category);
      payload.append("description", formData.description);
      payload.append("stock", formData.stock);
      payload.append("image", formData.image);
      if (formData.imageFile) {
        payload.append("imageFile", formData.imageFile);
      }

      if (isEdit) {
        await axiosInstance.put(`/products/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Product updated successfully");
      } else {
        await axiosInstance.post("/products", payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Product added successfully");
      }
      navigate("/seller/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader text="Preparing product form..." />;

  return (
    <section className="container page-section auth-wrap">
      <AddProductForm
        initialValues={initialValues || undefined}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </section>
  );
};

export default AddEditProductPage;
