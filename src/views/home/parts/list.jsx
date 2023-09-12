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
import { Alert, AlertTitle, Box, Divider, Grid } from '@mui/material';

import { useSelector } from 'react-redux';

import {
    setCreatelistModal,
    setDeleteDialog,
    setEditListModal
} from '../../../utils'

import {
    getList,
  } from '../../../features/global/GlobalSlice'

import Paper from '@mui/material/Paper';


    
const ITEM_HEIGHT = 48;

function ListViewContainer(){
    const list = useSelector(getList)

    const openCreateListModal = () => {
        setCreatelistModal({show: true});
    }
    const deleteGroup = (id) => {
        setDeleteDialog({
            title: 'Silmek istediğinize emin misiniz?',
            message: 'Silme işlemini onaylayınız.',
            selected: {
                id: id
            },
            method: 'list'
        });
    }
    const editGroup = (data) => {
        console.log({
            show: true,
            selected: Object.assign({}, data)
        });
 
        setEditListModal({
            show: true,
            selected: Object.assign({}, data)
        })
    }
    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold'}}>
                   Listeler
                   <IconButton edge="end" aria-label="new product" sx={{ float: 'right'}} onClick={openCreateListModal}>
                        <AddIcon />
                    </IconButton>
                </ListSubheader>
            }
            >
            <Grid container spacing={1} sx={{p:2}}>
                {
                    list.map((item, i) => (
                        <Grid key={i} item md={4} sm={6} xs={12} >
                            <Paper sx={{p:2}}>
                            <ListItem dense
                                    disableGutters
                                    secondaryAction={
                                        <>
                                            <IconButton aria-label="edit" size="small" onClick={() => editGroup(item)}>
                                                    <EditIcon size="small" />
                                            </IconButton>
                                            <IconButton aria-label="delete"  size="small" onClick={() => deleteGroup(item.id) }>
                                                <DeleteIcon size="small"/>
                                            </IconButton>
                                        </>
                                    }
                                    >
                                <ListItemText 
                                noWrap 
                                primaryTypographyProps={{ 
                                    variant: 'subtitle2', 
                                    style: {
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }
                                }}
                                sx={{mr:2}}
                                primary={`(${item.items.length}) ${item.title}`} 
                                />
                            </ListItem>
                            <Divider />
                            
                            {
                                item.items.map((i, key) => <>
                                    <ListItemText primary={i.product.title} sx={{ textAlign: 'left'}} />

                                    <Box sx={{ my: 1}} spacing={1} grid>
                                        {
                                            i.variants.map(variant => <Chip label={`(${variant.total}) ${variant.title}`} sx={{mb:1}} size="small"  variant="outlined"/>)
                                        }
                                        
                                    </Box>
                                </>)
                            }
                            
                            <Alert severity="info">
                                Toplam variant : { item.items.reduce((acc, i) => acc + i.variants.reduce((acc2, k) => acc2 + k.total,0)  , 0) }
                            </Alert>

                            </Paper>
                        </Grid>
                    ))
                }
              
            </Grid>
        </List>

       
    );
}




export default ListViewContainer;