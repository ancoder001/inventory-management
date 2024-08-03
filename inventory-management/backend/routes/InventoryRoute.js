const express=require("express");
const {createData,updateData,deleteData,getData,getCategory,getDataById,addCategory}=require("../controllers/InventoryController");

const router=express.Router();

router.get("/data",getData);
router.get("/category",getCategory);
router.post("/addcategory",addCategory);
router.post("/add",createData);
router.get("/find/:id",getDataById);
router.put("/update/:id",updateData);
router.delete("/delete/:id",deleteData);


module.exports=router;