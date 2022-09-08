import React, { useState, useEffect } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';

const shippingClasses = [
    {
        name: 'Rabbit Cage',
        value: 'RABBIT_CAGE',
    },
]

const ProductStatus = () => {
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
            <div className="product-details-title">Product Status</div>
            <Button variant='contained' color='primary' className='product-gallery-save-btn'>Update</Button>
        </div>
        <Grid container spacing={2} className='mt-4'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className='product-details-subs-light'><b>Status</b></div>
                <div className='product-shipping-weight mb-4 product-status'>
                    <TextField
                        onChange={(e, newValues) => { }}
                        // value={values.salesPrice}
                        name='salesPrice'
                        id='salesPrice'
                        defaultValue=''
                        margin='normal'
                        type='number'
                        variant='outlined'
                        placeholder='Enter Status'
                        className='m-0'
                    />
                        <Button className='product-status-save-btn'>Save</Button>

                </div>
                <div className='status-details-subs-light'>
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
                        <Grid item lg={12} md={12} sm={12} xs={12} className='status-flex'>
                            <div>Product Views:</div>
                            <div>4,235</div>
                        </Grid>
                    </Grid>
                </div>
                <Button color="primary" className='del-icon'><DeleteIcon  />Move to trash</Button>
            </Grid>
        </Grid>

    </Box>
}

export default ProductStatus;