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
