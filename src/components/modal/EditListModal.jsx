import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Grid, List, ListItem, ListItemButton, ListSubheader, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useSelector } from 'react-redux';
import {
  getProducts,
  getList,
  showEditlistModal
} from '../../features/global/GlobalSlice'

import {

  setEditListModal,
  editListItem
} from '../../utils'



import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

let once = false;

export default function CreateListModal() {
  const {show: open, selected} = useSelector(showEditlistModal);

  const [ listName, setListName ] = React.useState('')

  const productsStore = useSelector(getProducts)

  const list = useSelector(getList)

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    initData()
  }, [productsStore])

  React.useEffect(() => {
    initData(true)
  }, [open])

  React.useEffect(() => {
    if(selected){{
        setListName(selected.title)
    }}
  },[selected])
 

  const handleClose = () => {
    setEditListModal({show: false});
  };

  const handleEdit = () => {
    if(listName.length == 0) return;
    if(products.filter((p) => p.variants.some(k => k.checked)).length == 0) return;

    editListItem({
      id: selected.id,
      title: listName,
      items: products.filter((p) => p.variants.some(k => k.checked))
             .map(item =>(
              {
                product: {
                  id: item.id,
                  title: item.title
                },
                variants: item.variants.filter(v => v.checked).map(k => ({id: k.id, title: k.title, total: k.total}))
              }
        ))
    })
  }

  const handleDelete = (parent_id, id) => {
    checkboxToggle(parent_id, id)
  };

  const checkboxToggle = (parent_id, id) => {
    
    const p = products.find(i =>  i.id == parent_id);
    if(p){
      const v = p.variants.find(i => i.id == id );
      if(v){
        v.checked = !v.checked;
      }
    }
    setProducts([...products]);
  }

  const totalChange = (parent_id, id, total) => {
   
    //
    const p = products.find(i =>  i.id == parent_id);
    if(p){
      const v = p.variants.find(i => i.id == id );
      if(v){
        v.total = Math.max(total, 0);

        v.checked = v.total > 0;

      }
    }
    setProducts([...products]);
  }
  
 

  const initData = (refresh = false) => {
  
    if(productsStore && productsStore.length && selected != null && (!once || refresh) ){
      console.log('çalışı')
      setProducts(
         productsStore
         .map(product => ({
           ...product,
           variants: product.variants.map(variant => ({
            ...variant, 
            checked: !!selected.items.find(i => i.product.id == product.id && i.variants.some(v => v.id == variant.id)) ?? false, 
            total: selected.items.find(i => i.product.id == product.id)?.variants.find(v => v.id === variant.id)?.total ?? 0
          }))
         }))
       );
       once = true;
     }
    
  }
    


  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Liste Güncelle
            </Typography>
            <TextField
                  size="small"
                  maxWidth
                  label="Liste Adınız Giriniz"
                  onChange={(e) => setListName(e.target.value)}
                  value={listName}
                  sx={{mr:2}}
              />
            <Button 
            disabled={products.filter((p) => p.variants.some(k => k.checked)).length == 0 || listName.length == 0}
            autoFocus color="success" variant="contained" onClick={ handleEdit }>
              Güncelle
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container spacing={5} sx={{mt:0, justifyContent:'center'}}>
            <Grid item md={4} xs={12}>
              <Item>
                <ProductListCustomize products={products} setProducts={setProducts} checkboxToggle={checkboxToggle} totalChange={totalChange} />
              </Item>
            </Grid>
            <Grid item md={4} xs={12}>
              <Item>
                  <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold', textAlign:'left'}}>
                       Liste İçerisindekiler
                  </ListSubheader>
                  {
                    products.filter((p) => p.variants.some(k => k.checked))
                    .map(p => (
                      <>
                         <ListItemText id={0} primary={p.title} />
                          <Stack 
                          direction="row" 
                          spacing={1}
                          sx={{ display: 'flex',flexWrap: 'wrap', justifyContent:'center', gap: 1 }}
                          >
                            {
                              p.variants &&
                              p.variants.filter(v => v.checked).map(variant =>(
                                <Chip label={`${variant.title} (${variant.total})`} onDelete={() => handleDelete(p.id, variant.id)} />
                              ))
                            }
                          </Stack>
                      </>
                    ))

                  }
                 
              </Item>
            </Grid>
            
          </Grid>
         
      </Dialog>
    </div>
  );
}

function ProductListCustomize({products,  totalChange, checkboxToggle}){


 

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold', textAlign:'left'}}>
            Ürünler
          </ListSubheader>
      }
      dense
      >   
      {
        products &&
        products
        .map( (product, i) =>  <ProductListItem key={i} data={product} toggle={checkboxToggle} totalChange={totalChange}/>)
      }

      </List>
  );
}

function ProductListItem({data, toggle, totalChange}){

  return (
    <>
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={data.id} dense>
        <ListItemIcon>
        
        </ListItemIcon>
        <ListItemText id={data.id} primary={data.title} />
      </ListItemButton>
      
    
    </ListItem>
    <List component="div" disablePadding dense  style={{maxHeight: 200, overflow: 'auto'}}>
      {
        data.variants && 
        data.variants.map(variant => (
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton variant="outlined" size="small" onClick={() => totalChange(data.id, variant.id, variant.total - 1)}>
                        <RemoveCircleOutlineIcon size="small" />
                    </IconButton>
                    <TextField
                        InputProps={{
                            inputProps: {
                                style: { textAlign: "center" },
                            }
                        }}
                        id={`input-total-${variant.id}`}
                        defaultValue="Small"
                        label="Adet"
                        size="small"
                        type='number'
                        value={ variant.total }
                        onChange={(e) => totalChange(data.id, variant.id, e.target.value)}
                        sx={{maxWidth:80}}
                      />
                      <IconButton variant="outlined" size="small" onClick={() => totalChange(data.id, variant.id, variant.total + 1)}>
                        <AddIcon size="small" />
                    </IconButton>
                    
                  </Box>
                }
                disablePadding
              >
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={variant.checked}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => toggle(data.id, variant.id) }
                      inputProps={{ 'aria-labelledby': 0 }}
                    />
                </ListItemIcon>
                <ListItemText primary={`${variant.title} (${variant.stock})`} id={variant.id} />
              
            </ListItemButton>
          </ListItem> 
        ))
      }
       
          
    </List>
    </>
  );
}
