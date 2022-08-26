import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import http from '../../../services/api'

import { Formik } from 'formik'

import * as yup from 'yup'

import Notification from '../../../components/Notification'
import { errorState } from '../../helpers/error-state'
import { useDispatch, useSelector } from 'react-redux'
import { addShippingGroup, CREATE_GROUP_RESET, updateShippingGroup } from 'app/redux/actions/shippingActions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';

const initialValues = {
  name: '',
  description: '',
}
const CreateShippingOptionGroup = ({location}) => {
  const dispatch = useDispatch()
  const [shippinZones, setShippingZones] = React.useState([])
  const shipping = useSelector((state) => state.shipping)
  const {loading, shipping: shippingCreate, error} = shipping
  const history = useHistory();
  const [state, setState] = useState({shippingZone: null});
  const [dataLoading, setLoading] = React.useState(false)
  const [shippingOptionGroup, setShippingOptionGroup] = useState(initialValues);

  console.log({ shippingOptionGroup })

  const { id } = location?.state

  const getShippingClassDetails = (classId) => {
    setLoading(true)
    http.get(`/afrimash/shipping-option-group/${classId}`).then((res) => {
      console.log({ shippingOptionGroup: res})
      setShippingOptionGroup(res?.data.object)
      setLoading(false)
    })
  }

  React.useEffect(() => {
    if (id) {
      getShippingClassDetails(id)
    }
  }, [id])


  const handleSelect = (newValue, fieldName) => {
    const { id } = newValue;
    setState({ ...state, [fieldName]: id });
  };

  const handleSubmit = (values) => {
    if(id){
      dispatch(updateShippingGroup({...shippingOptionGroup, ...values}))
    }else{
      values.shippingZone = state?.shippingZone;
      dispatch(addShippingGroup(values));
    }
   
  }

  const getAllShippingZones = () => {
    http.get('/afrimash/shipping-zone').then((res) => {
      setShippingZones(res?.data.object)
    })
  }

  useEffect(() => {
    getAllShippingZones()
  }, [])

useEffect(() => {
if(shippingCreate) {
    history.push('/shipping-group')
    dispatch({ type: CREATE_GROUP_RESET });
}
}, [shippingCreate])

  const [severity, setSeverity] = React.useState('')



  return (
    <div className='m-sm-30'>
      {/* {errorCreate && <Notification alert={errorCreate} severity={severity || ''} /> }
      {shippingCreate && <Notification alert={shippingCreate} severity={severity || ''} /> } */}
      <Formik
        initialValues={shippingOptionGroup}
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
                  value={values?.name}
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
                {/*  <Autocomplete
                  id='shippingZone'
                  name='shippingZone'
                  options={shippinZones}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(event, newValue) =>
                    handleSelect(newValue, 'shippingZone')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select Shipping Zone'
                      variant='outlined'
                      margin='normal'
                    />
                  )}
                /> */}
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
