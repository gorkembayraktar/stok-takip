import Home from '../views/home'

import {
    Navigate 
  } from "react-router-dom";

export const routes = [
    {
        path:'/',
        element:<Home/>,
        exact:true,
        auth:false
    },
    {
        //404 page navigate to main page
        path: '*',
        element: <Navigate  to="/" />
    }
];