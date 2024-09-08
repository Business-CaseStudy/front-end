import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaBeer, FaFileInvoiceDollar, FaRegUserCircle, FaUserPlus } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function SidebarComp() {
  return (
    <Sidebar
    style={{
      backgroundColor: '#3d0568',
      height: '100vh',    // Prend toute la hauteur de la page
      width: '250px',     // Définir la largeur du sidebar
      position: 'sticky', // Rendre le sidebar sticky
      top: '0',           // Sticky à partir du haut de la page
    }}
  >
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#3d0568',
              color: '#3d0568',
            },
          },
        }}
      >
        <img src="ARCHIMED_LOGO_BLACK_RGB-removebg-preview.png" alt="Sidebar Image" style={{ width: '100%', height: 'auto', marginTop:"20px" }} />
        <MenuItem component={<Link to="/" />}>
        <FaBeer /> Dashboard </MenuItem>
        <SubMenu label="Inverstor">
          <MenuItem component={<Link to="/investor" />}> <FaRegUserCircle /> All Inverstors </MenuItem>
          <MenuItem component={<Link to="/newinvestor" />}> <FaUserPlus /> New Inverstor </MenuItem>
          </SubMenu>

        <SubMenu label="Bill">
        <MenuItem component={<Link to="/bill" />}> <FaFileInvoiceDollar /> Bills  </MenuItem>

        
        </SubMenu>
   
        <MenuItem> Capital Call </MenuItem>
      </Menu>
    </Sidebar>
  );
}
