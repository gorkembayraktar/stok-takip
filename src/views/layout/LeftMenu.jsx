import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { useTranslation } from "react-i18next";
import {  NavLink } from "react-router-dom";

import { useLocation } from 'react-router-dom';

const LeftMenu = (props) =>{

    const location = useLocation();

    const {t} = useTranslation();
    
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        props.setOpen(open)
    };

    const menuItems = [
        {
            to:'/populer',
            name:t('popular')
        }
    ]

    const linkStyle = {
        color:'inherit',
        textDecoration:'nonne'
    }

    const drawerController = (path) =>{
        if(location.pathname === path)
          return


        props.setOpen(false)
    }

    return <React.Fragment key="left">
    <Drawer
      anchor="left"
      open={props.open}
      onClose={toggleDrawer(false)}
    >
        <List>
        {menuItems.map((item, index) => (

      
          <ListItem
          component={NavLink}
         style={linkStyle}
         to={item.to}
          onClick={() => {
             drawerController(item.to)
          }}
          key={item.name} disablePadding>
            <ListItemButton selected={ item.to == location.pathname }>
              <ListItemIcon>
                 <MovieCreationRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
      
        ))}
      </List>
      <Divider />

      <List>
       
          <ListItem
           component={NavLink}
           style={linkStyle}
            to="/yer-imleri"
             onClick={() => {
             drawerController("/yer-imleri")
          }}
          key="bookmark" disablePadding>
            <ListItemButton selected={ "/yer-imleri" == location.pathname }>
              <ListItemIcon>
                 <BookmarkBorderRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={t('menu_bookmark')} />
            </ListItemButton>
          </ListItem>
      </List>
    </Drawer>
  </React.Fragment>
}


export default LeftMenu;