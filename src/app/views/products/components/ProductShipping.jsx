import React, { useState, useEffect } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';

const shippingClasses = [
    {
        name: 'Rabbit Cage',
        value: 'RABBIT_CAGE',
    },
]

const ProductShipping = () => {
    const [shippingClass, setShippingClass] = useState('RABBIT_CAGE');


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
            <div className="product-details-title">Shipping</div>
            <Button variant='contained' color='primary' className='product-gallery-save-btn'>Save</Button>
        </div>
        <Grid container spacing={2} className='mt-4'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className='product-details-subs-light'>Weight (g): </div>
                <div className='product-shipping-weight mb-4'>
                    <TextField
                        onChange={(e, newValues) => { }}
                        // value={values.salesPrice}
                        name='salesPrice'
                        id='salesPrice'
                        defaultValue=''
                        margin='normal'
                        type='number'
                        variant='outlined'
                        placeholder='Enter Weight'
                        className='m-0'
                    />
                </div>
                <div className='product-details-subs-light'>Dimension (cm):</div>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                        <div className='product-shipping-weight mb-4'>
                            <TextField
                                onChange={(e, newValues) => { }}
                                // value={values.salesPrice}
                                name='salesPrice'
                                id='salesPrice'
                                defaultValue=''
                                margin='normal'
                                type='number'
                                variant='outlined'
                                placeholder='Length'
                                className='m-0'
                            />
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                        <div className='product-shipping-weight mb-4'>
                            <TextField
                                onChange={(e, newValues) => { }}
                                // value={values.salesPrice}
                                name='salesPrice'
                                id='salesPrice'
                                defaultValue=''
                                margin='normal'
                                type='number'
                                variant='outlined'
                                placeholder='Width'
                                className='m-0'
                            />
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                        <div className='product-shipping-weight mb-4'>
                            <TextField
                                onChange={(e, newValues) => { }}
                                // value={values.salesPrice}
                                name='salesPrice'
                                id='salesPrice'
                                defaultValue=''
                                margin='normal'
                                type='number'
                                variant='outlined'
                                placeholder='Height'
                                className='m-0'
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
                        value={shippingClass}
                        onChange={(e) => { }}
                    >
                        {shippingClasses.map((sc, idx) => (
                            <MenuItem key={idx} value={sc.value}>
                                {sc.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </Grid>
        </Grid>
    </Box>
}

export default ProductShipping;