const inventory=require("../models/Inventorymodel");


const createData=async(req,res)=>{
    const {name,cat,quantity,cp,sp}=req.body;
    try{
        const data=await inventory.create({name:name,category:cat,quantity:quantity,costprice:cp,sellingprice:sp});
        res.status(201).json();
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

module.exports={createData};