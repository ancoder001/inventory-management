const express=require("express");
const {daily,weekly,monthly,category}=require("../controllers/CalcConroller");

const router=express.Router();

router.get("/daily",daily);
router.get("/weekly",weekly);
router.get("/monthly",monthly);
router.get("/category",category);


module.exports=router;