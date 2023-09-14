import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import { useState}  from 'react';

import { NavLink, useNavigate, useNavigation } from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';
import {
    switchTheme,
    selectTheme
  } from '../../features/theme/ThemeSlice'

import styled from '@emotion/styled';

import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';


import { logout } from '../../utils'



const Header = () =>{

  const navigate = useNavigate();

  const logoutHandle = () => {
    logout();
    navigate('/login');
  }

  const mode = 'dark';

  return (
      <>
          <AppBar position="static" style={{ background: mode === 'dark' ? 'rgb(38 38 39)' : '#2E3B55' }}>
              <Container >
                  <Toolbar disableGutters sx={{ justifyContent:'space-between'  }}>   
                  <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                      mr: 2,
                      ml:1,
                      display: {  md: 'flex',},
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      color: 'inherit',
                      textDecoration: 'none',
                      }}
                  >
                      Stok Takip
                  </Typography>

               
                   
                    <Button variant="outlined" color="error" onClick={logoutHandle}>Çıkış yap</Button>
                  </Toolbar>
              </Container>
          </AppBar>
          {/**
           * 
           <LeftMenu open={leftMenu} setOpen={leftMenuHandle}/>     
           */}
      </>
  );
}


export default Header;