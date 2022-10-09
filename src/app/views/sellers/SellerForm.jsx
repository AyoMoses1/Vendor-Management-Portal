import React, { useState, useEffect } from 'react';
import { Card, TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { getSellerById, addSeller, updateSeller } from './SellerService';
import { useHistory } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Formik } from 'formik'
import * as yup from 'yup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import './Sellerform.css';
import { CountryDropdown } from "react-country-region-selector";

import Input from 'react-phone-number-input/input'
import { height } from '@mui/system';


// Push to test

const useStyles = makeStyles((theme) => ({
  root: {
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(2),
    //   width: '63ch',
    // },
  },
}))

function NewVendor({ isNewSeller, id, Seller }) {
  const initialState = {
    email: '',
    country: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    userName: '',
    whatsappNumber: '',
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
    userName: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address: '',
    whatsappNumber: '',
  }

  const [value, setValue] = useState()

  const history = useHistory()

  const [country, setCountry] = useState("");



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
    console.log(tempState, "*******************TEST PAYLOAD************")
    //   if (isNewSeller)
    //     addSeller(tempState).then(() => {
    //       setState({ ...state })
    //       history.push(`/vendors`)
    //     })
    //   else
    //     updateSeller(seller).then((res) => {
    //       setState({ ...state })
    //       history.push(`/vendors`)
    //     })
    // }

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
    <div className=' w-200 overflow-auto'>
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
                <h2 className='h2'> Vendor Registration</h2>
                <h4 className='h4'> Contact Information</h4>
              </div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',

                }}
              >
                <Grid container className='w-full'>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Grid container className='w-full' spacing={4}>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel htmlFor="firstname-input" className='title'>First Name</InputLabel>
                        <TextField
                          className='mb-4'
                          name='firstName'
                          placeholder='First Name'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.firstName || ''}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />

                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel htmlFor="lastname-input" className='title'>Last Name</InputLabel>
                        <TextField
                          className='mb-4'
                          name='lastName'
                          placeholder='Last Name'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.lastName || ''}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />

                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <InputLabel htmlFor="email-input" className='title'>Email</InputLabel>
                        <TextField
                          className='mb-4'
                          name='email'
                          type='email'
                          placeholder='Email'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email || ''}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <InputLabel htmlFor="username-input" className='title'>Preferred Username</InputLabel>
                        <TextField
                          className='mb-4'
                          name='userName'
                          type='name'
                          placeholder='Preferred Username'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.userName || ''}
                          error={Boolean(touched.userName && errors.userName)}
                          helperText={touched.userName && errors.userName}
                        />
                      </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container className='w-full' spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <h4 className='h4 pb-2'>Corporate Information</h4>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <InputLabel htmlFor="productname-input" className='title'>Product Name</InputLabel>
                        <TextField
                          className='mb-4'
                          name='address'
                          type='text'
                          placeholder='Product Name'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address || ''}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <InputLabel htmlFor="productname-input" className='title'>Business Name</InputLabel>
                        <TextField
                          className='mb-4'
                          name='city'
                          type='text'
                          placeholder='Business Name'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.city || ''}
                          error={Boolean(touched.city && errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <InputLabel htmlFor="store-input" className='title mb-2'>
                          Type of Store
                        </InputLabel>

                        <FormGroup >
                          <FormControlLabel className='radio' control={<Checkbox />} label="Self-Managed" />
                          <FormControlLabel className='radio' control={<Checkbox />} label="Managed" />
                        </FormGroup>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <InputLabel htmlFor="productname-input" className='title mt-2'>
                          Address 1
                        </InputLabel>
                        <TextField
                          className='mb-4'
                          name='address'
                          type='text'
                          placeholder='Address 1'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address || ''}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <InputLabel htmlFor="productname-input" className='title mt-2'>
                          Address 2 <span style={{ fontSize: "10px" }}>{'(Optional)'}</span>
                        </InputLabel>
                        <TextField
                          className='mb-4'
                          name='zipCode'
                          type='text'
                          placeholder='Address 2'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.zipCode || ''}
                          error={Boolean(touched.zipCode && errors.zipCode)}
                          helperText={touched.zipCode && errors.zipCode}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel htmlFor="city-input" className='title'>City / Town</InputLabel>
                        <TextField
                          className='mb-4'
                          name='city'
                          placeholder='Ikeja'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.city || ''}
                          error={Boolean(touched.city && errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel htmlFor="state-input" className='title'>State</InputLabel>
                        <TextField
                          className='mb-4'
                          name='state'
                          placeholder='Lagos'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.state || ''}
                          error={Boolean(touched.state && errors.state)}
                          helperText={touched.state && errors.state}
                        />
                      </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel htmlFor="postal-input" className='title'>Postal / Zip Code</InputLabel>
                        <TextField
                          className='mb-4'
                          name='zipCode'
                          placeholder='1223300'
                          variant='outlined'
                          margin='normal'
                          size='small'
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.zipCode || ''}
                          error={Boolean(touched.zipCode && errors.zipCode)}
                          helperText={touched.zipCode && errors.zipCode}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <InputLabel htmlFor="country-input" className='title'>Country</InputLabel>
                        <div className="">
                          <CountryDropdown
                            value={country}
                            onChange={(val) => setCountry(val)}
                            name='country'
                            className="country"
                            variant='filled'
                            error={Boolean(touched.country && errors.country)}
                            helperText={touched.country && errors.country}
                          />{" "}
                        </div>
                      </Grid>

                      <Grid item lg={12} md={12} sm={12} xs={12} className="py-0">
                        <InputLabel htmlFor="productname-input" className='title mt-2'>
                          Store Phone Number
                        </InputLabel>
                        <div className='field'>
                          <Input
                            country="NG"
                            international
                            withCountryCallingCode
                            value={values.storeNumber}
                            onChange={setValue} />
                        </div>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12} className="py-0">
                        <InputLabel htmlFor="productname-input" className='title mt-2'>
                          Whatsapp NumberPhone
                        </InputLabel>
                        <div className='field'>
                          <Input
                            country="NG"
                            international
                            withCountryCallingCode
                            value={values.whatsappNumber}
                            onChange={setValue} />
                        </div>
                      </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container className='w-full' spacing={2}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <h4 className='h4 pb-2'>Uploads</h4>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className='length'>
                          <h6 className='passport'>Preferred Passport Photograph</h6>
                          <Button variant="contained" component="label" className='upload'>
                            Choose file
                            <input hidden accept="image/*" multiple type="file" />
                          </Button>
                        </div>
                        <div>
                          <p className='passport'>Government Approved Means of Identification </p>
                          <p className='shrink'>
                            (Voter's catd, National ID Card, International Passport)
                          </p>
                          <Button variant="contained" component="label" className='upload'>
                            Choose file
                            <input hidden accept="image/*" multiple type="file" />
                          </Button>
                        </div>
                        <InputLabel shrink htmlFor="firstname-input">
                          Front Page
                        </InputLabel>
                        <Button variant="contained" component="label" className='upload'>
                          Choose file
                          <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        <InputLabel shrink htmlFor="firstname-input">
                          Back Page
                        </InputLabel>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className='register'>
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='button'
                            onClick={handleSubmit}
                          >
                            Register
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              {/* 


              

               */}
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

export default NewVendor;