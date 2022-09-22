import React, { useState, useEffect } from 'react'
import { Card, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getSellerById, addSeller, updateSeller } from './SellerService'
import { useHistory } from 'react-router-dom'

import { Formik } from 'formik'
import * as yup from 'yup'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '63ch',
    },
  },
}))

function NewVendor({ isNewSeller, id, Seller }) {
  const initialState = {
    email: '',
    country: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    // storeSlug: "",
    state: '',
    city: '',
    // storeName: "",
    zipCode: '',
    address: '',
    // storeEmail: "",
    password: 'password',
    secretAnswer: 'secret',
    creditLimit: '',
    creditSpent: '',
    loyaltyNo: '',
    loyaltyPoint: '',
    picture: '',
    referralCode: '',
    walletBalance: '',
  }

  const initialValues = {
    email: '',
    name: '',
    mobileNo: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address: '',
  }

  const history = useHistory()

  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const [values, setValues] = useState(initialValues)

  const [seller, setSeller] = useState(Seller)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
    setSeller({ ...seller, [name]: value })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    let tempState = { ...state, ...values }
    if (isNewSeller)
      addSeller(tempState).then(() => {
        setState({ ...state })
        history.push(`/vendors`)
      })
    else
      updateSeller(seller).then((res) => {
        setState({ ...state })
        history.push(`/vendors`)
      })
  }

  useEffect(() => {
    if (!isNewSeller) {
      getSellerById(id).then(({ data }) => {
        setState(data.object)
        setValues(data.object)
      })
    }
  }, [id, isNewSeller])

  return (
    <div className='w-100 overflow-auto'>
      <Card>
        <Formik
          initialValues={values}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={sellerSchema}
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
            <form onSubmit={handleSubmit} className={classes.root}>
              <div>
                <h6>First Name</h6>
                <TextField
                  onChange={handleChange}
                  value={values.firstName || ''}
                  onBlur={handleBlur}
                  name='firstName'
                  margin='dense'
                 
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <h6>Last Name</h6>
                <TextField
                  onChange={handleChange}
                  value={values.lastName || ''}
                  name='lastName'
                  margin='dense'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </div>
              <div>
              <h6>Email</h6>
              <TextField
                  onChange={handleChange}
                  value={values.email || ''}
                  name='email'
                  margin='dense'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </div>
              <div>
                <h6>Preferred Username</h6> 
                <TextField
                  onChange={handleChange}
                  value={values.mobileNo || ''}
                  name='mobileNo'
                  margin='dense'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.mobileNo && errors.mobileNo)}
                  helperText={touched.mobileNo && errors.mobileNo}
                />
                </div>
                <hr></hr>
                <h4>Corporate Information</h4>
                <div>
                  <h6></h6>
                <TextField
                  onChange={handleChange}
                  value={values.address || ''}
                  name='address'
                  margin='dense'
                  label='Address'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </div>
              <div>
                <TextField
                  onChange={handleChange}
                  value={values.city || ''}
                  name='city'
                  margin='dense'
                  label='City/Town'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                />
                <TextField
                  onChange={handleChange}
                  value={values.state || ''}
                  name='state'
                  margin='dense'
                  label='State'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}
                />
              </div>
              <div>
                <TextField
                  onChange={handleChange}
                  value={values.country || ''}
                  name='country'
                  margin='dense'
                  label='Country'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.country && errors.country)}
                  helperText={touched.country && errors.country}
                />
                <TextField
                  onChange={handleChange}
                  value={values.zipCode || ''}
                  name='zipCode'
                  margin='dense'
                  label='Postcode/Zip'
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.zipCode && errors.zipCode)}
                  helperText={touched.zipCode && errors.zipCode}
                />
              </div>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

const phoneValidation = /^234[0-9]{10}$/

const sellerSchema = yup.object().shape({
  name: yup.string().required('Name field is required'),
  email: yup.string().email('Please enter a valid email address.').required(),
  mobileNo: yup
    .string()
    .matches(phoneValidation, 'Please enter a valid number i.e 2348012345678')
    .required(),
  address: yup
    .string()
    .min(5, 'Please enterr a more detailed address')
    .required(),
  city: yup.string().required('Please enter a valid city. i.e Lagos'),
  state: yup.string().required('Please enterr a valid state. i.e Oyo'),
  country: yup.string().required('Please enter a valid country. i.e Nigeria'),
  zipCode: yup.string().required('Please enter a valid zip code. i.e 100001'),
})

export default NewVendor
