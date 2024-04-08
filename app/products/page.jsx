import Layout from '@/components/Layout'
import Link from "next/link";
const Products = () => {
  return (
    <Layout>
        <Link href={'/products/new'} 
        className='btn-primary font-mono'>
          Add New Product
        </Link>
    </Layout>
  )
}

export default Products