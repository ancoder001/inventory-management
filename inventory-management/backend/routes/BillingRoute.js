const express=require("express");
const {newBill,getBills}=require("../controllers/BillingController")


const router=express.Router();

router.post("/create",newBill)
router.get("/get",getBills);




module.exports=router;