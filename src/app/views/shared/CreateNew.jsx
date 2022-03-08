import React from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Icon,
  TableRow,
  Card,
  TextField,
  Modal,
  Button
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}));


function CreateNew({name, handleClose, isOpen, fields}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
    const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id="simple-modal-title">{name}</h4>
      <form>
        <div>
         {fields.map((field, index)=>  (                  <TextField
            autoFocus
            margin="dense"
            id="name"
            label={field}
            type="text"
            fullWidth />
         ))}
         <Button  variant="contained" color="primary">Create</Button>
        </div>
      </form>
    </div>
  );
    return (
        <div>
            <Modal 
                open={isOpen}
                onClose={handleClose}
            >
               {body}
                
            </Modal>
        </div>
    )
}

export default CreateNew
