import {Schema,model,models} from "mongoose";

const productDetails = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String
    },
    price:{
        type: Number,
        requuired: true
    }
})

const ProductDetails = models.ProductDetails || model("ProductDetails", productDetails)
export default ProductDetails