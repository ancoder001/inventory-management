import React, { useState } from 'react';
import Header from '../components/Header';

const Home = () => {
  const [data, setData] = useState({
    totalProducts: 100,
    totalInvested: 50000,
    totalEarnings: 75000,
    totalProfit: 25000,
    profitPercentage: 50,
  });

  return (
    <div className="p-6">
      <Header title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Total Products</h2>
          <p className="text-2xl">{data.totalProducts}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Total Invested</h2>
          <p className="text-2xl">₹{data.totalInvested}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Total Earnings</h2>
          <p className="text-2xl">₹{data.totalEarnings}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Total Profit</h2>
          <p className="text-2xl">₹{data.totalProfit}</p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Profit Percentage</h2>
          <p className="text-2xl">{data.profitPercentage}%</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Analysis Charts</h2>
        {/* Add your charts here */}
      </div>
    </div>
  );
};

export default Home;
