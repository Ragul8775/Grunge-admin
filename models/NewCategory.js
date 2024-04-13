import mongoose,{Schema, model, models} from "mongoose"



const categorySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    parent:{
        type: mongoose.Types.ObjectId,
        ref:'Category'
    },
    properties:[{type:Object}]
})

const Category = models?.Category|| model('Category',categorySchema)
export default Category;