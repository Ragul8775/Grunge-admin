import React from 'react'

const ProductForm = ({type,product,setProduct,submitting,handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div className='flex flex-col gap-4'>
        <h1 className=' font-oswald font-semibold tracking-wider '>{type} Product</h1>
       <div className='flex flex-col gap-1'>
       <label>Product Name</label>
        <input
        type='text'
        placeholder='product name '
        value={product.title}
        onChange={(ev)=>setProduct({...product,title:ev.target.value})}/>
        
       </div >
        <div className='flex flex-col gap-1'>
            <label >Description</label>
        <textarea 
        placeholder='descption'
        value={product.description}
        onChange={(ev)=>setProduct({...product,description:ev.target.value})}>

        </textarea>
        </div>
        <div className='flex flex-col gap-1'>
        <label >Price in (₹)</label>
        <input
        type='text'
        placeholder='price'
        value={product.price}
        onChange={(ev)=>setProduct({...product,price:ev.target.value})}/>
        
        </div>

        <button 
        type='submit'
        disabled={submitting}
        className='btn-primary font-grunge'>Save</button>
        </div>
    </form>
  )
}

export default ProductForm