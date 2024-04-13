import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/NewCategory";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";



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

export const PUT = async(req)=>{
  const {name,parentCategories,_id} = await req.json();
  
  await mongooseConnect();
try {
  const existingCategory = await Category.findById(_id);
  if (!existingCategory) {
    return new Response("The Category does not exist", { status: 404 });
  }
  existingCategory.name = name;
  existingCategory.parent = parentCategories ? parentCategories : null,
    
    await existingCategory.save();
  return new Response(JSON.stringify(existingCategory),{status:200})
} catch (error) {
  console.error("Error creating category:", error);
      console.log(error)
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

export const DELETE = async(req)=>{
  await mongooseConnect();
  
 try {
  const { _id } = req.query;

  await Category.findByIdAndDelete(_id);
  return new Response("Category Deleted successFully", { status: 200 });
 } catch (error) {
  console.log(error)
  return new Response("Failed to Delete the Category", { status: 500 });
 }
}