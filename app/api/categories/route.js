import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/NewCategory";



export const POST = async (req, res) => {
  const { name, parentCategories } = await req.json();

  await mongooseConnect();

 

  try {
      const categoryDoc = await Category.create({
          name,
          parent: parentCategories ? parentCategories : null,
      });
      return new Response(JSON.stringify(categoryDoc),{status:200})
  } catch (error) {
      console.error("Error creating category:", error);
    
      return new Response(JSON.stringify("Error",error),{status:500})
  }
}

export const GET = async(req)=>{
  await mongooseConnect();
  try {
    const category = await Category.find().populate('parent')
  return new Response(JSON.stringify(category),{status:200})
  } catch (error) {
    console.log(error)
    return new Response("Failed to fetch Categories", { status: 500 });
  }

}