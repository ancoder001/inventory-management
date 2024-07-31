import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => (
  <div className="fixed w-64 h-full bg-gray-800 text-white">
    <div className="p-4 font-bold text-2xl">AN Solutions</div>
    <nav className="mt-10">
      <Link to="/dashboard" className="block py-2.5 px-4 hover:bg-gray-700">Dashboard</Link>
      <Link to="/inventory" className="block py-2.5 px-4 hover:bg-gray-700">Inventory</Link>
      <Link to="/bill" className="block py-2.5 px-4 hover:bg-gray-700">Billing</Link>
    </nav>
  </div>
);

export default SideMenu;
