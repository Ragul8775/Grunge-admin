import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/NewCategory";


export const DELETE = async(req,{params})=>{
    await mongooseConnect();

   try {
   
    await Category.findByIdAndDelete(params.id);
    return new Response("Category Deleted successFully", { status: 200 });
    
   } catch (error) {
    console.log(error)
    return new Response("Failed to Delete the Category", { status: 500 });
   }
  }