'use client'
import Layout from '@/components/Layout'
import Image from "next/image"
import  axios  from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
const DeleteProduct = () => {
  const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [product, setProduct]=useState({})
  useEffect( ()=>{
    axios.get(`/api/products/${promptId}`).then(response=>{
    const data = response.data
     setProduct(data)
    })
  },[promptId])
  const router = useRouter()
  function goBack(){
    router.push('/products')

  }
  const deleteProduct = async()=>{
   try { 
    const response = await axios.delete(`/api/products/${promptId}`);
        if (response.status !== 200) {
            console.error('Error Deleting product:', response.data);
            return;
        }
         goBack();
    } catch (error) {
        console.error('Error Deleting product:', error.message);
    } 
  }
  return (
    <Layout>
        <div className='flex flex-col justify-center items-center gap-4'>
            <div>
            <Image
            src="/assets/images/Delete.png"
            width={420}
            height={400}
            alt="Delete Image"/>
            </div>
         <h1 className='font-oswald font-bold text-3xl text-pretty text-center'>Do you really want to delete 
         <span > {product.title} ?</span></h1>
         <div className='flex gap-12'>
         <button
         onClick={deleteProduct} 
         className='btn-primary bg-red-700 hover:bg-red-500'>Yes</button>
         <button className='btn-primary'
         onClick={goBack}>No</button>
         </div>
        </div>
    </Layout>
  )
}

export default DeleteProduct