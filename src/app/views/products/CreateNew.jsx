import React from 'react'
import { TextField, Modal, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import * as yup from 'yup'

function rand() {
  return Math.round(Math.random() * 20) - 10
}
const initialValues = {
  name: '',
  description: '',
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

function CreateNew({
  name,
  isOpen,
  handleClose,
  fields,
  onSubmit,
  states,
  id,
}) {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [state, setState] = React.useState({})
  const [values, setValues] = React.useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmit(state).then((res) => {
      if (res.data.status === 'OK') {
        handleClose()
      } else {
        return
      }
    })
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id='simple-modal-title'>{name}</h4>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={productSchema}
      >
        {({
          values,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              {fields.map((field, index) => {
                return (
                  <TextField
                    className='capitalize'
                    onChange={handleChange}
                    margin='normal'
                    id={field}
                    name={field}
                    label={field}
                    type='text'
                    onBlur={handleBlur}
                    fullWidth
                  />
                )
              })}
              <Button type='submit' variant='contained' color='primary'>
                Create
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
const productSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
})

export default CreateNew
