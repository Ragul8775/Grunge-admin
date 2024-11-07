"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

const EditProductContent = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    mrp: "",
    images: [],
    category: "",
    sizes: [
      { sizeLabel: "S", quantity: 0 },
      { sizeLabel: "M", quantity: 0 },
      { sizeLabel: "L", quantity: 0 },
    ],
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (promptId) {
      axios
        .get(`/api/products/${promptId}`)
        .then((response) => {
          const data = response.data;
          setProduct({
            title: data.title,
            description: data.description,
            price: data.price,
            mrp: data.mrp,
            images: data.images,
            category: data.category,
            sizes: data.sizes,
          });
        })
        .catch((error) => console.error("Failed to fetch product:", error));
    }
  }, [promptId]);

  const updateProduct = async (e) => {
    e.preventDefault();
    if (!product.title || !product.description || !product.price) {
      console.error("Title, description, and price are required");
      return;
    }
    setSubmitting(true);
    try {
      const response = await axios.patch(`/api/products/${promptId}`, product, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        router.push("/products");
      } else {
        console.error("Error updating product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProductForm
      type="Edit"
      product={product}
      setProduct={setProduct}
      submitting={submitting}
      handleSubmit={updateProduct}
    />
  );
};

const EditProduct = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProductContent />
      </Suspense>
    </Layout>
  );
};

export default EditProduct;
