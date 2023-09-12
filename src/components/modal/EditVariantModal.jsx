import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import Divider from '@mui/material/Divider';
import { ButtonGroup, Paper } from '@mui/material';


import { useSelector } from 'react-redux';
import {
    showEditVariantModal
} from '../../features/global/GlobalSlice'
import {
    setEditVariantModal,
    editVariantItem
} from '../../utils'


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

export default function CreateProductModal() {
    const [stock, setStock] = React.useState(0);
    const [value, setValue] = React.useState("");
    const { show:open, selected } = useSelector(showEditVariantModal);

    const handleClose = () => setEditVariantModal({show: false});

    const update = () => {
        editVariantItem({
            title: value,
            stock: parseInt(stock),
            product_id: selected.product_id,
            id: selected.id
        });
        handleClose();
        setValue("");
        setStock(0);
    }

    React.useEffect(()=>{
        if(selected){
            setValue(selected.title);
            setStock(selected.stock);
        }
    }, [selected]);

    if(!selected) return;

    return (
    <div>
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Variant Düzenle
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Varyant Adı"
                    defaultValue=""
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    fullWidth
                    sx={{mb:2}}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Stock"
                    defaultValue=""
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    fullWidth
                />
            </Typography>
            <Divider  sx={{my:3}}/>
            <Typography id="modal-modal-footer" sx={{ mt: 2 }}>
                <ButtonGroup sx={{float:'right'}}>
                    <Button aria-label="delete" size="small" onClick={handleClose}>
                        Vazgeç
                    </Button >
                    <Button aria-label="delete" variant="outlined" size="small" color="success" onClick={update}>
                        Güncelle
                    </Button >
                </ButtonGroup>
            </Typography>
        </Box>
        </Modal>
    </div>
    );
}