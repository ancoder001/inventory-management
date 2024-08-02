import React from 'react';

const Bill = (props) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Bill No: {props.billNo}</h2>
      <p className="text-lg"><strong>Customer Name:</strong> {props.customerName}</p>
      <p className="text-lg"><strong>Mobile:</strong> {props.mobile}</p>
      
      <p className="text-lg font-bold mt-4">Total: ₹{props.total}</p>
    </div>
  );
};

export default Bill;
