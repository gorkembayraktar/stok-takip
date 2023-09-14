import Home from '../views/home'
import Login from '../views/login'

import {
    Navigate 
  } from "react-router-dom";

export const routes = [
    {
        path:'/',
        element:<Home/>,
        exact:true,
        auth:true
    },
    {
        path:'/login',
        element:<Login />,
        exact:true,
        auth:false,
        withoutSection:true
    },
    {
        //404 page navigate to main page
        path: '*',
        element: <Navigate  to="/" />
    }
];