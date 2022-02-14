import React from 'react'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core'
import http from '../../../services/api'

import { Formik } from 'formik'

import * as yup from 'yup'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'

import Notification from '../../../components/Notification'
import { errorState } from '../../helpers/error-state'

const CreateShippingOption = () => {
  const history = useHistory()

  const initialValues = {
    name: '',
    baseCost: '',
    additionalCost: '',
    additionalCostOnEvery: '',
    criteriaValue: '',
  }
  const initialState = {
    shippingClass: '',
    shippingZone: '',
    methodCondition: '',
    dimensionUnit: '',
    calculationUnit: '',
  }
  const calculationUnit = [
    'WEIGHT',
    'WIDTH',
    'SHIPPING_CLASS',
    'VOLUME',
    'HEIGHT',
    'VOLUME',
  ]
  const methodCondition = ['GREATER_THAN', 'LESS_THAN', 'EQUAL_TO']
  const dimensionUnit = ['ML', 'CM', 'M', 'KM', 'G', 'KG', 'T', 'CL', 'L', 'KL']
  const [value, setValues] = React.useState(initialValues)
  const [state, setState] = React.useState(initialState)
  const [error, setError] = React.useState('')
  const [severity, setSeverity] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [shippingZones, setShippingZones] = React.useState()
  const [shippingClass, setShippingClass] = React.useState()
  const [shipping, setShipping] = React.useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = { ...state, ...values }
    setLoading(true)
    http.post(`/afrimash/shipping-option`, payload).then((res) => {
      setLoading(false)
      if (res.status === 200) {
        history.push('/shipping-options')
      } else if (res.status === 'BAD_REQUEST') {
        let message = 'Somthing went wrong with that request'
        errorState(setError, setSeverity, message)
      }
    })
  }

  const handleSelect = (newValue, fieldName) => {
    if (newValue) {
      const { id } = newValue
      setState({ ...state, [fieldName]: id })
    }
  }

  const handleAutoCompleteSelect = (e, name) => {
    setState({ ...state, [name]: e.target.value })
    if (e.target.value === 'SHIPPING_CLASS') {
      setShipping(true)
    } else {
      setShipping(false)
    }
  }

  const getAllShippingZones = () => {
    setLoading(true)
    http.get('/afrimash/shipping-zone').then((res) => {
      setShippingZones(res?.data.object)
      setLoading(false)
    })
  }
  const getAllShippingClasses = () => {
    setLoading(true)
    http.get('/afrimash/shipping-class').then((res) => {
      setShippingClass(res?.data.object)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    getAllShippingClasses()
    getAllShippingZones()
  }, [])

  return (
    <div className='m-sm-30'>
      <Notification alert={error} severity={severity || ''} />
      <Formik
        initialValues={value}
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
                <h1>Create new Shipping Option</h1>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='name'
                  label='Option Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                {shipping && (
                  <Autocomplete
                    id='shippingClassId'
                    name='shippingClass'
                    options={shippingClass}
                    disabled={!shipping}
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(event, newValue) =>
                      handleSelect(newValue, 'shippingClass')
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Select Shipping class'
                        variant='outlined'
                        required={!shipping}
                        margin='normal'
                      />
                    )}
                  />
                )}
                {!shipping && (
                  <TextField
                    className='mb-4'
                    name='methodCondition'
                    label='Select Method Condition'
                    variant='outlined'
                    select
                    margin='normal'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleAutoCompleteSelect(e, 'methodCondition')
                    }
                    value={state.methodCondition}
                  >
                    {methodCondition.map((method) => (
                      <MenuItem value={method} key={method}>
                        {method}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                <TextField
                  className='mb-4'
                  name='additionalCost'
                  label='Additional Cost'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.additionalCost}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='calculationUnit'
                  label='Select calculation unit'
                  variant='outlined'
                  select
                  required
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={(e) =>
                    handleAutoCompleteSelect(e, 'calculationUnit')
                  }
                  value={state.calculationUnit}
                >
                  {calculationUnit.map((unit) => (
                    <MenuItem value={unit} key={unit}>
                      {unit}
                    </MenuItem>
                  ))}
                </TextField>
                {!shipping && (
                  <TextField
                    className='mb-4'
                    name='criteriaValue'
                    label='Criteria value'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.criteriaValue}
                    error={Boolean(
                      touched.criteriaValue && errors.criteriaValue
                    )}
                    helperText={touched.criteriaValue && errors.criteriaValue}
                  />
                )}
                <TextField
                  className='mb-4'
                  name='baseCost'
                  label='Base Cost'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.baseCost}
                  error={Boolean(touched.baseCost && errors.baseCost)}
                  helperText={touched.baseCost && errors.baseCost}
                />
                {values.additionalCost > 1 && (
                  <TextField
                    className='mb-4'
                    name='additionalCostOnEvery'
                    label='Additional Cost on every'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.additionalCostOnEvery}
                    error={Boolean(
                      touched.additionalCostOnEvery &&
                        errors.additionalCostOnEvery
                    )}
                    helperText={
                      touched.additionalCostOnEvery &&
                      errors.additionalCostOnEvery
                    }
                  />
                )}
                {values.additionalCost > 1 && (
                  <TextField
                    className='mb-4'
                    name='dimensionUnit'
                    label='Select dimension unit'
                    variant='outlined'
                    select
                    margin='normal'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={(e) =>
                      handleAutoCompleteSelect(e, 'dimensionUnit')
                    }
                    value={state.dimensionUnit}
                  >
                    {dimensionUnit.map((unit) => (
                      <MenuItem value={unit} key={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
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
                Create shipping option
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
  baseCost: yup.string().required('Please enter a valid base cost'),
})

export default CreateShippingOption
