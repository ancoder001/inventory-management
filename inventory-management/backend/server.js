const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const inventoryRoute=require("./routes/InventoryRoute")
const billRoute=require("./routes/BillingRoute");
const calcroute=require("./routes/CalcRoute");

const app=express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}));

app.use("/inventory",inventoryRoute);
app.use("/bill",billRoute);
app.use("/profit",calcroute);

// mongoose.connect("mongodb+srv://aravindofficial382:admin123@cluster0.tdj1qo9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// .then(()=>{console.log("mongodb connected successfully")})
// .catch((e)=>{console.log(e)})
mongoose.connect("mongodb://localhost:27017/inventory-management")
.then(()=>{console.log("mongodb connected successfully")})
.catch((e)=>{console.log(e)})

app.get("/welcome",(req,res)=>{res.json("welcome")})

app.listen("5600",()=>{
    console.log("Running on port 5600");
})