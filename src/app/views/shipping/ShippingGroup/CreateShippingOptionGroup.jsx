import React, { useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import http from '../../../services/api'

import { Formik } from 'formik'

import * as yup from 'yup'

import Notification from '../../../components/Notification'
import { errorState } from '../../helpers/error-state'
import { useDispatch, useSelector } from 'react-redux'
import { addShippingGroup } from 'app/redux/actions/shippingActions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const initialValues = {
  name: '',
  description: '',
}
const CreateShippingOptionGroup = () => {
  const dispatch = useDispatch()

  const shipping = useSelector((state) => state.shipping)
  const {loading, shipping: shippingCreate, error} = shipping
  console.log(shippingCreate)



  const history = useHistory()

  const handleSubmit = (values) => {
      dispatch(addShippingGroup(values))
  }

useEffect(() => {
if(shippingCreate) {
    history.push('/shipping-group')
}
}, [shippingCreate])

  const [severity, setSeverity] = React.useState('')



  return (
    <div className='m-sm-30'>
      {/* {errorCreate && <Notification alert={errorCreate} severity={severity || ''} /> }
      {shippingCreate && <Notification alert={shippingCreate} severity={severity || ''} /> } */}
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validationSchema={shippingGroupSchema}
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
                <h1>Create new Shipping Option Group</h1>
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
              
            </Grid>
            <Grid >
              <Button
                className='w-220 mt-4'
                disabled={loading}
                variant='contained'
                color='primary'
                type='submit'
              >
                {'Create Group'}
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  )
}

const shippingGroupSchema = yup.object().shape({
  name: yup.string().required('please enter a valid name'),
  description: yup.string().required('Please enter a valid description'),
})

export default CreateShippingOptionGroup
