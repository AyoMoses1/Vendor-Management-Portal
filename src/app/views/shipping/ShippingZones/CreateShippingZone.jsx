import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import http from '../../../services/api'

import { Formik } from 'formik'

import * as yup from 'yup'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

import Notification from '../../../components/Notification'
import { errorState } from '../../helpers/error-state'

const CreateShippingZone = ({ location }) => {
  const history = useHistory()
  const { id } = location?.state
  const initialValues = {
    name: '',
    shippingRegion: '',
    description: '',
  }
  const [shippinZones, setShippingZones] = React.useState(initialValues)

  const [error, setError] = React.useState('')
  const [severity, setSeverity] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true)
    if (id) {
      http.put(`/afrimash/shipping-zone`, values).then((res) => {
        setLoading(false)
        if (res.status === 200) {
          history.push('/shipping-zones')
        } else if (res.status === 'BAD_REQUEST') {
          let message = 'Somthing went wrong with that request'
          errorState(setError, setSeverity, message)
        }
      })
    } else {
      http.post(`/afrimash/shipping-zone`, values).then((res) => {
        setLoading(false)
        if (res.status === 200) {
          history.push('/shipping-zones')
        } else if (res.status === 'BAD_REQUEST') {
          let message = 'Somthing went wrong with that request'
          errorState(setError, setSeverity, message)
        }
      })
    }
  }

  const getAllShippingZones = (zoneId) => {
    setLoading(true)
    http.get(`/afrimash/shipping-zone/${zoneId}`).then((res) => {
      setShippingZones(res?.data.object)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    if (id) {
      getAllShippingZones(id)
    }
  }, [])

  return (
    <div className='m-sm-30'>
      <Notification alert={error} severity={severity || ''} />
      <Formik
        initialValues={shippinZones}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={shippingZonesSchema}
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
                <h1>Create new Shipping Zone</h1>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='name'
                  label='Zone Name'
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
                  label='Zone Description'
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
            </Grid>
            <Grid item container justify='center' alignItems='center'>
              <Button
                className='w-220 mt-4'
                disabled={loading}
                variant='contained'
                color='primary'
                type='submit'
              >
                {id ? 'Update Zone' : 'Create new zone'}
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  )
}

const shippingZonesSchema = yup.object().shape({
  name: yup.string().required('please enter a valid name'),
  shippingRegion: yup.string().required('this field cannot be null'),
  description: yup.string().required('Please enter a valid description'),
})

export default CreateShippingZone
