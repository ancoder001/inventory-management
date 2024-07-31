import React, { useState } from 'react';
import Header from '../components/Header';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

const cat=["stationary","art","note"]
const sampleInventory = [
  { id: 1, name: 'Product 1', category: 'Category 1', quantity: 10, costPrice: 50, sellingPrice: 70, totalInvested: 500, totalProfit: 200 },
  { id: 2, name: 'Product 2', category: 'Category 2', quantity: 20, costPrice: 30, sellingPrice: 50, totalInvested: 600, totalProfit: 400 },
  // Add more sample data as needed
];

const Inventory = () => {
  const [open,setOpen]=useState(false);
  const [inventory, setInventory] = useState(sampleInventory);
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleOpen=(e)=>{
    setOpen(!open);
  }

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <Header title="Inventory" />
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">Inventory</div>
        <div>Last updated: {new Date().toLocaleString()}</div>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          className="border p-2 flex-grow"
        />
        <button onClick={handleOpen} className="ml-4 bg-blue-500 text-white p-2 rounded">Add Item</button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">Serial No</th>
              <th className="py-2">Product Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Cost Price</th>
              <th className="py-2">Selling Price</th>
              <th className="py-2">Total Invested</th>
              <th className="py-2">Total Profit</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.category}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">₹{item.costPrice}</td>
                <td className="py-2">₹{item.sellingPrice}</td>
                <td className="py-2">₹{item.totalInvested}</td>
                <td className="py-2">₹{item.totalProfit}</td>
                <td className="py-2">
                  <button className="bg-yellow-500 text-white p-2 rounded">Update</button>
                  <button className="bg-red-500 text-white p-2 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={open} onClose={handleOpen}>
      <div className='flex'>
        <DialogTitle>Add Item</DialogTitle>
        <button onClick={handleOpen}>close</button>
        </div>
        <DialogContent>
            <form className='flex flex-col gap-3'>
                <input className='w-48 border-2 border-gray-300 rounded-sm focus:outline-none' type="text" placeholder='Item Name' />
                <select className='border-2 border-gray-300 rounded-sm'>
                    <option value="">Select Category</option>
                    {cat.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                        ))}
                </select>
                <input className='w-48 border-2 border-gray-300 rounded-sm focus:outline-none' type='number' min={"0"} placeholder='Quantity' />
                <input className='w-48 border-2 border-gray-300 rounded-sm focus:outline-none' type='number' min={"0"} placeholder='Cost Price' />
                <input className='w-48 border-2 border-gray-300 rounded-sm focus:outline-none' type='number' min={"0"} placeholder='Selling Price' />
                <input className=' bg-green-500 p-1 rounded-md hover:bg-green-700' type='submit' value={"Add"}/>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
