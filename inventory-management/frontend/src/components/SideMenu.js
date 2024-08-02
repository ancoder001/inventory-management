import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
 // Import the CSS
import { Home as HomeIcon, Inventory as InventoryIcon, Receipt as ReceiptIcon, ListAlt as ListAltIcon } from '@mui/icons-material';

const SideMenu = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar collapsed={collapsed}>
    <div className='w-full text-center text-2xl bg-gray-600 py-2 text-white'>AN Solutions</div>
      <Menu iconShape="circle">
      <Link to="/dashboard">
        <MenuItem icon={<HomeIcon />}>
          Dashboard
        </MenuItem>
        </Link>
        <Link to="/inventory">
        <MenuItem icon={<InventoryIcon />}>
          Inventory
        </MenuItem>
        </Link>
        <SubMenu label="Billing" icon={<ReceiptIcon />}>
        <Link to="/bill">
        <MenuItem icon={<ListAltIcon />}>
            New Bill
          </MenuItem>
          </Link>
          <Link to="/bills">
          <MenuItem icon={<ListAltIcon />}>
            View Bills
          </MenuItem>
          </Link>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SideMenu;
