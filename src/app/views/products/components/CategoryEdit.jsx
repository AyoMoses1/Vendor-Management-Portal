import React from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Grid, TextField } from '@material-ui/core';

const CategoryEdit = () => {
    return <Box
        component="form"
        className='product-type-box'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
    >
        <div>
            <div className="product-details-title">Category Name</div>
            <div className='w-full'>
                <Grid container spacing={1} className="category-input-container">
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
                            placeholder=''
                        />
                    </div>
                </Grid>
            </div>
        </div>

        <div style={{ marginTop: '20px' }}>
            <div className="product-details-title">Slug</div>
            <div className='w-full'>
                <Grid container spacing={1} className="category-input-container">
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
                            placeholder=''
                        />
                    </div>
                </Grid>
            </div>
        </div>
    </Box>
}

export default CategoryEdit;