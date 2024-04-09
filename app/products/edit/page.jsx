"use client";
import { useEffect, useState } from "react";

import { useSearchParams,useRouter } from "next/navigation";
import axios  from "axios";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

const EditProduct = () => {
    const[submitting, setSubmitting] = useState(false)
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [product, setProduct]=useState({
      title:"",
      description:"",
      price:""
    })
    const router = useRouter()
    useEffect( ()=>{
       axios.get(`/api/products/${promptId}`).then(response=>{
       const data = response.data
        setProduct({
          title:data.title,
          description:data.description,
          price:data.price,
        })
       })
    },[promptId])
    const updateProduct = async (e) => {
      e.preventDefault();
      if (!product.title || !product.description || !product.price) {
          console.error('Title, description, and price are required');
          return;
      }
       try {
          const data = product;
          const response = await axios.patch(`/api/products/${promptId}`, data, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.status !== 200) {
              console.error('Error updating product:', response.data);
              return;
          }
           router.push('/products');
      } catch (error) {
          console.error('Error updating product:', error.message);
      } finally {
          
          setSubmitting(false);
      }
  };

  return (
    <Layout>
       <ProductForm
    type="Edit"
    product={product}
    setProduct={setProduct}
    submitting={submitting}
    handleSubmit={updateProduct}/>
    </Layout>
  )
}

export default EditProduct