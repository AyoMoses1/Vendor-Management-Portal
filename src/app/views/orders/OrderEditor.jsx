import React, { useEffect, useState } from 'react'
import { TextField, Modal, Button, MenuItem, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { errorState } from '../helpers/error-state';
import { addDeliveryAddress, updateInvoice } from "./OrderService";
import { statesWithIds } from '../../../utils/states';

import Notification from '../../components/Notification';

import { Formik } from 'formik'
import * as yup from 'yup'
import Alert from 'app/components/Alert';

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 550,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(5, 4, 3),
    },
}))

const initialValues = {
    address: '',
    state: '',
    zipCode: ''
}


function OrderEditor({
    name,
    isOpen,
    order,
    handleClose,
    handleRefresh,
    handleCallBack,
    toggleOrderEditor,
    orderSource
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [error, setError] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [add, setAdd] = useState(false);
    const [newAddressValue, setNewAddressValue] = useState(initialValues);
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });


    useEffect(() => {
        if (order) {
            setAddress(order?.deliveryAddress?.id ?? '')
        }
    }, [order])

    const handleSubmit = async (values) => {
        if (!add) {
            const auth = JSON.parse(localStorage.getItem("auth_user"));
            if (auth.role.name === "ROLE_ADMIN" || auth.role.name === "ROLE_MANAGER") {
                setLoading(true)
                let tempState = { deliveryAddress: values.address, id: order.id };
                updateInvoice(tempState).then((res) => {
                    setLoading(false)
                    if (res.status === 200) {
                        handleCallBack();
                    } else {
                        setAlertData({ success: false, text: 'Unable to update shipping address. Please try again', title: 'Shipping Address' })
                        handleAlertModal();
                    }
                }).catch(err => {
                    setLoading(false)
                    setAlertData({ success: false, text: 'Unable to update shipping address. Please try again', title: 'Shipping Address' })
                    handleAlertModal();
                });
            } else {
                let msg = "You dont have enough permission to perform action";
                errorState(setError, setSeverity, msg);
                return;
            }
        } else {
            const auth = JSON.parse(localStorage.getItem("auth_user"));
            if (auth.role.name === "ROLE_ADMIN" || auth.role.name === "ROLE_MANAGER") {
                setLoading(true)
                let tempState = { ...values, state: parseInt(values.state), customerId: order?.customerId?.id };
                addDeliveryAddress(tempState).then((res) => {
                    setLoading(false)
                    if (res.status === 200) {
                        setAdd(!add);
                        setNewAddressValue(initialValues);
                        handleRefresh();
                        setAlertData({ success: true, text: 'Shipping address added successfully', title: 'Shipping Address' })
                        handleAlertModal();
                    } else {
                        setAlertData({ success: false, text: 'Unable to add shipping address. Please try again', title: 'Shipping Address' })
                        handleAlertModal();
                    }
                }).catch(err => {
                    setLoading(false)
                    setAlertData({ success: false, text: 'Unable to add shipping address. Please try again', title: 'Shipping Address' })
                    handleAlertModal();
                });
            } else {
                let msg = "You dont have enough permission to perform action";
                errorState(setError, setSeverity, msg);
                return;
            }
        }
    }

    const handleCancel = () => {
        setAdd(!add);
    }

    const handleAlertModal = () => {
        setAlertOpen(prev => !prev)
    }

    const handleAlertOK = () => {
        handleAlertModal();
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Alert
                isOpen={alertOpen}
                handleModal={handleAlertModal}
                alertData={alertData}
                handleOK={handleAlertOK}
            />
            <div className='flex items-center justify-between mb-4'>
                <h5 id='simple-modal-title' style={{ margin: '0px' }}>{!add ? name : "Add New Shipping Address"}</h5>
                {!add ? <Button
                    type='button'
                    variant='contained'
                    color='primary'
                    disabled={loading}
                    onClick={handleCancel}
                >
                    Add New Address
                </Button> : <></>}
            </div>
            {severity === 'error' && (
                <Notification alert={alert} severity={severity || ''} />
            )}
            {!add ? <Formik
                initialValues={{ address }}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                validationSchema={updateValidations}
                className="mt-20"
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    handleChange,
                }) => (
                    <form>
                        <TextField
                            className='mb-4'
                            name='address'
                            label='Select shipping address'
                            variant='outlined'
                            margin='normal'
                            select
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.address}
                            error={Boolean(touched.address && errors.address)}
                            helperText={touched.address && errors.address}
                        >
                            {order?.customerId?.deliveryAddresses.map((item, idx) => (
                                <MenuItem key={idx} value={item.id}>
                                    {item.address}
                                </MenuItem>
                            ))}
                        </TextField>

                        <div className='flex items-center justify-between'>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className='mt-4'
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? <CircularProgress size={14} className='mr-10' /> : ''}
                                Update Address
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className='mt-4 mx-4 PENDING'
                                disabled={loading}
                                onClick={() => toggleOrderEditor()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>

                )}
            </Formik>
                :
                <>
                    <Formik
                        initialValues={newAddressValue}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                        validationSchema={createValidation}
                        className="mt-20"
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleSubmit,
                            handleChange,
                        }) => (
                            <form>
                                <div>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values.address}
                                        name='address'
                                        margin='normal'
                                        fullWidth
                                        label='Address'
                                        type='text'
                                        variant='outlined'
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={touched.address && errors.address}
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
                                        {statesWithIds.map((state, idx) => (
                                            <MenuItem key={idx} value={state?.id}>
                                                {state?.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}

                                        value={values.zipCode}
                                        name='zipCode'
                                        margin='normal'
                                        fullWidth
                                        label='Zip Code'
                                        type='number'
                                        variant='outlined'
                                        error={Boolean(touched.zipCode && errors.zipCode)}
                                        helperText={touched.zipCode && errors.zipCode}
                                    />
                                </div>

                                <div className='flex items-center justify-between'>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='primary'
                                        className='mt-4'
                                        disabled={loading}
                                        onClick={handleSubmit}
                                    >
                                        {loading ? <CircularProgress size={14} className='mr-10' /> : ''}
                                        Add Address
                                    </Button>
                                    <Button
                                        type='button'
                                        variant='contained'
                                        color='primary'
                                        className='mt-4 mx-4 PENDING'
                                        disabled={loading}
                                        onClick={handleCancel}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </form>

                        )}
                    </Formik>
                </>
            }

        </div>
    )
    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    )
}

const updateValidations = yup.object().shape({
    address: yup.string().required('Address is required')
})

const createValidation = yup.object().shape({
    address: yup
        .string()
        .min(5, 'Please enterr a more detailed address')
        .required(),
    state: yup.string().required('Please enterr a valid state. i.e Lagos'),
    zipCode: yup.number().required('Please enter a valid zip code. i.e 100001'),
})

export default OrderEditor;
