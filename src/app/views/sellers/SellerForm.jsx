import React, { useState, useEffect } from 'react';
import { Card, TextField, Button} from '@material-ui/core';
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
import './Sellerform.scss';
import { CountryDropdown} from "react-country-region-selector";

import Input from 'react-phone-number-input/input'


// Push to test

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
    userName:'',
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
    lastName:'',
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

        

        <div>  
          <InputLabel htmlFor="firstname-input" className='title'>
            First Name
          </InputLabel>  
          
          <TextField
            onChange={handleChange}
            value={values.firstName || ''}
            onBlur={handleBlur}
            name='firstName'
            margin='none'
            style={{width:'30ch'}}
            type='text'
            size='small'
            variant='filled'
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
        </div>
        <div>
          <InputLabel htmlFor="lastname-input" className='title'>
            Last Name
          </InputLabel> 
          <TextField
            onChange={handleChange}
            value={values.lastName || ''}
            name='lastName'
            margin='none'
            style={{width:'30ch'}}
            type='text'
            size='small'
            variant='filled'
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />  
        </div>
        </Box>
        <div>
          <InputLabel htmlFor="email-input" className='title'>
              Email
            </InputLabel>
            <TextField
              onChange={handleChange}
              value={values.email || ''}
              name='email'
              margin='none'
              type='text'
              size='small'
              fullWidth
              variant='filled'
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              />
        </div>

        <div>
          <InputLabel htmlFor="username-input" className='title'>
              Preferred Username
            </InputLabel>
            <TextField
              onChange={handleChange}
              value={values.userName || ''}
              name='userName'
              margin='none'
              size='small'
              type='name'
              fullWidth
              variant='filled'
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
            />
          </div>

          <hr></hr>

          <div>
            <h4 className='h4'>Corporate Information</h4>
          </div>
          <div>
            <InputLabel htmlFor="productname-input" className='title'>
              Product Name
            </InputLabel>
            <TextField
              onChange={handleChange}
              value={values.address || ''}
              name='address'
              margin='dense'
              placeholder='Thommy Tomatoes'
              type='text'
              size='small'
              fullWidth
              variant='filled'
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
        </div>

        <div>
        <InputLabel htmlFor="businessname-input" className='title'>
            Business Name 
          </InputLabel>
          <TextField
            onChange={handleChange}
            value={values.city || ''}
            name='city'
            margin='dense'
            label='City/Town'
            size='small'
            type='text'
            fullWidth
            variant='filled'
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />
        </div>

      <div>
        <InputLabel htmlFor="store-input" className='title'>
          Type of Store
        </InputLabel>
  
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Self-Managed" />
          <FormControlLabel control={<Checkbox />} label="Managed" />
        </FormGroup>
      
      </div>

        <div>
          <InputLabel htmlFor="address-input">
            Address 1
          </InputLabel>
          <TextField
            onChange={handleChange}
            value={values.address || ''}
            name='country'
            margin='none'
            size='small'
            type='text'
            fullWidth
            variant='filled'
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
          </div>

          <div>
          <InputLabel htmlFor="address-input" className='title'>
            Address 2
          </InputLabel> 
          <TextField
            onChange={handleChange}
            value={values.zipCode || ''}
            name='address'
            margin='none'
            type='text'
            fullWidth
            variant='filled'
            error={Boolean(touched.zipCode && errors.zipCode)}
            helperText={touched.zipCode && errors.zipCode}
          />
        </div>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            
          }}
        >
        <div>
        <InputLabel htmlFor="city-input" className='title'>
          City / Town
        </InputLabel> 
          <TextField
            onChange={handleChange}
            value={values.zipCode || ''}
            name='city'
            style={{width:'30ch'}}
            size='small'
            margin='dense'
            placeholder='ikeja'
            type='text'
            variant='filled'
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />
        </div>

        <div>
          <InputLabel htmlFor="state-input" className='title'>
            State
          </InputLabel> 
          <TextField
            onChange={handleChange}
            value={values.state || ''}
            name='state'
            margin='none'
            style={{width:'30ch'}}
            size='small'
            type='text'
            placeholder='Lagos'
            variant='filled'
            error={Boolean(touched.state && errors.state)}
            helperText={touched.state && errors.state}
          />
        </div>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            
          }}
        >
        <div>
        <InputLabel htmlFor="postal-input" className='title'>
          Postal / Zip Code
        </InputLabel> 
        <TextField
          onChange={handleChange}
          value={values.zipCode || ''}
          name='zipCode'
          margin='none'
          style={{width:'30ch'}}
          size='small'
          type='number'
          placeholder='1223300'
          variant='filled'
          error={Boolean(touched.zipCode && errors.zipCode)}
          helperText={touched.zipCode && errors.zipCode}
        />
        </div>

        <div>
          <InputLabel htmlFor="country-input" className='title'>
            Country
          </InputLabel>
          <div className="App">  
          
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
        </div>
      </Box>

        <div>

          <InputLabel htmlFor="whatsapp-input" className='title'>
            Store Phone Number
          </InputLabel>
        </div>
        <div className='field'>
          <Input
          country="NG"
          international
          withCountryCallingCode
          value={values.storeNumber}
          onChange={setValue}/>
        </div>

        <div>
          <InputLabel htmlFor="whatsapp-input" className='title'>
            Whatsapp NumberPhone 
          </InputLabel>
          <div className='field'>
            <Input
              country="NG"
              international
              withCountryCallingCode
              value={values.whatsappNumber}
              onChange={setValue}
            />
          </div>
        </div>

        <div>
          <h4 className='h4'> Uploads</h4>
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
            <Button variant="contained" component="label" className='uploads'>
              Choose file
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            </div>
          <InputLabel shrink htmlFor="firstname-input">
          front page
        </InputLabel>
        <Button variant="contained" component="label" className='uploads'>
            Choose file
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <InputLabel shrink htmlFor="firstname-input">
          back page
        </InputLabel>
        </div>

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
          </form>
        )}
      </Formik>
    </Card>
    
  </div>
)}
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