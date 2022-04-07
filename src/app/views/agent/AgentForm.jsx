import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import http from '../../services/api';

import { Formik } from 'formik';

import * as yup from 'yup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAgentById } from 'app/redux/actions/agents-action';
import Notification from '../../components/Notification';
import { errorState } from '../helpers/error-state';
import { states } from '../../../utils/states';
import getAgeBracket from '../../../utils/getAgeBracket';
import CustomSnackBar, { FailedSnackBar } from '../../components/Snackbar';

const agentTypes = [
  { type: 'Lead Agent', value: 'LEAD_AGENT' },
  { type: 'Bussiness Development Agent', value: 'BD_AGENT' },
];

const gender = ['MALE', 'FEMALE', 'OTHERS'];
const ageBracket = ['18 - 24', '25 - 30', '31 - 40', '40+'];

const initialState = {
  password: 'password',
  secretAnswer: 'secret',
};
const filesObject = {
  passportPhotoUrl: '',
  bankAccountProofUrl: '',
  addressProofUrl: '',
  identityProofUrl: '',
};

const initialValues = {
  agentType: '',
  firstName: '',
  lastName: '',
  mobileNo: '',
  email: '',
  state: '',
};

const AgentForm = ({ isEdit, id, agent }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showSnack, setShowSnack] = useState({ status: false, message: '' });
  const [state, setState] = React.useState(initialState);
  const [files, setFiles] = React.useState(filesObject);
  const [values, setValues] = React.useState(initialValues);
  const [error, setError] = React.useState('');
  const [severity, setSeverity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const agentDetail = useSelector((state) => state.agentDetails);

  const { agentDetails } = agentDetail;

  const fileUploadHandler = async (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    setFiles({
      ...files,
      [name]: file,
    });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    values.ageBracket = getAgeBracket(values.ageBracket);
    console.log({ values });
    const agentData = { ...state, ...values };
    const formData = new FormData();

    formData.append('agent', JSON.stringify(agentData));
    formData.append('passportPhotoUrl', files.passportPhotoUrl);
    formData.append('bankAccountProofUrl', files.bankAccountProofUrl);
    formData.append('addressProofUrl', files.addressProofUrl);
    formData.append('identityProofUrl', files.identityProofUrl);

    const updateData = {
      id,
      ...values,
      ...files,
    };
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (isEdit) {
      http.put(`/afrimash/agents/`, updateData);
      return;
    }

    try {
      const res = await http.post_new(`/afrimash/agents`, formData, config);
      setLoading(false);
      history.push('/agents');
    } catch (err) {
      setLoading(false);
      if (err.response) {
        console.log(err.response.data);
        setShowSnack({
          message: err.response.data.errorMsg,
          status: true,
        });
        errorState(setError, setSeverity, err.response.data.errorMsg);
      }
    }
  };

  React.useEffect(() => {
    dispatch(getAgentById(id));
  }, [dispatch, id, isEdit]);

  React.useEffect(() => {
    if (isEdit) {
      setTimeout(() => {
        setValues(agentDetails);
        setFiles(agentDetails);
      }, 500);
    }
  }, [agentDetails, isEdit]);


  console.log({showSnack})
  return (
    <div className='m-sm-30'>
      <Notification alert={error} severity={severity || ''} />
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={agentSchema}
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
                <h1>Agent personal details</h1>
              </Grid>
              <Grid item sm={6} xs={12}>
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
                  value={values?.agentType || ''}
                  error={Boolean(touched.agentType && errors.agentType)}
                  helperText={touched.agentType && errors.agentType}
                >
                  {agentTypes.map((agentType, idx) => (
                    <MenuItem key={idx} value={agentType.value}>
                      {agentType.type}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  className='mb-4'
                  name='firstName'
                  label='First Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={agentDetails?.firstName}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  className='mb-4'
                  name='mobileNo'
                  label='Mobile Number'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.mobileNo}
                  error={Boolean(touched.mobileNo && errors.mobileNo)}
                  helperText={touched.mobileNo && errors.mobileNo}
                />
                <TextField
                  className='mb-4'
                  name='ageBracket'
                  label='Age'
                  variant='outlined'
                  margin='normal'
                  select
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.ageBracket}
                  error={Boolean(touched.ageBracket && errors.ageBracket)}
                  helperText={touched.ageBracket && errors.ageBracket}
                >
                  {ageBracket.map((age, idx) => (
                    <MenuItem key={idx} value={age}>
                      {age}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  className='mb-4'
                  name='lastName'
                  label='Last Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  className='mb-4'
                  name='email'
                  label='Email'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
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
                  className='mb-4'
                  name='gender'
                  label='Gender'
                  variant='outlined'
                  margin='normal'
                  select
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.gender}
                  error={Boolean(touched.gender && errors.gender)}
                  helperText={touched.gender && errors.gender}
                >
                  {gender.map((gen, idx) => (
                    <MenuItem key={idx} value={gen}>
                      {gen}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <h3 className='mt-4'>Agent documents uploads</h3>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <InputLabel htmlFor='bootstrap-input'>
                  Passport Photo Image
                </InputLabel>
                <TextField
                  className='mb-4 mr-4'
                  name='passportPhotoUrl'
                  type='file'
                  fullWidth
                  variant='outlined'
                  margin='normal'
                  required
                  aria-required='true'
                  onChange={fileUploadHandler}
                />
                <InputLabel htmlFor='bootstrap-input'>
                  Bank Account Proof File
                </InputLabel>
                <TextField
                  className='mb-4'
                  name='bankAccountProofUrl'
                  fullWidth
                  type='file'
                  variant='outlined'
                  margin='normal'
                  required
                  aria-required='true'
                  onChange={fileUploadHandler}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <InputLabel htmlFor='bootstrap-input'>
                  Address Proof File
                </InputLabel>
                <TextField
                  className='mb-4 mr-4'
                  name='addressProofUrl'
                  fullWidth
                  type='file'
                  required
                  variant='outlined'
                  margin='normal'
                  aria-required='true'
                  onChange={fileUploadHandler}
                />
                <InputLabel htmlFor='bootstrap-input'>
                  Identity Proof File
                </InputLabel>
                <TextField
                  className='mb-4'
                  name='identityProofUrl'
                  fullWidth
                  type='file'
                  variant='outlined'
                  margin='normal'
                  required
                  aria-required='true'
                  onChange={fileUploadHandler}
                />
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
                {isEdit ? 'Update Agent' : 'Create Agent'}
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
      <FailedSnackBar onClose={() => setShowSnack({message: '', status: false})} message={showSnack.message} open={showSnack.status} />
    </div>
  );
};
const phoneValidation = /^234[0-9]{10}$/;
const agentSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  mobileNo: yup
    .string()
    .matches(phoneValidation, 'Please enter a valid number i.e 2348012345678')
    .required('Phone number cannot be blank'),
  email: yup
    .string()
    .email('Please enterr a valid email address')
    .required('Email cannot be blank'),
  state: yup.string().required('Please enterr a valid state. i.e Lagos'),
  agentType: yup.string().required('Please select agent type'),
});

export default AgentForm;
