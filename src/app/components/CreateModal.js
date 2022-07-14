import React from 'react'
import { Modal, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import PriorityHighSharpIcon from '@mui/icons-material/PriorityHighSharp';
import './modal.css'
import errorImage from "../../../src/images/error.png"
import successImage from "../../../src/images/success.png"
import { FiColumns } from 'react-icons/fi';
// import Notification from '../../../components/Notification';

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
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: theme.spacing(5, 4, 3),
    height: 400,
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

// const history = useHistory()

const CreateModal = ({isOpen, handleModal, created, title, successLink}) => {
  console.log(created)
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [alert, setAlert] = React.useState('')
  const [buttonState, setButtonState] = React.useState('Ok');

  const history = useHistory()

  const handleSuccessRedirect = () => {
      history.push('afrimash\n'+""+successLink)
  }

  const body = <div style={modalStyle} className={classes.paper}>
                  
                  {created.header ? 
                  
                    <div className='check--icon'><img src = {successImage}/></div>
                      : 
                    <div className='failed--icon'><img src = {errorImage}/></div>
                    
                  }

                  <Typography variant='h5' className='modal--header'>{created.header ? `${title} Created` : `Problem creating ${title}`}</Typography>
                  <Typography className='modal-content'>{created.text}</Typography>
                  {created.header ? <Button variant='contained' onClick={handleSuccessRedirect} style={{background:'#0F4E08'}} className={classes.button}>OK</Button>: <Button variant='contained' style={{background:'#454545'}} className={classes.button} onClick={handleModal}>Back</Button>}
              </div>


  return (
    <div>
      <Modal open={isOpen} onClose={handleModal}>
        {body}
      </Modal>
    </div>
  )
}

export default CreateModal