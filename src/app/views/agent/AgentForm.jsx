import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import * as yup from 'yup'
import { MenuItem } from 'material-ui'
import { Label } from 'recharts'

const agentTypes = ['Lead Agent', 'Bussiness Development Agent']

const AgentForm = () => {
  const initialState = {
    password: 'password',
    secretAnswer: 'secret',
  }
  const initialValues = {
    agentType: '',
    firstName: '',
    lastName: '',
    mobileNo: '',
    name: '',
    email: '',
    state: '',
  }

  const [state, setState] = React.useState(initialState)
  const [values, setValues] = React.useState(initialValues)

  const handleSubmit = () => {}

  return (
    <div className='m-sm-30'>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={productSchema}
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
              <h1>Agent personal details</h1>
              <Grid item sm={6} xs={12}>
                <Label>Select Agent Type</Label>
                <TextField
                  className='mb-4'
                  name='agentType'
                  label='Select Agent Type'
                  variant='outlined'
                  fullWidth
                  select
                  margin='normal'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.agentType || ''}
                  error={Boolean(touched.agentType && errors.agentType)}
                  helperText={touched.agentType && errors.agentType}
                >
                  {agentTypes.map((agentType, idx) => (
                    <MenuItem key={idx} value={agentType}>
                      {agentType}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className='mb-4'
                  name='price'
                  label='Product Price(₦)'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price || ''}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <TextField
                  className='mb-4'
                  name='discountRate'
                  label='Discount Rate (%)'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discountRate || ''}
                  helperText={touched.discountRate && errors.discountRate}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='name'
                  label='Product Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ''}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  className='mb-4'
                  name='sku'
                  label='SKU'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sku || ''}
                  error={Boolean(touched.sku && errors.sku)}
                  helperText={touched.sku && errors.sku}
                />
                <TextField
                  className='mb-4'
                  name='description'
                  label='Description'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  multiline
                  // rows={8}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description || ''}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Button
                className='mb-4 px-12'
                variant='contained'
                color='primary'
                type='submit'
              >
                Add Product
              </Button>
            </Grid>
          </form>
        )}
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

export default AgentForm
