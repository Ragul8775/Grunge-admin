import mongoose, {Schema,model,models} from "mongoose";

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
    },
    mrp:{
        type: Number,
        requuired: true
    },
    images:{
        type:[String]
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },sizes: [{
        sizeLabel: { type: String, required: true },
        quantity: { type: Number, required: true }
    }]

})

const ProductDetails = models.ProductDetails || model("ProductDetails", productDetails)
export default ProductDetails