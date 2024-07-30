const express=require("express");
const {newBill}=require("../controllers/BillingController")


const router=express.Router();

router.post("/create",newBill)




module.exports=router;