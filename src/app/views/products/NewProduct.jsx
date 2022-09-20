import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProductForm from './ProductForm'
import { Modal } from '@material-ui/core'

function NewProduct({ location, isOpen, handleClose, created }) {
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

  function getModalStyle() {
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      overflowY: "scroll",
      maxHeight: "90%"
    }
  }

  const [modalStyle] = React.useState(getModalStyle)
  return (
    <Modal open={isOpen} onClose={handleClose} >
      <div className={`${classes.paper}`} style={modalStyle} >
        <ProductForm isNewProduct={true} created={created} closeModal={handleClose} />
      </div>
    </Modal>
  )
}

export default NewProduct
