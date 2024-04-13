
import { mongooseConnect } from "@/lib/mongoose";
import ProductDetails from "@/models/productDetails";
export const GET = async (req,{params})=>{
        
    await mongooseConnect();
    try {
            const product = await ProductDetails.findOne({
                _id: params.id,
              })
     
          
              return new Response(JSON.stringify(product), { status: 200 });
        } catch (error) {
            console.error('Error Getting product:', error);
            return new Response(JSON.stringify("failed to fetch product:",error),{
                status:500
            })
          
        }
    

}
export const PATCH = async (request, { params }) => {
    try {
    const { title,description,price,images ,category,sizes,mrp} = await request.json();
    console.log({
      "Tile":title,
      "Images":images
    })
        await mongooseConnect()
      const existingProduct = await ProductDetails.findById(params.id);
      if (!existingProduct) {
        return new Response("The prompt does not exist", { status: 404 });
      }
      existingProduct.title = title;
      existingProduct.description = description;
      existingProduct.price = price;
      existingProduct.mrp = mrp;
      existingProduct.images = images;
      existingProduct.category = category;
      existingProduct.sizes = sizes;
      await existingProduct.save();
      console.log("Product updated:", existingProduct);
      return new Response(JSON.stringify(existingProduct), { status: 200 });
    } catch (error) {
        console.error("Failed to update product:", error.message);
        return new Response("Failed to update product: " + error.message, {
            status: 500,
        });
    }
  };
  
  export const DELETE = async (request, { params }) => {
    try {
      await mongooseConnect()
      await ProductDetails.findByIdAndDelete(params.id);
   
  
      return new Response("Product Deleted successFully", { status: 200 });
    } catch (error) {
      return new Response("Failed to Delete the product", { status: 500 });
    }
  };