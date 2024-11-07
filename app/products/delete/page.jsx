"use client";

import Layout from "@/components/Layout";
import Image from "next/image";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const DeleteProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id"); // Changed variable name to be more descriptive
  const [product, setProduct] = useState(null); // Set initial state as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/products/${productId}`);
      if (response.status === 200) {
        goBack();
      } else {
        console.error("Error deleting product:", response.data);
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-4">
        <div>
          <Image
            src="/assets/images/Delete.png"
            width={420}
            height={400}
            alt="Delete Image"
          />
        </div>
        <h1 className="font-oswald font-bold text-3xl text-pretty text-center">
          Do you really want to delete <span>{product.title}?</span>
        </h1>
        <div className="flex gap-12">
          <button
            onClick={deleteProduct}
            className="btn-primary bg-red-700 hover:bg-red-500"
          >
            Yes
          </button>
          <button className="btn-primary" onClick={goBack}>
            No
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default function DeleteProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeleteProduct />
    </Suspense>
  );
}
