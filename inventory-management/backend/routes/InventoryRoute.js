const express=require("express");
const {createData,updateData,deleteData}=require("../controllers/InventoryController");

const router=express.Router();

router.post("/add",createData);
router.put("/update/:id",updateData);
router.delete("/delete/:id",deleteData);

module.exports=router;