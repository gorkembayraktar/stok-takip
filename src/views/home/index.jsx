import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import ProductsView from './parts/products'
import ListView from './parts/list'


import DeleteDialog from '../../components/modal/DeleteDialog';

import CreateProductModal from '../../components/modal/CreateProductModal';
import EditProductModal from '../../components/modal/EditProductModal';
import CreateVariantModal from '../../components/modal/CreateVariantModal'
import EditVariantModal from '../../components/modal/EditVariantModal'
import CreateListModal from '../../components/modal/CreateListModal'
import EditListModal from '../../components/modal/EditListModal'

import CalculateListModal from '../../components/modal/CalculateListModal'

import {
  setProductsInit,
  setListInit
} from '../../utils'
import React from 'react';

import {getProducts, getList} from '../../api'



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));





function Home() {
  React.useEffect(() => {

      getProducts().then(data => {
        if(data){
          setProductsInit(data.data)
        }
      });

      getList().then(data => {
        if(data){
          setListInit(data.data);
        }
      });
  },[]);

  return (
    <Container sx={{ pt:3 }}  style={{minHeight:"80vh"}} dark>
       
       <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid item md={4} xs={12}>
              <Item>
                <ProductsView />
              </Item>
            </Grid>
            <Grid item md={8} xs={12}>
              <Item>
                <ListView />
              </Item>
            </Grid>
          </Grid>
        </Box>

        <DeleteDialog />
        <EditProductModal />
        <CreateProductModal />
        <CreateVariantModal /> 
        <EditVariantModal />
        <CreateListModal /> 
        <EditListModal />

        <CalculateListModal />
    </Container>
  );
}

export default Home;
