const inventory=require("../models/Inventorymodel");


const createData=async(req,res)=>{
    const {name,category,quantity,costp,sellingprice}=req.body;
    try{
        const data=await inventory.create({name:name,category:category,quantity:quantity,costprice:costprice,sellingprice:sellingprice});
        res.status(201).json();
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

const updateData=async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await inventory.findByIdAndUpdate({_id:id},{
            ...req.body
        });
        res.status(200).json({message:"Data Updated Successfully"});
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

const deleteData=async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await inventory.findByIdAndDelete({_id:id});
        res.status(200).json()
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

module.exports={createData,updateData,deleteData};