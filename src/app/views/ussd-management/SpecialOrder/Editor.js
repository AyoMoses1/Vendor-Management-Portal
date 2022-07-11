import React, { useEffect } from 'react'
import { TextField, Modal, Button, Grid, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import "../SpecialOrders/special-orders.css"
import { errorState } from '../../helpers/error-state';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { getInvoiceById, updateInvoice } from "./SpecialOrderService";
import { addPickupCenter, updatePickupCenter, getSpecialOrder, updateSpecialOrder } from '../USSDService';
import Notification from '../../../components/Notification';

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
    productName: '',
    quantity: '',
    status: '',
}


function Editor({
    name,
    isOpen,
    specialOrder,
    handleClose,
    refresh
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [buttonState, setButtonState] = React.useState('Add');
    const [error, setError] = React.useState("");

    const history = useHistory();


    let statusValues = []


    if(specialOrder.status === "PENDING"){
        statusValues = ["AWAITING_PAYMENT", "CANCELLED", "CONVERTED"]
    }
    else if (specialOrder.status === "AWAITING_PAYMENT"){
        statusValues = ["PROCESSING", "CANCELLED"]
    }
    else if (specialOrder.status === "PROCESSING"){
        statusValues = ["COMPLETED","CANCELLED"]
    }

    console.log(specialOrder)
    const { shippingStates } = useSelector(
        (state) => state.getShippingStates,
    );

    const [values, setValues] = React.useState(initialValues)

    useEffect(() => {
        if (specialOrder) {
            setValues({ ...specialOrder, id: specialOrder.id })
            setButtonState('Update');
        } else {
            setValues(initialValues);
        }
    }, [specialOrder])

    const handleChange = (e) => {
        setValues(prev => {
            return {...values, [e.target.name]: e.target.value}
        })
    }
    
    const handleSubmit = async (values) => {
        const auth = JSON.parse(localStorage.getItem("auth_user"));
        if (auth.role.name === "ROLE_ADMIN" || auth.role.name === "ROLE_MANAGER") {
          let tempState = { ...values, id: specialOrder.id };
          updateInvoice(tempState).then((res) => {
            console.log(res);
            if (res.status === 200) {
              history.push("/special-orders");
            }
          });
        } else {
          let msg = "You dont have enough permission to perform action";
          errorState(setError, setSeverity, msg);
          return;
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.productName}
                                name='productName'
                                margin='normal'
                                fullWidth
                                label='Product Name'
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
                                value={values.quantity}
                                name='quantity'
                                fullWidth
                                margin='normal'
                                label='Quantity'
                                type='text'
                                variant='outlined'
                                error={Boolean(touched.address && errors.address)}
                                helperText={touched.address && errors.address}
                            />
                        </div>
                        <div>
                        <TextField
                            className='mb-4'
                            name='status'
                            label='Order Status'
                            variant='outlined'
                            margin='normal'
                            select
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.status}
                            error={Boolean(touched.state && errors.state)}
                            helperText={touched.state && errors.state}
                        >
                            {statusValues.map((status) => (
                                <MenuItem value={status} key = {status}>
                                    {status}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='w-full mt-4'
                            // onClick={handleSubmit}
                            disabled={loading}
                        >
                            Update
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

export default Editor;
