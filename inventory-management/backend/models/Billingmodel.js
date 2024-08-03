const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const billingSchema=new Schema({
    customername:{
        type:String
    },
    mobile:{
        type:Number
    },
    billno:{
        type:Number
    },
    particulars:[
        {
            name:{
                type:String
            },
            quantity:{
                type:Number
            },
            price:{
                type:Number
            },
            cp:{
                type:Number
            }
        }
    ],
    total:{
        type:Number
    }
},{timestamps:true})

module.exports=mongoose.model("bill",billingSchema);