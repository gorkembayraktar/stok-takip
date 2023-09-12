import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useSelector } from 'react-redux';
import {
  deleteDialogProps
} from '../../features/global/GlobalSlice'
import {
  setDeleteDialog,
  deleteDialogHandle,
  deleteVariantHandle
} from '../../utils'


export default function DeleteDialog(){
    const {show:open, message, title, selected, method} = useSelector(deleteDialogProps)


    const handleClose = () => {
      setDeleteDialog({show: false});
    };


    return (
      <div>
        <Dialog
          open={open && selected != null}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            { title }
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              { message }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Vazgeç</Button>

            { method == 'product' && 
            <Button onClick={() => deleteDialogHandle( selected.id ) } autoFocus>
              Sil
            </Button>
            }
            { method == 'variant' && 
            <Button onClick={() => deleteVariantHandle( {product_id: selected.product_id, id: selected.id }) } autoFocus>
              Sil
            </Button>
            }
          </DialogActions>
        </Dialog>
      </div>
    );
}