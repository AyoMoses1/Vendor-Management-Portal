import React, { useEffect, useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, Checkbox, CircularProgress, Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import { updateProduct } from '../ProductService';
import Alert from 'app/components/Alert';

const productTypes = ['EXTERNAL', 'GROUPED', 'SIMPLE', 'VARIANT'];

const ProductType = ({ product }) => {
    const [updating, setUpdating] = useState(false);
    const [state, setState] = React.useState({ gilad: false });
    const { gilad } = state;
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
    });
    const [isOpen, setIsOpen] = React.useState(false)

    const handleDisplayModal = () => {
        setIsOpen(!isOpen)
    }

    const handleCheck = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    useEffect(() => {
        console.log(product)
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
                    setAlertData({ success: true, text: "Product updated sucessfully", title: 'Product Updated' })
                    handleDisplayModal();
                }
                else {
                    setUpdating(false)
                    setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update product' })
                    handleDisplayModal();
                };
            })
            .catch((err) => console.error(err));
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
        <div className="product-details-title">Product Type</div>
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
                    <Grid container spacing={3} className='mt-20'>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <Grid container spacing={1} className="product-type-input-container">
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <div className='product-type-input-label'>Type</div>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12}>
                                    <div className='product-types'>
                                        <TextField
                                            className='mb-4'
                                            name='productType'
                                            label='Select Type'
                                            variant='outlined'
                                            margin='normal'
                                            select
                                            fullWidth
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.productType || ''}
                                            error={Boolean(touched.productType && errors.productType)}
                                            helperText={touched.productType && errors.productType}
                                        >
                                            {productTypes.map((type, idx) => (
                                                <MenuItem key={idx} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} className="product-type-input-container">
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <div className='product-type-input-label'>Regular Price</div>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12}>
                                    <div className='product-types'>
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <img src="/assets/icon/naira.svg" alt="naira" style={{ height: '32px' }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            disabled
                                            name='buyPrice'
                                            margin='normal'
                                            type='number'
                                            variant='outlined'
                                            placeholder='Enter Price'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.buyPrice || ''}
                                            error={Boolean(touched.buyPrice && errors.buyPrice)}
                                            helperText={touched.buyPrice && errors.buyPrice}
                                        />
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} className="product-type-input-container">
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <div className='product-type-input-label'>Sale Price</div>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} className={"salesPrice"}>
                                    <div className='product-types mb-4'>
                                        <TextField
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <img src="/assets/icon/naira.svg" alt="naira" style={{ height: '32px' }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                            name='price'
                                            margin='normal'
                                            type='number'
                                            variant='outlined'
                                            placeholder='Enter Price'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.price || ''}
                                            error={Boolean(touched.price && errors.price)}
                                            helperText={touched.price && errors.price}
                                        />
                                    </div>
                                    <div className='schedule'>Schedule</div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} className="product-type-input-container">
                                <Grid item lg={3} md={3} sm={12} xs={12}>
                                    <div className='product-type-input-label'>Discount</div>
                                </Grid>
                                <Grid item lg={9} md={9} sm={12} xs={12} className={""}>
                                    <div className='product-types mb-4'>
                                        <TextField
                                            name='discountRate'
                                            margin='normal'
                                            type='number'
                                            variant='outlined'
                                            placeholder='Enter Discount Rate'
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.discountRate || ''}
                                            error={Boolean(touched.discountRate && errors.discountRate)}
                                            helperText={touched.discountRate && errors.discountRate}
                                        />
                                    </div>
                                    <div className='schedule'>Schedule</div>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Grid container spacing={1} className='mt-2'>
                                <Grid item lg={12} md={12} sm={12} xs={12} className="product-type-input-end child-action">
                                    <Checkbox
                                        checked={gilad}
                                        onChange={handleCheck('gilad')}
                                        value="gilad"
                                    />
                                    <label>Virtual Product</label>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} className="product-type-input-end product-type-download child-action">
                                    <img src="/assets/icon/attachment.svg" alt="attachment" />
                                    <label className='cursor-pointer'>Add Download</label>
                                    <div>Name of Attached file.pdf</div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className='button-flex'>
                        <Button
                            variant='contained'
                            color='primary'
                            className='product-gallery-save-btn'
                            type='submit'
                            disabled={updating}
                        >
                            {updating ? <CircularProgress size={14} className='mr-10' /> : ''}
                            {updating ? "Please wait..." : "Save"}
                        </Button>
                    </div>
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
    name: yup.string().required('Name is required'),
    price: yup.number().required('Price is required'),
    description: yup
        .string()
        .min(10)
        .required('Please enter a description of atleast 10 chars long'),
});

export default ProductType;