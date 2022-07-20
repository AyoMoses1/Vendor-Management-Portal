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

function UpdateUserForm({ id }) {
    const initialValues = {
        lastName: '',
        firstName: '',
    }
    const initialState = {
        lastName: '',
        firstName: '',
    }
    const classes = useStyles()
    const [state, setState] = useState(initialState)
    const [values, setValues] = useState(initialValues)
    const history = useHistory()
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
    const [isOpen, setIsOpen] = React.useState(false)

    const handleModal = () => {
        setIsOpen(prev => !prev)
    }

    const handleSubmit = (values) => {
        let tempState = { ...state, ...values }
        updateUser(tempState)
            .then((response) => {
                if (response.status == '200') {
                    setState({ ...state })
                    setAlertData({ success: true, text: "User updated sucessfully", title: 'User Updated' })
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
        getUserById(id).then(({ data }) => {
            console.log(data.object);
            setState(data.object)
            setValues(data.object)
        })
    }, [id])

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
                            </div>
                            <Button type='submit' variant='contained' color='primary'>
                                Submit
                            </Button>
                            <Alert
                                isOpen={isOpen}
                                handleModal={handleModal}
                                alertData={alertData}
                                handleOK={() => {
                                    history.goBack()
                                }}
                            />
                        </form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}

const userSchema = yup.object().shape({
    firstName: yup.string().required('name cannot be blank'),
    lastName: yup.string().required('name cannot be blank'),
})

export default UpdateUserForm
