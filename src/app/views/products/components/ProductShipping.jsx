import React, { useEffect, useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, CircularProgress, Grid, MenuItem, TextField } from '@material-ui/core';
import { updateProduct } from '../ProductService';
import Alert from 'app/components/Alert';
import { Formik } from 'formik';
import * as yup from 'yup';
import http from '../../../services/api';

const ProductShipping = ({ product }) => {
    const [updating, setUpdating] = useState(false);
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
    const [shippingClasses, setShippingClasses] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = React.useState({
        brandId: {},
        rating: null,
        translatedName: null,
        productCode: null,
        shippingClass: '',
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
        lenght: '',
        lenghtUnit: null,
        volume: '',
        volumeUnit: null,
        weight: '',
        weightUnit: null,
        width: '',
        widthUnit: null,
        height: '',
        heightUnit: null
    });
    const [isOpen, setIsOpen] = React.useState(false)

    const handleDisplayModal = () => {
        setIsOpen(!isOpen)
    }

    const getAllShippingClasses = () => {
        setLoading(true);
        http.get('/afrimash/shipping-class').then((res) => {
            setShippingClasses(res?.data?.object);
            setLoading(false);
        });
    };

    useEffect(() => {
        if (product) {
            setValues({ ...product, shippingClass: product?.shippingClass?.id ?? '' });
            getAllShippingClasses();
        }
    }, [product])

    const handleSubmit = (items, { setSubmitting }) => {
        const _shippingClass = shippingClasses.find(s => s?.id === items?.shippingClass)
        const payload = { ...values, ...items, shippingClass: _shippingClass };
        setUpdating(true)
        updateProduct({ ...payload })
            .then((res) => {
                if (res.status === 200) {
                    setValues({ ...res?.data?.object, shippingClass: res?.data?.object?.shippingClass?.id ?? '' });
                    setUpdating(false)
                    setAlertData({ success: true, text: "Product shipping updated sucessfully", title: 'Product Shipping Updated' })
                    handleDisplayModal();
                }
                else {
                    setUpdating(false)
                    setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product shipping' })
                    handleDisplayModal();
                };
            })
            .catch((err) => {
                setUpdating(false)
                setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product shipping' })
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
                    <div className='flex justify-between items-center'>
                        <div className="product-details-title">Shipping</div>
                        <Button
                            variant='contained'
                            color='primary'
                            className='product-outline-save-btn'
                            type='submit'
                            disabled={updating}
                        >
                            {updating ? <CircularProgress size={14} className='mr-10' /> : ''}
                            {updating ? "Please wait..." : "Save"}
                        </Button>
                    </div>
                    <Grid container spacing={2} className='mt-4'>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className='product-details-subs-light'>Weight (g): </div>
                            <div className='product-shipping-weight mb-4'>
                                <TextField
                                    className='m-0'
                                    name='weight'
                                    margin='normal'
                                    type='number'
                                    variant='outlined'
                                    placeholder='Enter Weight'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.weight || ''}
                                    error={Boolean(touched.weight && errors.weight)}
                                    helperText={touched.weight && errors.weight}
                                />
                            </div>
                            <div className='product-details-subs-light'>Dimension (cm):</div>
                            <Grid container spacing={3}>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <div className='product-shipping-weight mb-4'>
                                        <TextField
                                            className='m-0'
                                            name='lenght'
                                            margin='normal'
                                            type='number'
                                            variant='outlined'
                                            placeholder='Length'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lenght || ''}
                                            error={Boolean(touched.lenght && errors.lenght)}
                                            helperText={touched.lenght && errors.lenght}
                                        />
                                    </div>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <div className='product-shipping-weight mb-4'>
                                        <TextField
                                            className='m-0'
                                            name='width'
                                            margin='normal'
                                            type='number'
                                            variant='outlined'
                                            placeholder='Width'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.width || ''}
                                            error={Boolean(touched.width && errors.width)}
                                            helperText={touched.width && errors.width}
                                        />
                                    </div>
                                </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                    <div className='product-shipping-weight mb-4'>
                                        <TextField
                                            className='m-0'
                                            name='height'
                                            margin='normal'
                                            type='number'
                                            variant='outlined'
                                            placeholder='Height'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.height || ''}
                                            error={Boolean(touched.height && errors.height)}
                                            helperText={touched.height && errors.height}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <div className='product-details-subs-light'>Shipping Class: </div>
                            <div className='product-shipping-weight mb-4'>
                                <TextField
                                    className='mt-4 ml-0 mr-0 mb-4'
                                    name='shippingClass'
                                    label='Select Shipping Class'
                                    variant='outlined'
                                    margin='normal'
                                    select
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values?.shippingClass}
                                    error={Boolean(touched.shippingClass && errors.shippingClass)}
                                    helperText={touched.shippingClass && errors.shippingClass}
                                >
                                    {shippingClasses?.map((sc, idx) => (
                                        <MenuItem key={idx} value={sc?.id}>
                                            {sc.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
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

const productSchema = yup.object().shape({
    shippingClass: yup.string().required('Shipping class is required'),
    height: yup.number().min(1).required('Height is required'),
    width: yup.number().min(1).required('Width is required'),
    lenght: yup.number().min(1).required('Length is required'),
    weight: yup.number().min(1).required('Weight is required'),
});

export default ProductShipping;