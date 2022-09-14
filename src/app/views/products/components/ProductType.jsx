import React, { useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Checkbox, Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';

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
    const [state, setState] = React.useState({ gilad: false });
    const { gilad } = state;

    const handleCheck = name => event => {
        setState({ ...state, [name]: event.target.checked });
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img src="/assets/icon/naira.svg" alt="naira" style={{ height: '32px' }} />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(e, newValues) => { }}
                                // value={values.regularPrice}
                                name='regularPrice'
                                id='regularPrice'
                                defaultValue=''
                                margin='normal'
                                type='number'
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
                                onChange={(e, newValues) => { }}
                                // value={values.salesPrice}
                                name='salesPrice'
                                id='salesPrice'
                                defaultValue=''
                                margin='normal'
                                type='number'
                                variant='outlined'
                                placeholder='Enter Price'
                            />
                        </div>
                        <div className='schedule'>Schedule</div>
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
    </Box>
}

export default ProductType;