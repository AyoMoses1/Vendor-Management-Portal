import React from 'react'
import { Modal, Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './modal.css'

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
    height: 200,
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
    display: 'inline',
  },

}))


const AuthAlert = ({ isOpen, onClick, remaining, logout }) => {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant='h5' className='modal--header'>
        Logging you out in {remaining} seconds
      </Typography>
      <div className='auth__alert__buttons'>
        <Button variant='contained' color='primary' className={classes.button} onClick={() => logout()}>Log Out</Button>
        <Button variant='contained' style={{ background: '#0F4E08' }} className={classes.button} onClick={() => onClick()}>I'm still here</Button>
      </div>
       
    </div>
  )


  return (
    <div>
      <Modal open={isOpen}>
        {body}
      </Modal>
    </div>
  )
}

export default AuthAlert