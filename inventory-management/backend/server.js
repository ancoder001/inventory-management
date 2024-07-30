const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const inventoryRoute=require("./routes/InventoryRoute")

const app=express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));

app.use("/",inventoryRoute);

mongoose.connect("mongodb://localhost:27017/inventory-management")
.then(()=>{console.log("mongodb connected successfully")})
.catch((e)=>{console.log(e)})

app.get("/welcome",(req,res)=>{res.json("welcome")})

app.listen("5600",()=>{
    console.log("Running on port 5600");
})