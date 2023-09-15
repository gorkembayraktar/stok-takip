import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import Divider from '@mui/material/Divider';
import { ButtonGroup } from '@mui/material';


import { useSelector } from 'react-redux';
import {
    showEditProductModal
} from '../../features/global/GlobalSlice'
import {
    setEditProductModal,
    editProductItem
} from '../../utils'
import {
    productUpdate
} from '../../api'


const style = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -10%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditProductModal() {

    const { show:open, selected } = useSelector(showEditProductModal);

    const [value, setValue] = React.useState();

    React.useEffect(()=>{
        setValue(selected ? selected.title : '');
    },[selected]);

    const handleClose = () => setEditProductModal({show: false});

    const update = () => {

        productUpdate(selected.id, value)
        .then(data => {
            if(data?.status){
                editProductItem({
                    id: selected.id,
                    title: value
                });
            }
        }).catch(() => {
            
        }).finally(() => {
            handleClose();
        })
      
        
    }

    if(!selected) return;

    return (
    <div>
        <Modal
        open={open && selected != null}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Ürün Bilgileri Güncelle
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
                required
                id="outlined-required"
                label="Ürün Adı"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                fullWidth
                />
            </Typography>
            <Divider  sx={{my:3}}/>
            <Typography id="modal-modal-footer" sx={{ mt: 2 }}>
                <ButtonGroup sx={{float:'right'}}>
                    <Button aria-label="delete" size="small" onClick={handleClose}>
                        Vazgeç
                    </Button >
                    <Button 
                    disabled={ value.length == 0 }
                    aria-label="delete" variant="outlined" size="small" color="success" onClick={update}>
                        Güncelle
                    </Button >
                </ButtonGroup>
            </Typography>
        </Box>
        </Modal>
    </div>
    );
}