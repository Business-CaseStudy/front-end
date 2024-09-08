import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function SidebarComp() {
  return (
    <Sidebar
    style={{
      backgroundColor: '#13395e',
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
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem component={<Link to="/" />}> Dashboard </MenuItem>
        <SubMenu label="Inverstor">
          <MenuItem component={<Link to="/investor" />}> All Inverstors </MenuItem>
          <MenuItem component={<Link to="/newinvestor" />}> New Inverstor </MenuItem>
          {/* newinvestor */}
        </SubMenu>

        <SubMenu label="Bill">
        <MenuItem component={<Link to="/bill" />}> Bills  </MenuItem>
    
          {/* newinvestor */}
        </SubMenu>
        <MenuItem> Capital Call </MenuItem>
      </Menu>
    </Sidebar>
  );
}
