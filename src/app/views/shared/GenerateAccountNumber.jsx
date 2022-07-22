import React, { useEffect, useState } from 'react'
import { TextField, Modal, Button, Grid, CircularProgress, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from 'app/components/Alert';
import { Formik } from 'formik';
import * as yup from 'yup'
import { bankCodes } from 'utils/bankCode';
import { generateAccount } from '../customers/CustomerService';

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
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(5, 4, 3),
    },
}))

const GenerateAccountNumber = ({
    customer,
    name,
    isOpen,
    handleClose,
    completed,
    setSuccessData
}) => {

    const initialValues = {
        amount: '',
        mobileNo: '',
        bankCode: '',
    }

    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });

    const [values, setValues] = React.useState(initialValues)

    const handleModal = () => {
        setAlertOpen(prev => !prev)
    }

    const handleSubmit = async (value) => {
        console.log(value);
        await generateAccount(
            value,
            setLoading,
        ).then((res) => {
            console.log(res);
            if (res && res.status == 200 && res.data) {
                setLoading(false);
                completed(res.data.object);
                setSuccessData({
                    success: true,
                    text: 'Customer should dial ' + res.data.object + ' on their registered phone number',
                    title: 'Account Generated Successfully'
                })
            } else {
                setLoading(false);
                setAlertData({ success: false, text: res?.errorMsg ?? 'Unbale to generate account', title: 'Generate Account' });
                handleModal();
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log(customer)
        if (customer) {
            initialValues.mobileNo = customer.mobileNo.length === 8 ? "234" + customer.mobileNo : customer.mobileNo;
            setValues(initialValues);
        }
    }, [customer])

    const handleAlertOK = () => { }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Alert
                isOpen={alertOpen}
                handleModal={handleModal}
                alertData={alertData}
                handleOK={handleAlertOK}
            />
            <Grid container spacing={3}>
                <h4 id='simple-modal-title'>{name}</h4>
                <p>Please provide the following information to generate payment account for {customer?.fullName}</p>
                <Grid container spacing={3}>
                    <Formik
                        initialValues={values}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                        validationSchema={customerValidations}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setSubmitting,
                            setFieldValue,
                            handleChange,
                        }) => (
                            <form className='w-full px-20 pb-30' onSubmit={handleSubmit}>
                                <div>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.mobileNo}
                                        name='mobileNo'
                                        fullWidth
                                        margin='normal'
                                        label='Phone Number'
                                        type='text'
                                        variant='outlined'
                                        error={Boolean(touched.mobileNo && errors.mobileNo)}
                                        helperText={touched.mobileNo && errors.mobileNo}
                                    />
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.amount}
                                        name='amount'
                                        margin='normal'
                                        label='Amount'
                                        type='number'
                                        fullWidth
                                        variant='outlined'
                                        error={Boolean(touched.amount && errors.amount)}
                                        helperText={touched.amount && errors.amount}
                                    />
                                    <TextField
                                        className='mb-4'
                                        name='bankCode'
                                        label='Bank'
                                        variant='outlined'
                                        margin='normal'
                                        select
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values?.bankCode}
                                        error={Boolean(touched.bankCode && errors.bankCode)}
                                        helperText={touched.bankCode && errors.bankCode}
                                    >
                                        {bankCodes.map((code, idx) => (
                                            <MenuItem key={idx} value={code.code}>
                                                {code.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <Button type='submit' variant='contained' color='primary' className='w-full' disabled={loading}>
                                    {loading ? <CircularProgress size={14} className='mr-10' /> : ''}
                                    {loading ? "Please wait..." : "Submit"}
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </Grid>

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

const phoneValidation = /^234[0-9]{10}$/

const customerValidations = yup.object().shape({
    amount: yup
        .number()
        .min(100, 'Amount cannot be lesser than 100')
        .required('Amount is required, i.e 100'),
    mobileNo: yup
        .string()
        .matches(phoneValidation, 'Please enter a valid number i.e 2348012345678')
        .required('Phone number cannot be blank'),
    bankCode: yup.string().required('Please select a Bank. i.e First Bank of Nigeria Plc'),
})

export default GenerateAccountNumber;
