import { mongooseConnect } from "@/lib/mongoose";
import ProductDetails from "@/models/productDetails";


export const POST = async (req)=>{
        
        await mongooseConnect();

        const { title,  description, price,mrp, images ,category,sizes} = await req.json();
       
      try {
                     
            const productDoc = await ProductDetails.create({ 
                title, 
                description, 
                price ,
                mrp,
                images,
                category,
                sizes
            });
            
            return new Response(JSON.stringify(productDoc), { status: 201 });
        } catch (error) {
            console.error('Error creating product:', error);
            return new Response(JSON.stringify("Internal Server Error:",error),{
                status:500
            })
          
        }
    
}

export const GET = async (req)=>{
        
    await mongooseConnect();
    
    if(req.query?.id){
        const product = await ProductDetails.findOne({_id:req.query.id});
        return new Response(JSON.stringify(product),{status:200})
    }else{

        try {
           const products = await ProductDetails.find();
           
          return new Response(JSON.stringify(products), { status: 200});
        } catch (error) {
            console.error('Error Getting product:', error);
            return new Response(JSON.stringify("Internal Server Error:",error),{
                status:500
            })
          
        }
    }

}