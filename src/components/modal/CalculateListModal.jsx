import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box, Collapse, Grid, List, ListItem, ListItemButton, ListSubheader, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useSelector } from 'react-redux';
import {
  getProducts,
  showCalculateListModal
} from '../../features/global/GlobalSlice'

import {
  setCalculateListModal
} from '../../utils'

import '../../utils/array'


import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ITEM_HEIGHT = 48;

export default function CalculateListModal() {
  
  const {show: open, selected} = useSelector(showCalculateListModal);

 
  const products = useSelector(getProducts)

  const [tempList, setTempList] = React.useState([]);
 
  
  const [calculatedData, setCaculatedData] = React.useState([]);
  
  const handleClose = () => {
    setCalculateListModal({show: false});
  }; 
 
  const setTempListTotal = (id, value) => {
    value = parseInt(value);
    const newData = tempList.map( k => (
        {
            ...k,
            total: k.id == id ? Math.max(value, 0) : k.total
        }
    ));
    setTempList(
       newData 
    )
  }

  React.useEffect(()=>{
    if(selected && selected.length ){
        setTempList(
            selected.map(s =>({
                id: s.id,
                title: s.title,
                total: 0
            }))
        )
      
        
    }
  }, [selected])

 
  React.useEffect(() => {
    // hesaplama işlemleri

    if(tempList && selected){
     
        const data = {};
        selected.forEach(i =>{
            i.items.forEach(item =>{
                let multiplicationVariant = [...item.variants].map((v) =>{
                    let f;
                    if(f = tempList.find(t => t.id == i.id)){
                        return {
                            ...v,
                            total : v.total * f.total
                        }
                    }
                    return v;
                })
                if(data[item.product.id]){      
                    data[item.product.id].variants.push(...multiplicationVariant)
                }else{
                    data[item.product.id] = {
                        list_id: i.id,
                        product: item.product,
                        variants: [...multiplicationVariant]
                    }
                }
            })
           
        });
        Object.keys(data).forEach(key => {
            data[key].variants = data[key].variants.getSumDuplicateData('id', 'total').map((withStock)=>{
                withStock.stock = products.find(k => k.id == data[key].product.id)?.variants.find(v => v.id == withStock.id)?.stock;
                return withStock;
            })
        }); 
        setCaculatedData(Object.values(data))

    }
   
  }, [tempList])


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
              Hesaplamalar
            </Typography>
            <Button autoFocus color="success" variant="contained">
              DİSABLE
            </Button>
          </Toolbar>
        </AppBar>
        {
        <Grid container spacing={5} sx={{mt:0, justifyContent:'center',px:4}}>
            <Grid item md={4} xs={12}>
                {
                    selected &&
                    selected.map((s,i) =>(
                        <CustomizeList key={i} data={s} />
                    ))
                }
            </Grid>
            <Grid item md={4} xs={12}>
                <CustomizeListInput tempList={tempList} setTempListTotal={setTempListTotal} />
            </Grid>
            <Grid item md={4} xs={12}>
                <CustomizeListCalculate calculatedData={calculatedData} />
            </Grid>
          </Grid>
         }
      </Dialog>
    </div>
  );
}

function CustomizeList({data}){
    

    return <>
        <Item sx={{mb:2}}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold', textAlign:'left'}}>
                        { data.title }
                    </ListSubheader>
                }
                >
                {
                    data.items &&
                    data.items.map((item, k) => (
                        <CustomizeListItem key={k} item={item} />
                    ))
                }
            </List>
        </Item>
    </>
}


const CustomizeListItem = ({item}) => {

    const [open, setOpen] = React.useState(false);
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


    return <>
      <ListItem dense >
               
                <ListItemText 
                    primary={item.product.title}
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
                />
               
                { (open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />)}

            </ListItem>
            {
                
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding dense 
            style={{maxHeight: 200, overflow: 'auto'}}>
                        {
                          
                         item.variants &&
                         item.variants.map((variant,i) =>(
                            <ListItemButton key={i} sx={{ pl: 4 }}>
                                <ListItemText primary={ variant.title } />
                                <Chip label={ variant.total } />
                            </ListItemButton>
                         ))
                        
                        }
                    </List>
                </Collapse>
            }
    </>
}

function CustomizeListInput({tempList, setTempListTotal}){
    return <>
        <Item sx={{mb:2}}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold', textAlign:'left'}}>
                        Liste Adet Sayısı
                    </ListSubheader>
                }
                >
                {
                    tempList.map( (item, i) => (
                        <CustomizeListInputItem key={i} item={item} setTempListTotal={setTempListTotal} />
                    ))
                }
            </List>
        </Item>
    </>
}
function CustomizeListInputItem({item, setTempListTotal}){
    return <>
     <List component="div" disablePadding   style={{maxHeight: 200, overflow: 'auto'}}>
      {
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton variant="outlined" size="small" onClick={() => setTempListTotal(item.id, item.total - 1)}>
                        <RemoveCircleOutlineIcon size="small" />
                    </IconButton>
                    <TextField
                        InputProps={{
                            inputProps: {
                                style: { textAlign: "center" },
                            }
                        }}
                        id={`input-total-${0}`}
                        label="Adet"
                        size="small"
                        value={item.total}
                        sx={{maxWidth:80}}
                        onChange={(e) => setTempListTotal(item.id, e.target.value)}
                      />
                      <IconButton variant="outlined" size="small" onClick={() => setTempListTotal(item.id, item.total + 1)}>
                        <AddIcon size="small" />
                     </IconButton>
                    
                  </Box>
                }
                disablePadding
              >
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={ item.title }  />
            </ListItemButton>
          </ListItem> 
      }
    </List>
    </>
}

function CustomizeListCalculate({calculatedData}){
    return <>
        <Item sx={{mb:2}}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" sx={{ fontWeight: 'bold', textAlign:'left'}}>
                        İhtiyaç Listesi
                    </ListSubheader>
                }
                >
                {
                    calculatedData.map((c,i) =>(
                        <CustomizeListCalculateItem key={i} data={c} />
                    ))
                }
            </List>
        </Item>
    </>
}

function CustomizeListCalculateItem({data}){

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


    return <>
      <ListItem dense >
               
                <ListItemText 
                    primary={data.product.title}
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
                />
                <Chip label={`Toplam Alt Variant :` + data.variants.reduce((c, i) =>  c + i.total, 0)} />
                { (open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />)}

            </ListItem>
            {
                
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding dense 
            style={{maxHeight: 200, overflow: 'auto'}}>
                      {
                        data.variants.map((variant, i) => (
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    {
                                        variant.total > variant.stock ?
                                        <IconButton size="small" color="error" >
                                            <ErrorIcon />
                                        </IconButton>
                                        :
                                        <IconButton size="small" color="success" >
                                            <DoneIcon />
                                        </IconButton>
                                    }
                                   
                                 
                                </ListItemIcon>
                                <ListItemText primary={ `(Stok: ${variant.stock}) ${variant.title}` } />
                                {
                                    variant.total > variant.stock ? 
                                    <Chip label={`${variant.total - variant.stock} adet ihtiyaç var`} />:
                                    <Chip label={`Harcanacak: ${variant.total}`} />
                                }
                             
                            </ListItemButton>
                                ))
                        }
                    </List>
                </Collapse>
            }
    </>
}
