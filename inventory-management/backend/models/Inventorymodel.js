const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const InventorySchema=new Schema(
    {
        name:{
            type:String
        },
        category:{
            type:String
        },
        quantity:{
            type:Number
        },
        costprice:{
            type:Number
        },
        sellingprice:{
            type:Number
        },
        
    },
    {timestamps:true}
);

module.exports=mongoose.model("inventory",InventorySchema);