import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import http from '../../../services/api'

import { Formik } from 'formik'

import * as yup from 'yup'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

import Notification from '../../../components/Notification'
import { errorState } from '../../helpers/error-state'

const AgentForm = ({ isEdit, id, agent }) => {
  const history = useHistory()

  const initialValues = {
    name: '',
    priority: '',
    description: '',
  }

  const [values, setValues] = React.useState(initialValues)
  const [error, setError] = React.useState('')
  const [severity, setSeverity] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true)
    http.post(`/afrimash/shipping-class`, values).then((res) => {
      setLoading(false)
      if (res.status === 200) {
        history.push('/shipping-classes')
      } else if (res.status === 'BAD_REQUEST') {
        let message = 'Somthin went wrong with that request'
        errorState(setError, setSeverity, message)
      }
    })
  }

  return (
    <div className='m-sm-30'>
      <Notification alert={error} severity={severity || ''} />
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={shippingClassSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setSubmitting,
          setFieldValue,
        }) => (
          <form className='px-4' onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid container item>
                <h1>Create new Shipping Class</h1>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='name'
                  label='Class Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  className='mb-4'
                  name='description'
                  label='Class Description'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.description}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='priority'
                  label='Priority'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.priority}
                  error={Boolean(touched.priority && errors.priority)}
                  helperText={touched.priority && errors.priority}
                />
              </Grid>
            </Grid>
            <Grid item container justify='center' alignItems='center'>
              <Button
                className='w-220 mt-4'
                disabled={loading}
                variant='contained'
                color='primary'
                type='submit'
              >
                Create Class
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  )
}

const shippingClassSchema = yup.object().shape({
  name: yup.string().required('please enter a valid name'),
  priority: yup.string().required('this field cannot be null'),
  description: yup.string().required('Please enter a valid description'),
})

export default AgentForm
