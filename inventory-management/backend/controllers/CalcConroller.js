const Bill =require("../models/Billingmodel");
const Inventory=require("../models/Inventorymodel");


const calculateProfit = async (bills) => {
    var totalProfit = 0;
  
    // for (const bill of bills) {
    //   for (const item of bill.particulars) {
    //     const inventoryItem = await Inventory.findOne({ name: item.name });
    //     if (inventoryItem) {
    //       const costPrice = inventoryItem.costprice;
    //       const profit = (item.price - costPrice) * item.quantity;
    //       totalProfit += profit;
    //     }
    //   }
    // }
    bills.forEach(element => {
      element.particulars.forEach(ele=>{
        console.log(ele)
        totalProfit+=((ele.price-ele.cp)*ele.quantity)
      })
    });
    return totalProfit;
  };
  
  // Utility function to calculate category-wise profit
  const calculateCategoryProfits = async (bills) => {
    const categoryProfits = {};
  
    for (const bill of bills) {
      for (const item of bill.particulars) {
        const inventoryItem = await Inventory.findOne({ name: item.name });
        if (inventoryItem) {
          const category = inventoryItem.category;
          const costPrice = inventoryItem.costprice;
          const profit = (item.price - item.cp) * item.quantity;
          if (!categoryProfits[category]) {
            categoryProfits[category] = 0;
          }
          categoryProfits[category] += profit;
        }
      }
    }
  
    return categoryProfits;
  };

  const daily=async(req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const bills = await Bill.find({createdAt : {$gte:today}});
      let profit = 0;
      bills.forEach(element => {
        element.particulars.forEach(ele=>{
          profit+=((ele.price-ele.cp)*ele.quantity)
        })
      });
      res.status(200).json( {profit} );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const weekly=async (req, res) => {
    try {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      const bills = await Bill.find({ createdAt: { $gte: lastWeek } });
      let profit = 0;
      bills.forEach(element => {
        element.particulars.forEach(ele=>{
          profit+=((ele.price-ele.cp)*ele.quantity)
        })
      });
      res.json({ profit });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const monthly=async (req, res) => {
    try {
      const today = new Date();
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      const bills = await Bill.find({ createdAt: { $gte: lastMonth } });
      let profit = 0;
      bills.forEach(element => {
        element.particulars.forEach(ele=>{
          profit+=((ele.price-ele.cp)*ele.quantity)
        })
      });
      res.json({ profit });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const category=async (req, res) => {
    try {
      const bills = await Bill.find();
      const categoryProfits = await calculateCategoryProfits(bills);
      res.json({ categoryProfits });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports={daily,monthly,weekly,category};
