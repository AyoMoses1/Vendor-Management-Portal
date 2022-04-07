import  React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Modal =  ({okText,open,title,loading,  onClose,  cancelText, onOk, onCancel, showCancel, ...props}) => {
    return (
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {showCancel && <Button onClick={onCancel}>{cancelText}</Button>}
          <Button disabled={loading} onClick={onOk} autoFocus>
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default Modal;