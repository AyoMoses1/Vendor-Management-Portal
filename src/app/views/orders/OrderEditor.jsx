import React, { useEffect } from 'react'
import { TextField, Modal, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { errorState } from '../helpers/error-state';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { getInvoiceById, updateInvoice } from "./OrderService";

import Notification from '../../components/Notification';

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


function OrderEditor({
    name,
    isOpen,
    order,
    handleClose,
    toggleOrderEditor,
    orderSource
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [buttonState, setButtonState] = React.useState('Add');
    const [error, setError] = React.useState("");
    const [address, setAddress] = React.useState("")


    useEffect(() => {
        if (order) {
            orderSource == 'ADMIN' ?
                setAddress(order.customerId.deliveryAddresses[0]?.address ?? "") :
                orderSource == 'AGENT_APP' ?
                    setAddress(order?.deliveryAddress?.address ?? "") :
                    setAddress(order?.customerId?.address ?? "")
            setButtonState('Update');

        }
    }, [order])

    const handleSubmit = async (values) => {
        const auth = JSON.parse(localStorage.getItem("auth_user"));
        if (auth.role.name === "ROLE_ADMIN" || auth.role.name === "ROLE_MANAGER") {
            let tempState = { deliveryAddresses: values.address, id: order.id };
            updateInvoice(tempState).then((res) => {
                if (res.status === 200) {
                    handleClose();
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
                initialValues={{ address }}
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
                    <form>
                        <div>
                            <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}

                                value={values.address}
                                name='address'
                                margin='normal'
                                fullWidth
                                label='Shipping Address'
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
                            className='mt-4'
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            Update Order
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            className='mt-4 mx-4'
                            disabled={loading}
                            onClick={() => toggleOrderEditor()}
                        >
                            Cancel
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
    address: yup.string().required('Address is required')
})

export default OrderEditor;
