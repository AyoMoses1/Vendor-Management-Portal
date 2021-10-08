import React from "react";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification = ({ alert, severity }) => {
  const classes = useStyles();
  return (
    alert !== null && (
      <div classesName={classes.root}>
        <Alert variant="outlined" severity={severity}>
            {alert}
      </Alert>
      </div>
    )
  );
};

export default Notification;
