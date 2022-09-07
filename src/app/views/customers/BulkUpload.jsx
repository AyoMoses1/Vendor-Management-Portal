import React, { useState } from 'react'
import { TextField, Modal, Button, Grid, InputLabel, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import "./customer-view.css";
import http from '../../services/api';
import Alert from 'app/components/Alert';
import { Formik } from 'formik';
import * as yup from 'yup'
import Sample from './Sample.csv';

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

function BulkUpload({
    name,
    isOpen,
    handleClose,
    completed,
    setSuccessData
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [file, setFile] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
    const initialValues = {
        email: '',
        csvfile: '',
    }

    const [values, setValues] = React.useState(initialValues)

    const handleModal = () => {
        setAlertOpen(prev => !prev)
    }

    const handleSubmit = async (value) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('csvfile', file);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        try {
            const res = await http.post_new(`/afrimash/customers/bulkcreate?notifyEmail=${value.email}`, formData, config);
            setSuccessData({ success: true, text: "A notification would be sent to the provided email when completed", title: 'Upload in progress' })
            completed()
            handleClose();
            setLoading(false);
        } catch (err) {
            setLoading(false);
            if (err.response) {
                setAlertData({ success: false, text: err.response.data.error ?? 'Invalid details provided', title: 'Unable to process data' })
                handleModal();
                setLoading(false);
            }
        }
    }

    const handleOK = () => { }

    const fileUploadHandler = async (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Grid container spacing={3}>
                <h4 id='simple-modal-title'>{name}</h4>
                <p style={{ lineHeight: 'unset' }}>Upload a csv file that contains the following columns firstname, surname, gender, phonenumber, email, state, age. <a href={Sample} download="Sample.csv" style={{ color: "#FFAF0F" }}> Download Sample</a></p>
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
                                    <Grid item sm={12} xs={12}>
                                        <InputLabel htmlFor='bootstrap-input'>
                                            Choose a CSV file
                                        </InputLabel>
                                        <TextField
                                            className='mb-4 mr-4'
                                            name='csvfile'
                                            type='file'
                                            fullWidth
                                            variant='outlined'
                                            margin='normal'
                                            inputProps={{ accept: ".csv" }}
                                            aria-required='true'
                                            onChange={(e) => { handleChange(e); fileUploadHandler(e) }}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.csvfile && errors.csvfile)}
                                            helperText={touched.csvfile && errors.csvfile}
                                            value={values.csvfile}
                                        />
                                    </Grid>

                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        name='email'
                                        fullWidth
                                        margin='normal'
                                        label='Notification Email Address'
                                        type='email'
                                        variant='outlined'
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <Grid item container justifyContent='center' alignItems='center'>
                                        <Button
                                            className='w-220 mt-40'
                                            disabled={loading}
                                            variant='contained'
                                            color='primary'
                                            onClick={() => {
                                                handleSubmit()
                                            }}
                                        >
                                            {loading ? <CircularProgress size={14} className='mr-10' /> : ''}
                                            {loading ? "Uploading" : "Upload"}
                                        </Button>
                                        <Alert
                                            isOpen={alertOpen}
                                            handleModal={handleModal}
                                            alertData={alertData}
                                            handleOK={handleOK}
                                        />
                                    </Grid>
                                </div>
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

const customerValidations = yup.object().shape({
    email: yup.string().email('Please enter a valid email address.').required('Notification Email is required'),
    csvfile: yup.mixed().required('File is required'),
})

export default BulkUpload;
