const mongoose=require("mongoose")

const Schema=mongoose.Schema;
const CategorySchema=new Schema(
    {
        category:{
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model("category",CategorySchema);
