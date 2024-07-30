const express=require("express");
const {createData}=require("../controllers/InventoryController");

const router=express.Router();

router.post("/add",createData);

module.exports=router;