import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import IconButton from '@mui/material/IconButton';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Alert, Divider, InputAdornment, TextField } from '@mui/material';

import { useSelector } from 'react-redux';

import {
    setDeleteDialog,
    setCreateProductModal,
    setEditProductModal,
    setCreateVariantModal,
    setEditVariantModal
} from '../../../utils'

import {
    getProducts
  } from '../../../features/global/GlobalSlice'

const ITEM_HEIGHT = 48;

function Products(){
    const products = useSelector(getProducts)

    const [search, setSearch] = React.useState('');
    const [filterProducsts, setFilterProducsts] = React.useState([]);

    React.useEffect(()=>{
        //filtrele
        if(search.length == 0){
            setFilterProducsts([...products])
            return;
        }
        setFilterProducsts(
            products.filter(p => 
                p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || 
                (p.variants && p.variants.some(v => v.title.toLocaleLowerCase().includes(search.toLowerCase())))  
            ).map(p =>({
                ...p,
                variants: p.variants.filter( v => v.title.toLocaleLowerCase().includes(search.toLowerCase()))
            }))
        )
        
    },[search, products]);

    const openCreateProductModal = () => {
        setCreateProductModal(true)
    }

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold', textAlign:'left'}}>
                    <IconButton edge="end" aria-label="new product" sx={{ float: 'left'}} onClick={openCreateProductModal}>
                        <AddIcon />
                    </IconButton>
                   <span style={{marginLeft: 10}}>
                        Ürünler
                    </span>
                    <TextField
                        required
                        variant="outlined"
                        id="outlined-required"
                        size='small'
                        InputProps={{ 
                            sx: { height: 30 } ,
                            endAdornment: (
                                <InputAdornment position="end">
                                  <SearchIcon />
                                </InputAdornment>
                            ),
                        
                        }}
                        style={{display: 'inline-block'}}
                        sx={{maxWidth:160, float:'right'}}
                        value= {search}
                        onChange={ (e) => setSearch(e.target.value) }
                        />
                </ListSubheader>
            }
       
            >
            { filterProducsts.length == 0 && <Alert severity="info">Ürün Bulunmuyor</Alert>}
            {
            filterProducsts.map( product =>  <ProductItem key={product.id} data={product} />)
          }
          
        </List>

       
    );
}

const ProductItem = ({ data }) => {

    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openSettings = Boolean(anchorEl);
    const handleClickDot = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClick = () => {
      setOpen(!open);
    };

    const deleteProductHandle = () => {
        setDeleteDialog({
            title: 'Silmek istediğinize emin misiniz?',
            message: 'Silme işlemini onaylayınız.',
            selected: data,
            method: 'product'
        });
        handleClose();
    }

    const createVariantHandle = () => {
        setCreateVariantModal({
            show: true,
            selected: data
        });
        handleClose();
    }
    const deleteVariantHandle = (product_id, data) => {
        setDeleteDialog({
            title: 'Silmek istediğinize emin misiniz?',
            message: 'Silme işlemini onaylayınız.',
            selected: {
                product_id,
                ...data
            },
            method: 'variant'
        });
        handleClose();
    }

    const editProductHandle = () => {
        setEditProductModal({
            show: true,
            selected: data
        });
        handleClose();
    }

    const editVariantModal = (select) => {
        setEditVariantModal({
            show: true,
            selected: {
                product_id: data.id,
                ...select
            }
        });
    }

    
    return <>
      <ListItem dense >
                <ListItemIcon sx={{ mr: 1}}>
                    <IconButton edge="end" aria-label="more actions" onClick={handleClickDot} >
                        <MoreVertIcon />
                    </IconButton>
                </ListItemIcon>
                <ListItemText 
                    primary={data.title + (data.variants && data.variants.length ? ` (${data.variants.length})` :'')} 
                    noWrap
                    primaryTypographyProps={{ 
                        variant: 'subtitle2', 
                        style: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }
                    }}
                    sx={{mr: 3, ml: 1}}
                    onClick={handleClick}
                />
                <Chip label={data.variants ? data.variants.reduce((acc,b) => acc + b.stock, 0) : 0} />
                

                {
                data.variants && data.variants.length >0 &&
                (open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />)}
                
                <Menu
                
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={openSettings}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        }
                    }}
                >
                 
                    <MenuItem disableRipple onClick={ editProductHandle  }>
                        <EditIcon />
                        Düzenle
                    </MenuItem>
                    <MenuItem disableRipple onClick={ createVariantHandle  }>
                        <AddIcon />
                        Yeni Varyant Ekle
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />

                    <MenuItem disableRipple onClick={() => deleteProductHandle()}>
                        <DeleteIcon />
                         Sil
                    </MenuItem>
                 
                </Menu>
            </ListItem>
            {
                data.variants && data.variants.length > 0 &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding dense 
            style={{maxHeight: 200, overflow: 'auto'}}>
                        {
                            data.variants.map(variant => ( 
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <IconButton size="small" onClick={ () => editVariantModal(variant)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={ () => deleteVariantHandle(data.id, variant)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText primary={ variant.title } />
                                    <Chip label={variant.stock} />
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Collapse>
            }
    </>
}


export default Products;