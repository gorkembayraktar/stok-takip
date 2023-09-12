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

import Typography from '@mui/material/Typography';

import EditIcon from '@mui/icons-material/Edit';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Divider } from '@mui/material';

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

function ListViewContainer(){
    const products = useSelector(getProducts)

    const openCreateProductModal = () => {
        setCreateProductModal(true)
    }

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold'}}>
                   Listeler
                   <IconButton edge="end" aria-label="new product" sx={{ float: 'right'}} onClick={openCreateProductModal}>
                        <AddIcon />
                    </IconButton>
                </ListSubheader>
            }
            >
        
        </List>

       
    );
}




export default ListViewContainer;