import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Bill = () => {
  const [customer, setCustomer] = useState({ name: '', mobile: '' });
  const [billItems, setBillItems] = useState([]);
  const [billNo] = useState(Math.floor(Math.random() * 100000));
  const [currentTime, setCurrentTime] = useState(new Date());

  const billRef = useRef(null); // Reference to the bill section for PDF generation

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  const addBillItem = () => {
    setBillItems([...billItems, { productName: 'Sample Product', quantity: 1, price: 50 }]);
  };

  const totalAmount = billItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const printBill = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Bill</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f4f4f4; } .footer { text-align: right; margin-top: 20px; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>Billing</h2>');
    printWindow.document.write('<div><strong>Customer Name:</strong> ' + customer.name + '</div>');
    printWindow.document.write('<div><strong>Mobile Number:</strong> ' + customer.mobile + '</div>');
    printWindow.document.write('<div><strong>Bill No:</strong> ' + billNo + '</div>');
    printWindow.document.write('<div><strong>Date & Time:</strong> ' + `${currentTime.toLocaleDateString()} ${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}` + '</div>');
    printWindow.document.write('<table><thead><tr><th>Serial No</th><th>Product Name</th><th>Quantity</th><th>Price per Item</th><th>Total Price</th></tr></thead><tbody>');
    billItems.forEach((item, index) => {
      printWindow.document.write(`<tr>
        <td>${index + 1}</td>
        <td>${item.productName}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.price * item.quantity}</td>
      </tr>`);
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('<div class="footer"><strong>Total Amount:</strong> $' + totalAmount + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const downloadPDF = () => {
    if (billRef.current) {
      html2canvas(billRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 size width in mm
        const pageHeight = 295; // A4 size height in mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        while (heightLeft >= 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        
        pdf.save('bill.pdf');
      });
    }
  };

  return (
    <div className="p-6">
      <Header title="Billing" />
      <div id="bill-content" className="bg-white shadow-md rounded-lg p-4 mb-6" ref={billRef}>
        <h2 className="text-xl font-bold mb-4">Billing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Customer Name</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className="border p-2 w-full"
              placeholder="Customer Name"
            />
          </div>
          <div>
            <label className="block mb-2">Mobile Number</label>
            <input
              type="text"
              value={customer.mobile}
              onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
              className="border p-2 w-full"
              placeholder="Mobile Number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block mb-2">Bill No</label>
            <input
              type="text"
              value={billNo}
              readOnly
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Date & Time</label>
            <input
              type="text"
              value={`${currentTime.toLocaleDateString()} ${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`}
              readOnly
              className="border p-2 w-full"
            />
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Billing Items</h2>
        <button onClick={addBillItem} className="bg-blue-500 text-white p-2 rounded mb-4">
          Add Item
        </button>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2">Serial No</th>
              <th className="py-2">Product Name</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price per Item</th>
              <th className="py-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item, index) => (
              <tr key={index}>
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.productName}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2">${item.price}</td>
                <td className="py-2">${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right">
          <strong>Total Amount: ${totalAmount}</strong>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={printBill} className="bg-green-500 text-white p-2 rounded mr-4">
            Print Bill
          </button>
          <button onClick={downloadPDF} className="bg-blue-500 text-white p-2 rounded">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
