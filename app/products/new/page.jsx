'use client'
import Layout from '@/components/Layout'

import React, { useState } from 'react'
import axios  from 'axios'
const  NewProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const createProduct = async(e)=>{
    e.preventDefault()
    const data = {title,description,price}
    await axios.post('/api/products',data);
  }
  return (
    <Layout>
    <form onSubmit={createProduct}>
    <div className='flex flex-col gap-4'>
        <h1 className=' font-oswald font-semibold tracking-wider '>New Product</h1>
       <div className='flex flex-col gap-1'>
       <label>Product Name</label>
        <input
        type='text'
        placeholder='product name '
        value={title}
        onChange={(ev)=>setTitle(ev.target.value)}/>
        
       </div >
        <div className='flex flex-col gap-1'>
            <label >Description</label>
        <textarea 
        placeholder='descption'
        value={description}
        onChange={(ev)=>setDescription(ev.target.value)}>

        </textarea>
        </div>
        <div className='flex flex-col gap-1'>
        <label >Price in (₹)</label>
        <input
        type='text'
        placeholder='price'
        value={price}
        onChange={(ev)=>setPrice(ev.target.value)}/>
        
        </div>

        <button 
        type='submit'
        className='btn-primary font-grunge'>Save</button>
        </div>
    </form>
    </Layout>
  )
}

export default NewProduct