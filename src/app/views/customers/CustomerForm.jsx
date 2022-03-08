import React, { useState, useEffect } from 'react'
import { Card, TextField, Button, MenuItem } from '@material-ui/core'
import { getCustomerById, addCustomer, updateCustomer } from './CustomerService'

import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'

import Loading from 'matx/components/MatxLoadable/Loading'
import Notification from '../../components/Notification'
import { errorState } from '../helpers/error-state'
import { states } from '../../../utils/states'

function NewCustomer({ isNewCustomer, id, Customer }) {
  const initialValues = {
    email: '',
    country: '',
    password: 'password',
    lastName: '',
    firstName: '',
    mobileNo: '',
    state: '',
    zipCode: '',
    address: '',
    city: '',
    secretAnswer: 'secret',
  }
  const initialState = {
    email: '',
    country: '',
    password: 'password',
    lastName: '',
    firstName: '',
    mobileNo: '',
    state: '',
    zipCode: '',
    address: '',
    city: '',
    secretAnswer: 'secret',
    creditLimit: '',
    creditSpent: '',
    picture: '',
  }

  const [state, setState] = useState(initialState)
  const [values, setValues] = React.useState(initialValues)
  const [customer, setCustomer] = useState(Customer)
  const history = useHistory()
  const [loading, isLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setState({ ...state, [name]: value })
  //   setCustomer({ ...customer, [name]: value })
  // }

  const handleSubmit = (values, { setSubmitting }) => {
    let tempState = { ...state, ...values }
    if (isNewCustomer) {
      const result = addCustomer(
        tempState,
        isLoading,
        setAlert,
        setSeverity
      ).then((res) => res)
      if (result) {
        setState({ ...state })
        history.push('/customers')
      } else if (!result) {
        errorState(setAlert, setSeverity)
      }
    } else {
      delete values.loyaltyNo
      delete values.loyaltyPoint
      updateCustomer(values).then((res) => {
        setState({ ...state })
        if (res.status === 200) {
          history.push('/customers')
        } else if (res.status !== 200) {
          errorState(setAlert, setSeverity)
        }
      })
    }
  }

  useEffect(() => {
    if (!isNewCustomer) {
      isLoading(true)
      getCustomerById(id).then(({ data }) => {
        setState(data.object)
        setValues(data.object)
        isLoading(false)
      })
    }
  }, [id, isNewCustomer])

  return (
    <div className='w-100 overflow-auto'>
      {loading ? (
        <Loading />
      ) : (
        <Card>
          {severity === 'error' && (
            <Notification alert={alert} severity={severity || ''} />
          )}
          <Formik
            initialValues={values}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={customerValidations}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setSubmitting,
              setFieldValue,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    name='firstName'
                    margin='normal'
                    label='First Name'
                    type='text'
                    fullWidth
                    variant='outlined'
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    name='lastName'
                    margin='normal'
                    fullWidth
                    label='Last Name'
                    type='text'
                    variant='outlined'
                  />
                </div>
                <div>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name='email'
                    fullWidth
                    margin='normal'
                    label='Email'
                    type='text'
                    variant='outlined'
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobileNo}
                    name='mobileNo'
                    fullWidth
                    margin='normal'
                    label='Phone Number'
                    type='text'
                    variant='outlined'
                    error={Boolean(touched.mobileNo && errors.mobileNo)}
                    helperText={touched.mobileNo && errors.mobileNo}
                  />
                </div>
                <div>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    name='address'
                    margin='normal'
                    fullWidth
                    label='Address'
                    type='text'
                    variant='outlined'
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />

                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.city}
                    name='city'
                    margin='normal'
                    fullWidth
                    label='City/Town'
                    type='text'
                    variant='outlined'
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </div>
                <div>
                  <TextField
                    className='mb-4'
                    name='state'
                    label='State'
                    variant='outlined'
                    margin='normal'
                    select
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values?.state}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  >
                    {states.map((state, idx) => (
                      <MenuItem key={idx} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    name='country'
                    margin='normal'
                    label='Country'
                    fullWidth
                    type='text'
                    variant='outlined'
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  />
                </div>
                <div>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zipCode}
                    name='zipCode'
                    margin='normal'
                    fullWidth
                    label='Postcode/ZipCode'
                    type='text'
                    variant='outlined'
                    error={Boolean(touched.zipCode && errors.zipCode)}
                    helperText={touched.zipCode && errors.zipCode}
                  />
                </div>
                <Button type='submit' variant='contained' color='primary'>
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Card>
      )}
    </div>
  )
}

const phoneValidation = /^234[0-9]{10}$/

const customerValidations = yup.object().shape({
  firstName: yup.string().required('Name field is required, i.e John Doe'),
  email: yup.string().email('Please enter a valid email address.').required(),
  mobileNo: yup
    .string()
    .matches(phoneValidation, 'Please enter a valid number i.e 2348012345678')
    .required('Phone number cannot be blank'),
  address: yup
    .string()
    .min(5, 'Please enterr a more detailed address')
    .required(),
  state: yup.string().required('Please enterr a valid state. i.e Lagos'),
  city: yup.string().required('Please enterr a valid city. i.e Ikeja'),
  country: yup.string().required('Please enter a valid country. i.e Nigeria'),
  zipCode: yup.number().required('Please enter a valid zip code. i.e 100001'),
})

export default NewCustomer
