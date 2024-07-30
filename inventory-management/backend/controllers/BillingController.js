const bill=require("../models/Billingmodel");
const inventory=require("./InventoryController")

const newBill=async(req,res)=>{
    const {billno,particulars,total}=req.body;
    try{
        const data=await bill.create({
            billno,particulars,total
        });
        res.status(201).json();
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

module.exports={newBill};