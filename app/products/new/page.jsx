'use client'
import Layout from '@/components/Layout'
import { useRouter } from "next/navigation";
import React, { useState } from 'react'
import axios  from 'axios'
import ProductForm from '@/components/ProductForm';
const  NewProduct = () => {
  const [product, setProduct]=useState({
    title:"",
    description:"",
    price:""
  })
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const createProduct = async(e)=>{
    e.preventDefault()
    setSubmitting(true);
     
     if (!product.title || !product.description || !product.price) {
      console.error('Title, description, and price are required');
      return;
    }
    try {
    const data = product
  
    axios.post('/api/products', data,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(router.push("/products"))
  } catch (error) {
    console.error('Error creating product:', error);
  }finally{
    setSubmitting(false)
  }
  }
  return (
    <Layout>
    <ProductForm
    type="New"
    product={product}
    setProduct={setProduct}
    submitting={submitting}
    handleSubmit={createProduct}/>
    </Layout>
  )
}

export default NewProduct