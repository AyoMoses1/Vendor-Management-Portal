import React, { useEffect } from 'react'
import { TextField, Modal, Button, RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import "../SpecialOrders/special-orders.css"
import { errorState } from '../../helpers/error-state';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { updateInvoice } from "./SpecialOrderService";
import Notification from '../../../components/Notification';

import { Formik } from 'formik'
import * as yup from 'yup'

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


    if (specialOrder.status === "PENDING") {
        statusValues = [{ label: "AWAITING PAYMENT", value: "AWAITING_PAYMENT" }, { label: "CANCELLED", value: "CANCELLED" }, { label: "CONVERTED", value: "CONVERTED" }]
    }
    else if (specialOrder.status === "AWAITING_PAYMENT") {
        statusValues = [{ label: "PROCESSING", value: "PROCESSING" }, { label: "CANCELLED", value: "CANCELLED" }]
    }
    else if (specialOrder.status === "PROCESSING") {
        statusValues = [{ label: "COMPLETED", value: "COMPLETED" }, { label: "CANCELLED", value: "CANCELLED" }]
    }
    else if (specialOrder.status === null) {
        statusValues = [{ label: "PENDING", value: "PENDING" }]
    }



    const statusElements = statusValues.map(option => {
        return <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
            key={option.value}
        />
    })
    const [values, setValues] = React.useState(initialValues)

    useEffect(() => {
        if (specialOrder) {
            const { productName, quantity, status } = specialOrder
            setValues({ ...initialValues, productName, quantity, status })
            setButtonState('Update');
        } else {
            setValues(initialValues);
        }
    }, [specialOrder])

    const handleSubmit = async (values) => {
        const auth = JSON.parse(localStorage.getItem("auth_user"));
        if (auth.role.name === "ROLE_ADMIN" || auth.role.name === "ROLE_MANAGER") {
            let tempState = { ...values, id: specialOrder.id };
            updateInvoice(tempState).then((res) => {
                if (res.status === 200) {
                    // history.goBack()
                    handleClose();
                    refresh();
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
                                type='number'
                                variant='outlined'
                                error={Boolean(touched.address && errors.address)}
                                helperText={touched.address && errors.address}
                            />
                        </div>
                        <FormControl component="fieldset" className="w-full mb-4">
                            <h6>Edit Special Order Status</h6>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="status"
                                // value={values?.status}
                                onChange={handleChange}
                            >
                                {statusElements}
                            </RadioGroup>
                        </FormControl>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='w-full mt-4'
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
    productName: yup.string().required('Please enter a valid product name. i.e Day Old Chicks'),
    quantity: yup.number().required('Please enter a valid quantity. i.e 200'),
    status: yup.string().required('Please enter a valid status')
})

export default Editor;
