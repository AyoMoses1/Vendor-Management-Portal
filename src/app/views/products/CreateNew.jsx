import React from "react";
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
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}));

function CreateNew({ name, isOpen, handleClose,fields, onSubmit, states, id }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [state, setState] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(state);
    setState({ ...state, [name]: value });
  };

  const submit = () => {
    onSubmit(state).then((res)=>{
      if(res.data.status){
        handleClose()
      }
      else{
        return
      }
    });
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id="simple-modal-title">{name}</h4>
      <form>
        <div>
          {fields.map((field, index) => {
           return <TextField
              className="capitalize"
              onChange={handleChange}
              margin="dense"
              id={field}
              name={field}
              label={field}
              type="text"
              fullWidth
            />
})}
          <Button onClick={submit} variant="contained" color="primary">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}

export default CreateNew;
