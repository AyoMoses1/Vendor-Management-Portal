import React, { useEffect, useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, CircularProgress, Grid, MenuItem, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import { updateProduct } from '../ProductService';
import Alert from 'app/components/Alert';

const statuses = ['APPROVED', 'DRAFT', 'PUBLISHED', 'ASSIGNED', 'PRIVATE', 'PENDING'];

const ProductStatus = ({ product }) => {
    const [updating, setUpdating] = useState(false);
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
    const [values, setValues] = React.useState({
        brandId: {},
        rating: null,
        translatedName: null,
        productCode: null,
        shippingClass: {},
        storeId: {},
        productType: '',
        discountRate: '',
        tags: [],
        productCategories: [],
        price: '',
        sku: '',
        name: '',
        description: '',
        buyPrice: '',
        status: '',
    });
    const [isOpen, setIsOpen] = React.useState(false)

    const handleDisplayModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (product) {
            setValues(product);
        }
    }, [product])

    const handleSubmit = (items, { setSubmitting }) => {
        const payload = { ...values, ...items };
        setUpdating(true)
        updateProduct({ ...payload })
            .then((res) => {
                if (res.status === 200) {
                    setValues(res?.data?.object);
                    setUpdating(false)
                    setAlertData({ success: true, text: "Product status updated sucessfully", title: 'Product Status Updated' })
                    handleDisplayModal();
                }
                else {
                    setUpdating(false)
                    setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product status' })
                    handleDisplayModal();
                };
            })
            .catch((err) => {
                setUpdating(false)
                setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product status' })
                handleDisplayModal();
            });
    };

    return <Box
        component="form"
        className='product-type-box'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
    >
        <div className='flex justify-between items-center'>
            <div className="product-details-title">Product Status</div>
            {/* <Button variant='contained' color='primary' className='product-gallery-save-btn'>Update</Button> */}
        </div>
        <Formik
            initialValues={values}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={productSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} className='mt-4'>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className='product-details-subs-bold'>Status</div>
                            <div className='product-status'>
                                <div className='w-full attributes-container'>
                                    <TextField
                                        className='ml-0 mr-0'
                                        name='status'
                                        label='Select Status'
                                        variant='outlined'
                                        margin='normal'
                                        select
                                        fullWidth
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.status || ''}
                                        error={Boolean(touched.status && errors.status)}
                                        helperText={touched.status && errors.status}
                                    >
                                        {statuses.map((sc, idx) => (
                                            <MenuItem key={idx} value={sc}>
                                                {sc}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className='product-outline-save-btn'
                                    type='submit'
                                    disabled={updating}
                                >
                                    {updating ? <CircularProgress size={14} className='mr-10' /> : ''}
                                    {updating ? "Saving" : "Save"}
                                </Button>
                            </div>
                            <div className='product-details-subs-light'>
                                <Grid container spacing={2} className='mt-4'>
                                    <Grid item lg={12} md={12} sm={12} xs={12} className='status-flex'>
                                        <div>Date Created: </div>
                                        <div>12:01AM 27/3/2022</div>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} className='status-flex'>
                                        <div>Created by: </div>
                                        <div>@Juliet</div>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} className='status-flex'>
                                        <div>Last Edited: </div>
                                        <div>12:01AM 27/3/2022 by @IgeAbdulla</div>
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12} className='status-flex no-border'>
                                        <div>Product Views:</div>
                                        <div>4,235</div>
                                    </Grid>
                                </Grid>
                            </div>
                            <Button color="primary" className='del-icon'><img src="/assets/icon/trash-can.svg" alt="trash" />Move to trash</Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
        <Alert
            isOpen={isOpen}
            handleModal={handleDisplayModal}
            alertData={alertData}
            handleOK={handleDisplayModal}
        />
    </Box>
}

const productSchema = yup.object().shape({});

export default ProductStatus;