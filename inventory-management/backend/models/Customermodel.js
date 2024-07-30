const mongoose=require("mongoose")

const Schema=mongoose.Schema;

const customerSchema=new Schema(
    {
        customername:{
            type:String
        },
        mobile:{
            type:Number
        }
    }
)

module.exports=mongoose.model("customer",customerSchema);