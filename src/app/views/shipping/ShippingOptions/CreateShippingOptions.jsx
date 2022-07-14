import React, { useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,

} from '@material-ui/core';
import http from '../../../services/api';
// or
import Divider from '@material-ui/core/Divider';

import { Formik } from 'formik';

import * as yup from 'yup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Notification from '../../../components/Notification';
import { errorState } from '../../helpers/error-state';
import { useDispatch, useSelector } from 'react-redux';
import { getShippingOptionGroup } from 'app/redux/actions/shippingActions';
import CreateModal from 'app/components/CreateModal'


const initialValues = {
  name: '',
  baseCost: '',
  additionalCost: '',
  additionalCostOnEvery: '',
  criteriaValue: '',
  description: '',
  width: '',
  length: '',
/*   calculationUnit: '', */
};
const initialState = {
  shippingClass: '',
  shippingZone: '',
  methodCondition: '',
  dimensionUnit: '',
  calculationUnit: '',
  description: '',
  width: '',
  length: '',
};

const CreateShippingOption = ({ location }) => {
  const history = useHistory();
  const { id } = location?.state;
  const calculationUnit = ['SHIPPING_CLASS', 'DIMENSION', 'VOLUME', 'WEIGHT'];
  const methodCondition = ['GREATER_THAN', 'LESS_THAN', 'EQUAL_TO'];
  const dimensionUnit = ['ML', 'CM', 'G', 'ITEM_QTY'];
  const [shippingOption, setShippingOptionDetails] =
    React.useState(initialValues);
  //const [value, setValues] = React.useState(initialValues);
  const [state, setState] = React.useState(initialState);
  const [error, setError] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [shippingZones, setShippingZones] = React.useState();
  const [shippingClass, setShippingClass] = React.useState();
  const [shipping, setShipping] = React.useState(false);
  const [isDimension, setDimension] = React.useState(false);
  
  const [modalIsOpen, setModalIsOpen] = React.useState(false)
  const [created, setCreated] = React.useState({header: false, text: 'We encountered a problem.'})

  const dispatch = useDispatch();

  const {
    loading: loadingGroup,
    shipping: shippingGroup,
    error: errorGroup,
  } = useSelector((state) => state.shippingOptionGroupList);

  // const group = shippingGroup.map((ship)=> (
  //   console.log(ship)
  // ))

  // console.log(shippingGroup)

  const handleModal = () => {
    setModalIsOpen(prev => !prev)
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = { ...state, ...values };
    if (shipping) {
      delete payload.criteriaValue;
      delete payload.methodCondition;
    } else {
      delete payload.shippingClass;
    }
    if (!isDimension) {
      delete payload.width;
      delete payload.length;
    }

    setLoading(true);
    if (id) {
      setLoading(false);
      http.put(`/afrimash/shipping-option`, payload).then((res) => {
        if (res.status === 200) {
          setCreated({header:true, text:'You have successfully created a shipping option.'})
          setModalIsOpen(true)
          // history.push('/shipping-options');
        } else if (res.status === 'BAD_REQUEST') {
          setModalIsOpen(true)
          // let message = 'Somthing went wrong with the request';
          // errorState(setError, setSeverity, message);
        }
      });
    } else {
      setLoading(false);
      http.post(`/afrimash/shipping-option`, payload).then((res) => {
        if (res.status === 200) {
          setCreated({header:true, text:'You have successfully created a shipping option.'})
          setModalIsOpen(true)
          // history.push('/shipping-options');
        } else if (res.status === 'BAD_REQUEST') {
          setModalIsOpen(true)
          // let message = 'Somthing went wrong with the request';
          // errorState(setError, setSeverity, message);
        }
      });
    }
  };

  const handleSelect = (newValue, fieldName) => {
    if (newValue) {
      const { id } = newValue;
      setState({ ...state, [fieldName]: id });
    }
  };

  const handleAutoCompleteSelect = (e, name) => {
    setState({ ...state, [name]: e.target.value });
    if (e.target.value === 'SHIPPING_CLASS') {
      setShipping(true);
    } else if (e.target.value === 'DIMENSION') {
      setDimension(true);
      setShipping(false);
    } else {
      setDimension(false);
      setShipping(false);
    }
  };

  const handleMethodCondition = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const handleDimensionSelect = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const getAllShippingZones = () => {
    setLoading(true);
    http.get('/afrimash/shipping-zone').then((res) => {
      setShippingZones(res?.data.object);
      setLoading(false);
    });
  };

  const getAllShippingClasses = () => {
    setLoading(true);
    http.get('/afrimash/shipping-class').then((res) => {
      setShippingClass(res?.data.object);
      setLoading(false);
    });
  };

  const getShippingOptionDetails = (optionId) => {
    setLoading(true);
    http.get(`/afrimash/shipping-option/${optionId}`).then((res) => {
      const data = res?.data.object;
      setShippingOptionDetails(data);
      const initValues = {
        shippingClass: data?.shippingClass?.name,
        shippingZone: data?.shippingZone?.name,
        methodCondition: data?.methodCondition,
        dimensionUnit: data?.dimensionUnit,
        calculationUnit: data?.calculationUnit,
        description: '',
        width: '',
        length: '',
      };

      setState(initValues)
      setLoading(false);
    });
  };

  React.useEffect(() => {
    getAllShippingClasses();
    getAllShippingZones();
    dispatch(getShippingOptionGroup({}));

    if (id) {
      getShippingOptionDetails(id);
    }
  }, []);



  return (
    <div className='m-sm-30'>
      <Notification alert={error} severity={severity || ''} />
      <Formik
        initialValues={shippingOption}
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
                      handleMethodCondition(e, 'methodCondition')
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
                {!shipping && isDimension && (
                  <TextField
                    className='mb-4'
                    name='width'
                    label='Dimension width'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.width}
                  />
                )}
                {!shipping && isDimension && (
                  <TextField
                    className='mb-4'
                    name='length'
                    label='Dimension length'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.length}
                  />
                )}
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
                      touched.criteriaValue && errors.criteriaValue,
                    )}
                    helperText={touched.criteriaValue && errors.criteriaValue}
                  />
                )}
                <Autocomplete
                  id='shippingZoneId'
                  name='shippingZone'
                  options={shippingZones}
                  // disabled={!shipping}
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
                      required={!shipping}
                      margin='normal'
                    />
                  )}
                />
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
                {values.additionalCost !== '' && !isNaN(parseInt(values.additionalCost)) && (
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
                        errors.additionalCostOnEvery,
                    )}
                    helperText={
                      touched.additionalCostOnEvery &&
                      errors.additionalCostOnEvery
                    }
                  />
                )}

                {values.additionalCost !== '' && !isNaN(parseInt(values.additionalCost)) && (
                  <TextField
                    className='mb-4'
                    name='dimensionUnit'
                    label='Select dimension unit'
                    variant='outlined'
                    select
                    margin='normal'
                    fullWidth
                    onBlur={handleBlur}
                    onChange={(e) => handleDimensionSelect(e, 'dimensionUnit')}
                    value={state.dimensionUnit}
                  >
                    {dimensionUnit.map((unit) => (
                      <MenuItem value={unit} key={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
                <TextField
                  multiline
                  className='mb-4'
                  name='description'
                  label='Option Description'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                />
              </Grid>
              <Divider />
              <Autocomplete
                id='shippingOptionGroup'
                options={shippingGroup.filter((i) => i.description && i.name)}
                getOptionLabel={(option) => option.name}
                fullWidth={true}
                getOptionSelected={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  console.log({ newValue });
                  handleSelect(newValue, 'shippingOptionGroup');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Select Shipping Option group'
                    variant='outlined'
                    margin='normal'
                  />
                )}
              />
            </Grid>

            <Grid item container justify='center' alignItems='center'>
              <Button
                className='w-220 mt-4'
                disabled={loading}
                variant='contained'
                color='primary'
                type='submit'
              >
                {id ? 'Update shipping option' : ' Create shipping option'}
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
      <CreateModal isOpen = {modalIsOpen} handleModal = {handleModal} created={created} title ="shipping option" successLink = '/shipping-options'/>
    </div>
  );
};

const shippingZonesSchema = yup.object().shape({
  name: yup.string().required('please enter a valid name'),
  baseCost: yup.string().required('Please enter a valid base cost'),
});

export default CreateShippingOption;
