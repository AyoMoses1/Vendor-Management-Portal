import React from 'react'
import { Breadcrumb, SimpleCard } from 'matx'
import { makeStyles } from '@material-ui/core/styles'
import ProductForm from './ProductForm'
import { TextField, Modal, Button, Grid, MenuItem } from '@material-ui/core'

function NewProduct({ location, isOpen, handleClose }) {

const useStyles = makeStyles((theme) => ({
  paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[2],
      // padding: theme.spacing(5, 4, 3),
  },
}))

const classes = useStyles()

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {

  const top = 60 + rand()
  const left = 50 + rand()

  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflowY: "scroll", 
      maxHeight: "90%"
  }
}

const [modalStyle] = React.useState(getModalStyle)
  return (
    <Modal open={isOpen} onClose={handleClose} >
      <div className={`${classes.paper}`} style={modalStyle} >
        <ProductForm isNewProduct={true} />
      </div>    
    </Modal>
  )
}

export default NewProduct
  