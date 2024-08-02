const bill=require("../models/Billingmodel");
const inventory=require("./InventoryController")

const newBill=async(req,res)=>{
    const {customername,mobile,billno,particulars,total}=req.body;
    try{
        const data=await bill.create({
            customername,mobile,billno,particulars,total
        });
        particulars.forEach(element => {
            inventory.updateQuantity(element.name,element.quantity)
        });
        res.status(201).json();
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

const getBills=async(req,res)=>{
    try{
        const data=await bill.find({});
        res.status(200).json(data)
    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}

module.exports={newBill,getBills};