const inventory=require("../models/Inventorymodel");
const cat=require("../models/Categorymodel");


const getData=async(req,res)=>{
    try{
        const data=await inventory.find({});
        res.status(200).json(data);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

const createData=async(req,res)=>{
    const {name,category,quantity,costprice,sellingprice}=req.body;
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

const getDataById=async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await inventory.findById({_id:id});
        res.status(200).json(data);
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

const updateQuantity=async(name,quan)=>{
    try{
        const data=await inventory.findOne({name:name});
        const quantity=data.quantity-quan;
        const d=await inventory.findOneAndUpdate({name:name},{
            quantity:quantity
        })
    }
    catch(e){
        console.log(e.message);
    }
}



const addCategory=async(req,res)=>{
    const {category}=req.body;
    try{
        const data=await cat.create({category})
        res.status(201).json();
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

const getCategory=async(req,res)=>{
    try{
        const data=await cat.find({});
        res.status(200).json(data);
    }
        catch(e){
            res.status(500).json({message:e.message});
        }
}

module.exports={createData,updateData,deleteData,getData,getCategory,getDataById,addCategory,updateQuantity};