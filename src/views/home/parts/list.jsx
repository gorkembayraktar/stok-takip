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
import { Alert, AlertTitle, Box, Divider, Grid, Tooltip } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useSelector } from 'react-redux';

import {
    setCalculateListModal,
    setCreatelistModal,
    setDeleteDialog,
    setEditListModal
} from '../../../utils'

import {
    getList,
    showCalculateListModal
  } from '../../../features/global/GlobalSlice'

import Paper from '@mui/material/Paper';


    
const ITEM_HEIGHT = 48;

function ListViewContainer(){

    const {selected:calculateSelected} = useSelector(showCalculateListModal);

    const listStore = useSelector(getList)

    const [list, setList] = React.useState([]);

    React.useEffect(()=>{
        if(listStore){
            setList(
                listStore.map(k => ({
                    ...k,
                    selected: false
                }))
            )
        }
    },[listStore])

    React.useEffect(()=>{
        if(list && list.length > 0){
            setList(
                list.map(k =>({...k, selected: false}) )
            );
        }
    },[calculateSelected])

    

    const setSelected = (item) => {
        console.log()
        setList(
            list.map(k => ({
                ...k,
                selected: item.id == k.id ? !k.selected : k.selected 
            }))
        )
    }

    const openCreateListModal = () => {
        setCreatelistModal({show: true});
    }
    const openCalculateModal = () => {
        if(list.length == 0) return;
        if( !list.some(i => i.selected) ) return;

        setCalculateListModal({
            show:true,
            selected: list.filter(l => l.selected)
        })
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
                    <Tooltip id="button-report" title="En az 1 liste seçiniz">
                        <IconButton edge="start" aria-label="calculate" sx={{ float: 'left'}} 
                       
                        onClick={openCalculateModal}> 
                                <CalculateIcon />
                        </IconButton>
                    </Tooltip>
                   Listeler
                   <IconButton edge="end" aria-label="new product" sx={{ float: 'right'}} onClick={openCreateListModal}>
                        <AddIcon />
                    </IconButton>
                </ListSubheader>
            }
            >

            { list.length == 0 && <Alert severity="info">Liste Bulunmuyor</Alert>}
            <Grid container spacing={1} sx={{p:2}}>
                {
                    list.map((item, i) => (
                        <Grid key={i} item md={4} sm={6} xs={12} >
                            <Paper sx={{p:2}}  style={{background: item.selected ? '#4f794c' : '', cursor: 'pointer'}}
                            onClick={ () => setSelected(item) }
                            >
                            <ListItem dense
                                    disableGutters
                                    secondaryAction={
                                        <>
                                            <IconButton aria-label="edit" size="small" onClick={(e) => (e.stopPropagation(), editGroup(item))}>
                                                    <EditIcon size="small" />
                                            </IconButton>
                                            <IconButton aria-label="delete"  size="small" onClick={(e) => (e.stopPropagation(), deleteGroup(item.id)) }>
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