import React from 'react'
import { Modal, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './modal.css'


function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(5, 4, 3),
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    outline: 'none',
    borderRadius: '20px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px !important',
  },

  button: {

    border: '0.5px solid #0F4E08',
    borderRadius: '8px',
    color: '#ffffff',
  }
}))


const Alert = ({ isOpen, handleModal, alertData, handleOK }) => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [alert, setAlert] = React.useState('')
  const [buttonState, setButtonState] = React.useState('Ok');

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img src={alertData.success ? "/assets/images/success-check.svg" : "/assets/images/fail-check.svg"} alt="check" />
      <Typography variant='h5' className='modal--header'>
        {alertData.title}
      </Typography>
      <Typography className='modal-content text-center'>
        {alertData.text}
      </Typography>
      {
        alertData.success ?
          <Button 
            variant='contained' 
            style={{ background: '#0F4E08' }} 
            className={classes.button} 
            onClick={handleOK}
          >
            OK
          </Button>
          :
          <Button 
            variant='contained' 
            style={{ background: '#454545' }} 
            className={classes.button} 
            onClick={handleModal}
          >
            Back
          </Button>
      }
    </div>
  )


  return (
    <div>
      <Modal open={isOpen} onClose={handleModal}>
        {body}
      </Modal>
    </div>
  )
}

export default Alert