import React, { useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';

const statuses = [
    {
        name: 'Draft',
        value: 'DRAFT',
    },
]

const CategoryStatus = () => {
    const [status, setStatus] = useState('DRAFT');

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
            <div className="product-details-title">Category Status</div>
            <Button variant='contained' color='primary' className='product-gallery-save-btn'>Update</Button>
        </div>
        <Grid container spacing={2} className='mt-4'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className='product-details-subs-bold'>Status</div>
                <div className='product-status'>
                    <div className='w-full attributes-container'>
                        <TextField
                            className='ml-0 mr-0'
                            name='shippingClass'
                            label='Select Status'
                            variant='outlined'
                            margin='normal'
                            select
                            fullWidth
                            value={status}
                            onChange={(e) => { }}
                        >
                            {statuses.map((sc, idx) => (
                                <MenuItem key={idx} value={sc.value}>
                                    {sc.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <Button variant='contained' color='primary' className='product-outline-save-btn'>Save</Button>
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
                            <div>Category Views:</div>
                            <div>4,235</div>
                        </Grid>
                    </Grid>
                </div>
                <Button color="primary" className='del-icon'><img src="/assets/icon/trash-can.svg" alt="trash" />Move to trash</Button>
            </Grid>
        </Grid>

    </Box>
}

export default CategoryStatus;