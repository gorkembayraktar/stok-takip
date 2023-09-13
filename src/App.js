import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';

import Header from './views/layout/Header'
import Footer from './views/layout/Footer'
import { routes } from './routes'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';

import {
  selectTheme
} from './features/theme/ThemeSlice'

function App() {

   //const mode = useSelector(selectTheme);

   const mode = 'dark';
   
   const theme = React.useMemo(
     () =>
       createTheme({
         palette: {
           mode,
         },
         components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: "#6b6b6b #2b2b2b",
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: "#2b2b2b",
                  width: '0.8em'
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  borderRadius: 8,
                  backgroundColor: "#6b6b6b",
                  minHeight: 24,
                  border: "3px solid #2b2b2b",
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                  backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                  backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                  backgroundColor: "#2b2b2b",
                },
              },
            },
          },
        },
       }),
     [mode],
   );

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Box>
     
  
        <Header />
        <Routes>
          {
            routes.map(route =>(
              <Route key={route.path} path={route.path} element={route.element}  exact={route.exact}/>
            ))
          }
        </Routes>
        <Footer />
        </Box>
        
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
