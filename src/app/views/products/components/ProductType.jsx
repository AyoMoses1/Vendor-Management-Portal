import React, { useState, useEffect } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { Grid, MenuItem, TextField } from '@material-ui/core';

const productTypes = [
    {
        type: 'Simple',
        value: 'SIMPLE',
    },
    {
        type: 'Complex',
        value: 'COMPLEX',
    },
]

const ProductType = () => {
    const [productType, setProductType] = useState('SIMPLE')
    const [values, setValues] = React.useState({
        name: '',
        coupons: '',
        longDescription: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (event) => {
        // setValue(event.target.value);
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
        <Grid container spacing={3} className='mt-30'>
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
                                value={productType}
                                onChange={(e) => { }}
                            >
                                {productTypes.map((type, idx) => (
                                    <MenuItem key={idx} value={type.value}>
                                        {type.type}
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
                                onChange={(e, newValues) => { }}
                                // value={values.regularPrice}
                                name='regularPrice'
                                id='regularPrice'
                                defaultValue=''
                                margin='normal'
                                type='text'
                                variant='outlined'
                                placeholder='Enter Price'
                            />
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className="product-type-input-container">
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className='product-type-input-label'>Sale Price</div>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <div className='product-types'>
                            <TextField
                                onChange={(e, newValues) => { }}
                                // value={values.salesPrice}
                                name='salesPrice'
                                id='salesPrice'
                                defaultValue=''
                                margin='normal'
                                type='text'
                                variant='outlined'
                                placeholder='Enter Price'
                            />
                        </div>
                        <div className='flex flex-end mb-2'>
                            <small style={{fontSize: '10px'}}>Schedule</small>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className="product-type-input-container">
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className='product-type-input-label'>Coupons</div>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                        <div className='product-types'>
                            <TextField
                                onChange={(e, newValues) => { }}
                                // value={values.coupons}
                                name='coupons'
                                id='coupons'
                                defaultValue=''
                                margin='normal'
                                type='text'
                                variant='outlined'
                                placeholder='Enter Coupon Code'
                            />
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item lg={3} md={3} sm={12} xs={12}>
                <Grid container spacing={1} className='mt-4'>
                    <Grid item lg={12} md={12} sm={12} xs={12} className="product-type-input-end">
                        <label>Virtual Product</label>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} className="product-type-input-end mt-4">
                        <label>Add Download</label>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
}

export default ProductType;