import React, { useState, useEffect } from 'react'
import { Card, TextField, Button, MenuItem } from '@material-ui/core'
import { getUserById, addUser, updateUser, getAllRoles } from './UserService'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import * as yup from 'yup'
import { Formik } from 'formik'
import Alert from 'app/components/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '63ch',
    },
  },
}))

function UserForm({ isNewUser, id, User }) {
  const initialValues = {
    email: '',
    lastName: '',
    firstName: '',
    phoneNo: '',
    role: 3,
    username: '',
  }
  const initialState = {
    email: '',
    lastName: '',
    firstName: '',
    signedIn: false,
    phoneNo: '',
    active: false,
    role: 3,
    username: '',
  }
  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const [values, setValues] = useState(initialValues)
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')
  const history = useHistory()
  const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
  const [isOpen, setIsOpen] = React.useState(false)

  const handleModal = () => {
    setIsOpen(prev => !prev)
  }

  const handleSubmit = (values, { isSubmitting }) => {
    let tempState = { ...state, ...values }
    if (isNewUser)
      addUser(tempState).then((res) => {
        if (res.status == 200) {
          setState({ ...state })
          setAlertData({ success: true, text: "User created sucessfully", title: 'User Created' })
          handleModal();
        } else {
          setAlertData({ success: false, text: res?.errorMsg ?? 'Invalid details provided', title: 'Unable to create user' })
          handleModal();
          return
        }
      })
    else
      updateUser(tempState)
        .then((response) => {
          if (response.status == '200') {
            setState({ ...state })
            setAlertData({ success: true, text: "User updated sucessfully", title: 'User Created' })
            handleModal();
          } else {
            setAlertData({ success: false, text: response?.errorMsg ?? 'Invalid details provided', title: 'Unable to create user' })
            handleModal();
            return
          }
        })
        .catch((err) => console.error(err))
  }

  useEffect(() => {
    getRoles()
    if (!isNewUser) {
      getUserById(id).then(({ data }) => {
        console.log(data.object);
        setState(data.object)
        setValues(data.object)
        setRole(data.object.role.name)
      })
    }
  }, [id, isNewUser])

  const getRoles = () => {
    getAllRoles().then(({ data }) => {
      setRoles(data.object)
    })
  }

  return (
    <div className='w-100 overflow-auto'>
      <Card>
        <Formik
          initialValues={values}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={userSchema}
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
            <form className={classes.root} onSubmit={handleSubmit}>
              <div>
                <TextField
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstName'
                  margin='normal'
                  label='First Name'
                  onBlur={handleBlur}
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  onChange={handleChange}
                  value={values.lastName}
                  name='lastName'
                  margin='normal'
                  label='Last Name'
                  onBlur={handleBlur}
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  onChange={handleChange}
                  value={values.username}
                  name='username'
                  margin='normal'
                  label='User name'
                  onBlur={handleBlur}
                  type='text'
                  fullWidth
                  variant='outlined'
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
              </div>
              <div>
                <TextField
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  margin='normal'
                  label='Email'
                  type='text'
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  variant='outlined'
                />

                <TextField
                  onChange={handleChange}
                  value={values.phoneNo}
                  name='phoneNo'
                  margin='normal'
                  label='Phone Number'
                  type='text'
                  onBlur={handleBlur}
                  fullWidth
                  error={Boolean(touched.phoneNo && errors.phoneNo)}
                  helperText={touched.phoneNo && errors.phoneNo}
                  variant='outlined'
                />
              </div>
              <div>
                <TextField
                  className='mb-4'
                  name='role'
                  label='Select User Role'
                  variant='outlined'
                  fullWidth
                  select
                  margin='normal'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role || ''}
                >
                  {roles.sort().map((role) => (
                    <MenuItem value={role.id} key={role.id}>
                      {role.name.substr(5)}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
              <Alert
                isOpen={isOpen}
                handleModal={handleModal}
                alertData={alertData}
                handleOK={() => {
                  history.push('/users')
                }}
              />
            </form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

const phoneValidation = /^234[0-9]{10}$/

const userSchema = yup.object().shape({
  firstName: yup.string().required('name cannot be blank'),
  username: yup.string().required('username cannot be blank'),
  lastName: yup.string().required('name cannot be blank'),
  email: yup
    .string()
    .email('please enter a valid email i.e doe@email.com')
    .required('email cannot be blank'),
  phoneNo: yup
    .string()
    .matches(phoneValidation, 'please enter a valid number i.e 2348012345678')
    .required('phone number cannot be blank'),
})

export default UserForm
