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
  deleteVariantHandle,
  deleteListItem
} from '../../utils'

import {
  productDelete,
  variantDelete,
  listDelete
} from '../../api'



export default function DeleteDialog(){
    const {show:open, message, title, selected, method} = useSelector(deleteDialogProps)


    const handleClose = () => {
      setDeleteDialog({show: false});
    };

    const deleteDialog = (id) => {
      productDelete(id).then(d => {
        if(d?.status){
          deleteDialogHandle(id)
        }
      }).catch(() =>{
        handleClose();
      })
    }

    const deleteVariant = ({product_id, id}) => {
      variantDelete(id).then(() =>{
        deleteVariantHandle({product_id, id })
      }).catch(() =>{

      })
    }

    const deleteList = (id) => {

      listDelete(id).then(() =>{
        deleteListItem({id})
      }).catch(() =>{

      })
    }

    

    const switchMethod = () => {
      switch( method ){
        case 'product':
          return (
            <Button onClick={() => deleteDialog( selected.id ) } autoFocus>
              Sil
            </Button>
          );
        break;

        case 'variant':
          return (
            <Button onClick={() => deleteVariant( {product_id: selected.product_id, id: selected.id }) } autoFocus>
              Sil
            </Button>
          );
        
        case 'list':
          return (
            <Button onClick={() => deleteList(selected.id) } autoFocus>
              Sil
            </Button>
          )
      }
    }

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

            { switchMethod() }
          </DialogActions>
        </Dialog>
      </div>
    );
}