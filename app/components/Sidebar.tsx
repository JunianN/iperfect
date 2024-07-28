import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, ListItemButton } from '@mui/material';
import styles from './Sidebar.module.css'

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname()
  const menuItems = [
    { text: 'Date Config', path: '/date-config' },
    { text: 'Cleansing', path: '/cleansing' },
    { text: 'Tie In', path: '/tie-in' },
    { text: 'Rawmat', path: '/rawmat' },
    { text: 'Report', path: '/report' },
  ];

  // return (
  //   <List component="nav" sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}>
  //     {menuItems.map((item) => (
  //       <Link href={item.path} key={item.text} passHref>
  //         <ListItem button component="a" selected={router.pathname === item.path} sx={router.pathname === item.path ? activeStyle : null}>
  //           <ListItemText primary={item.text} />
  //         </ListItem>
  //       </Link>
  //     ))}
  //   </List>
  // );
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <Link style={{ textDecoration: "none"}} href={item.path} key={item.text} passHref>
              <ListItem disablePadding sx={{  }}>
                <ListItemButton selected={ pathname === item.path} sx={pathname === item.path ? {color:'gold'} : {color: 'white'}}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;