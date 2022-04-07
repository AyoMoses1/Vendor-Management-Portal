
import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const CustomSnackBar = (props) => {


    return (
        <Snackbar open={props.open} autoHideDuration={6000}>
        <Alert /* onClose={handleClose} */ severity="success" sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    )
}

export const FailedSnackBar = (props) => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

   props.onClose()
  };

  return (
      <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose}  severity="error" sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackBar;