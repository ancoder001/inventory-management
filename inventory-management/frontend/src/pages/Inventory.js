import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [updatedata, setUpdatedata] = useState();
  const [up, setUp] = useState(false);
  const [lastupdate, setLastupdate] = useState('');
  

  // Adding useState hooks for form fields
  const [itemname, setItemname] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [cp, setCp] = useState(0);
  const [sp, setSp] = useState(0);

  // Updating useState hooks
  const [id, setId] = useState();

  const [newCategory, setNewCategory] = useState('');

  const getdata = () => {
    axios.get('http://localhost:5600/inventory/data')
      .then(response => {
        setInventory(response.data);
        
      })
      .catch((e) => { console.log(e) })
    axios.get('http://localhost:5600/inventory/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch((e) => { console.log(e) })
      axios.get("http://localhost:5600/api/last-updated")
      .then((res)=>{
        const updates=convertGMTtoIST(res.data.lastUpdated);
        setLastupdate(updates)
      })
      .catch((e) => { console.log(e) })
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleOpen = (e) => {
    setOpen(!open);
    setUp(false);
    setItemname("");
    setCategory("");
    setQuantity(0);
    setCp(0);
    setSp(0);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    setUp(false);
    setOpen(!open);
    const prevdata = inventory.filter((it) => (it.name === itemname))
    if (prevdata.length > 0) {
      alert("Item already exists");
      return;
    }
    const data = { name: itemname, category: category, quantity: quantity, costprice: cp, sellingprice: sp }
    axios.post('http://localhost:5600/inventory/add', data)
      .then((res) => {
        if (res.status === 201) {
          getdata();
          alert("Item added successfully")
        }
      })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5600/inventory/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          getdata();
          alert("Item deleted successfully");
        }
      })
  }

  const getupdatedata=(id)=>{
    axios.get(`http://localhost:5600/inventory/find/${id}`)
    .then((res)=>{
      setUpdatedata(res.data)
    })
  }

  const handleUpdate = (id) => {
    getupdatedata(id);
    setUp(true);
    setItemname(updatedata?.name);
    setCategory(updatedata?.category);
    setQuantity(updatedata?.quantity);
    setCp(updatedata?.costprice);
    setSp(updatedata?.sellingprice);
    setId(id);
    setOpen(!open);
  }

  const handleUp = (e) => {
    e.preventDefault();
    const data = { name: itemname, category: category, quantity: quantity, costprice: cp,sellingprice:sp }
    axios.put(`http://localhost:5600/inventory/update/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          getdata();
          alert("Updated successfully");
          setOpen(!open)

          setItemname("");
          setCategory("");
          setQuantity(0);
          setCp(0);
          setSp(0);
          setUp(false);
        }
      })
  }

  const handleAddCategory = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5600/inventory/addcategory', { category: newCategory })
      .then((res) => {
        if (res.status === 201) {
          getdata();
          alert("Category added successfully");
          setOpenCategoryDialog(false);
          setNewCategory('');
        }
      })
  }

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const convertGMTtoIST=(gmtDate)=> {
    const date = new Date(gmtDate);
    const options = { timeZone: "Asia/Kolkata", year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleString('en-IN', options);
}
  useEffect(() => {
    getdata();
  }, [])

  return (
    <div className="p-6">
      <Header title="Inventory" />
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">Inventory</div>
        <div>Last updated: {lastupdate}</div>
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
        <button onClick={() => setOpenCategoryDialog(true)} className="ml-4 bg-green-500 text-white p-2 rounded">Add Category</button>
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
              <tr key={item._id}>
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2 text-center">{item.name}</td>
                <td className="py-2 text-center">{item.category}</td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-center">₹{item.costprice}</td>
                <td className="py-2 text-center">₹{item.sellingprice}</td>
                <td className="py-2 text-center">₹{item.costprice * item.quantity}</td>
                <td className="py-2 text-center">₹{(item.sellingprice * item.quantity) - (item.costprice * item.quantity)}</td>
                <td className="py-2 text-center">
                  <button className="bg-yellow-500 text-white p-2 rounded" onClick={() => { handleUpdate(item._id) }}>Update</button>
                  <button className="bg-red-500 text-white p-2 rounded ml-2" onClick={() => { handleDelete(item._id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={open} onClose={handleOpen}>
        <div className='flex'>
          <DialogTitle>{up ? "Update Item" : "Add Item"}</DialogTitle>
          <Button onClick={handleOpen}>Close</Button>
        </div>
        <DialogContent>
          <form className='flex flex-col gap-3'>
            <Autocomplete
              freeSolo
              options={inventory.map(item => item.name)} // Provide options from the inventory
              value={itemname} // Set the current value
              onChange={(event, value) => {
                setItemname(value || ''); // Set the itemname to the selected value or an empty string
                const selectedItem = inventory.find(item => item.name === value);
                if (selectedItem) {
                  setCp(selectedItem.costprice);
                  setSp(selectedItem.sellingprice);
                } else {
                  setCp(0); // Reset price fields if no item is selected
                  setSp(0);
                }
              }}
              onInputChange={(event, value) => {
                setItemname(value); // Update the itemname state based on user input
                if (!inventory.some(item => item.name === value)) {
                  setCp(0); // Reset price fields for new item
                  setSp(0);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Item Name" variant="outlined" />
              )}
            />
            <select value={category} onChange={(e) => { setCategory(e.target.value) }} className='border-2 border-gray-300 rounded-sm'>
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option value={item.category} key={index}>{item.category}</option>
              ))}
            </select>
            <TextField type='number' label="Quantity" variant="outlined" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
            <TextField type='number' label="Cost Price" variant="outlined" value={cp} onChange={(e) => { setCp(e.target.value) }} />
            <TextField type='number' label="Selling Price" variant="outlined" value={sp} onChange={(e) => { setSp(e.target.value) }} />
            {!up ? <Button variant="contained" color="primary" onClick={(e) => { handleAdd(e) }}>Add</Button> :
              <Button variant="contained" color="primary" onClick={(e) => { handleUp(e) }}>Update</Button>}
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <form className='flex flex-col gap-3'>
            <TextField
              type="text"
              label="Category Name"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={(e) => handleAddCategory(e)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Inventory;
