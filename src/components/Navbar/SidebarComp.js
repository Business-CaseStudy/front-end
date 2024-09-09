import React from 'react';
import { FaBeer, FaFileInvoiceDollar, FaRegUserCircle, FaUserPlus } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function SidebarComp() {
  return (
    <Sidebar
    style={{
      backgroundColor: '#3d0568',
      height: '100vh',    
      width: '250px',    
      position: 'sticky', 
      top: '0',           
    }}
  >
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#3d0568',
              color: '#3d0578',
            },
          },
        }}
      >
        <img src="/ARCHIMED_LOGO_BLACK_RGB-removebg-preview.png" alt="Sidebar Image" style={{ width: '100%', height: 'auto', marginTop:"20px" }} />
        <MenuItem>
        <FaBeer /> Dashboard </MenuItem>
        <SubMenu label="Inverstor">
          <MenuItem component={<Link to="/investor" />}> <FaRegUserCircle /> All Inverstors </MenuItem>
          <MenuItem component={<Link to="/newinvestor" />}> <FaUserPlus /> New Inverstor </MenuItem>
          </SubMenu>

        <SubMenu label="Bill">
        <MenuItem component={<Link to="/bill" />}> <FaFileInvoiceDollar /> Bills  </MenuItem>

        
        </SubMenu>
        
        {/* <SubMenu label="Capital Call">     
        <MenuItem component={<Link to="/bill" />}> <RiBillLine /> Capital Call  </MenuItem>

        
        </SubMenu> */}
      
      </Menu>
    </Sidebar>
  );
}
