import React, { useEffect } from 'react'
import { TextField, Modal, Button, Grid, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import "./index.css";
import { errorState } from '../../helpers/error-state';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { addPickupCenter, updatePickupCenter } from '../USSDService';
import Notification from '../../../components/Notification';

import Alert from 'app/components/Alert';


import { Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux';

function rand() {
    return Math.round(Math.random() * 20) - 10
}
function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(5, 4, 3),
    },
}))

const initialValues = {
    state: '',
    city: '',
    address: '',
}

function NewPickupCenter({
    name,
    isOpen,
    pickupCenter,
    handleClose,
    refresh
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [buttonState, setButtonState] = React.useState('Add');

    const [alertData, setAlertData] = React.useState({ success: false, text: '', title: '' });
    const [open, setOpen] = React.useState(false)

    const history = useHistory();
    const { shippingStates } = useSelector(
        (state) => state.getShippingStates,
    );

    const [values, setValues] = React.useState(initialValues)

    useEffect(() => {
        if (pickupCenter) {
            setValues({ ...pickupCenter, state: pickupCenter.state.id })
            setButtonState('Update');
        } else {
            setValues(initialValues);
        }
    }, [pickupCenter])

    const handleModal = () => {
        setOpen(prev => !prev)
    }


    const handleSubmit = async (values) => {
        if (!pickupCenter) {
            let tempState = { ...values }
            const result = await addPickupCenter(
                tempState,
                setLoading,
                setAlert,
                setSeverity
            ).then((res) => res)
            if (result) {
                handleClose()
                setAlertData({ success: true, text: "Pickup center created sucessfully", title: 'Pickup center Created' })
                handleModal();  
                refresh();
            } else if (!result) {
                setAlertData({ success: false, text: result?.errorMsg ?? 'Invalid details provided', title: 'Unable to create pickup center' })
                handleModal(); 
                errorState(setAlert, setSeverity)
            }
        } else {
            let tempState = { ...values }
            const result = await updatePickupCenter(
                tempState,
                setLoading,
                setAlert,
                setSeverity,
            ).then((res) => res)
            if (result) {
                handleClose()
                setAlertData({ success: false, text: result?.errorMsg ?? 'Invalid details provided', title: 'Unable to create pickup center' })
                handleModal();     
                refresh();
                // handleClose();
            } else if (!result) {
                setAlertData({ success: false, text: result?.errorMsg ?? 'Invalid details provided', title: 'Unable to create pickup center' })
                handleModal(); 
                errorState(setAlert, setSeverity)
            }
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h4 id='simple-modal-title mb-4'>{name}</h4>
            {severity === 'error' && (
                <Notification alert={alert} severity={severity || ''} />
            )}

            <Formik
                initialValues={values}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                validationSchema={customerValidations}
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
                    <form onSubmit={handleSubmit}>
                        <div>
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
                                {shippingStates.map((state, idx) => (
                                    <MenuItem key={idx} value={state?.id}>
                                        {state?.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                                name='city'
                                margin='normal'
                                fullWidth
                                label='City'
                                type='text'
                                variant='outlined'
                                error={Boolean(touched.city && errors.city)}
                                helperText={touched.city && errors.city}
                            />
                        </div>
                        <div>
                            <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.address}
                                name='address'
                                fullWidth
                                margin='normal'
                                label='Address'
                                type='text'
                                variant='outlined'
                                error={Boolean(touched.address && errors.address)}
                                helperText={touched.address && errors.address}
                            />
                        </div>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='w-full mt-4'
                            disabled={loading}
                        >
                            {buttonState}
                        </Button>
                    </form>
                )}
            </Formik>

        </div>
    )
    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                {body}
            </Modal>
            <Alert
                isOpen={open}
                handleModal={handleModal}
                alertData={alertData}
                handleOK={handleModal}
              />
        </div>
    )
}

const customerValidations = yup.object().shape({
    address: yup
        .string()
        .min(5, 'Please enter a more detailed address')
        .required(),
    state: yup.string().required('Please select a state. i.e Lagos'),
    city: yup.string().required('Please enter a valid city. i.e Ikeja'),
})

export default NewPickupCenter;
