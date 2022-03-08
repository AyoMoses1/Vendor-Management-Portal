import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

import { Formik } from 'formik'
import * as yup from 'yup'

const Profile = () => {
  const initialState = {
    password: 'password',
  }
  const initialValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const [state, setState] = React.useState(initialState)
  const [values, setValues] = React.useState(initialValues)

  return (
    <div className='m-sm-30'>
      <Formik
        initialValues={values}
        enableReinitialize={true}
        validationSchema={productSchema}
      >
        <form className='px-4'>
          <Grid
            justify='center'
            direction='column'
            alignItems='center'
            container
            spacing={3}
          >
            <h1>Update your password</h1>
            <Grid item sm={6} xs={12}>
              <TextField
                className='mb-4'
                name='password'
                label='Old Password'
                fullWidth
                margin='normal'
                variant='outlined'
              />
              <TextField
                className='mb-4'
                name='password'
                label='New Password'
                fullWidth
                margin='normal'
                variant='outlined'
              />
              <TextField
                className='mb-4'
                name='confirmPassword'
                label='Confrim New Password'
                fullWidth
                margin='normal'
                variant='outlined'
              />
            </Grid>
            <Button
              className='mb-4 px-12'
              variant='contained'
              color='primary'
              type='submit'
            >
              Update Password
            </Button>
          </Grid>
        </form>
      </Formik>
    </div>
  )
}

const productSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required'),
  description: yup
    .string()
    .min(10)
    .required('Please enter a description of atleast 10 chars long'),
})

export default Profile
