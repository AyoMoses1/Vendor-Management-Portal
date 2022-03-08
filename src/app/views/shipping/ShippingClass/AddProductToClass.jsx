import React from 'react'
import { TextField, Modal, Button, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'

import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { statesWithIds } from '../../../../utils/states'
import http from '../../../services/api'
import { getAllResults } from 'app/views/products/ProductService'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />
function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
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
}))

function ProductModal({ isOpen, handleClose, id }) {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [values, setValues] = React.useState('')
  const [results, setResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [increment, setIncreament] = React.useState(0)
  const [state, setState] = React.useState('')

  const handleSubmit = (value, { setSubmitting }) => {
    http
      .patch(`/afrimash/products/${state}/shipping-class/${id}`)
      .then((res) => {
        if (res.status === 200) {
          handleClose()
        }
      })
  }

  const getProducts = (direction) => {
    if (direction == 'next') {
      setIncreament((prev) => prev + 1)
    } else if (!increment < 1) {
      setIncreament((prev) => prev - 1)
    }
    getAllResults(
      setResults,
      setLoading,
      `/afrimash/products?page=${increment}&size=100`
    )
  }

  const handleSelect = (newValue, fieldName) => {
    const { id } = newValue
    setState(id)
  }

  React.useEffect(() => {
    getAllResults(setResults, setLoading, '/afrimash/products/')
  }, [])

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id='simple-modal-title'>Add States To Zone</h4>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, handleSubmit, isSubmitting, setSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Autocomplete
                id='productId'
                options={results}
                onChange={(event, newValue) =>
                  handleSelect(newValue, 'productId')
                }
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Select product'
                    placeholder='Product'
                    fullWidth
                    margin='normal'
                  />
                )}
              />
              <div className='flex mb-4 flex-space-between flex-middle'>
                <Button
                  disabled={increment < 1}
                  onClick={() => getProducts('prev')}
                  variant='contained'
                  color='primary'
                >
                  Prev
                </Button>
                <Button
                  onClick={() => getProducts('next')}
                  variant='contained'
                  color='primary'
                >
                  Next
                </Button>
              </div>
              <Button type='submit' variant='contained' color='primary'>
                Add Product
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  )
}

export default ProductModal
