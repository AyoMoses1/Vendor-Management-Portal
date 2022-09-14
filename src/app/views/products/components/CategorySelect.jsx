import React, { useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Grid, MenuItem, TextField, Checkbox } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const categories = [
    {
        name: 'Category 1',
        value: 'CATERGORY_1',
    },
    {
        name: 'Category 2',
        value: 'CATERGORY_2',
    },
]

const CategorySelect = () => {
    const [category, setCategory] = useState('CATERGORY_1');

    return <Box
        component="form"
        className='product-type-box'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
    >
        <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className='product-details-subs-bold'>Parent Category</div>
                <Grid container spacing={3} className="category-area">
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className='product-shipping-weight'>
                            <TextField
                                className='ml-0 mr-0'
                                name='shippingClass'
                                label='Select Parent Category'
                                variant='outlined'
                                margin='normal'
                                select
                                fullWidth
                                value={category}
                                onChange={(e) => { }}
                            >
                                {categories.map((ct, idx) => (
                                    <MenuItem key={idx} value={ct.value}>
                                        {ct.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} className="category-checkbox">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Set as Parent Category" className='product-checkbox' />
                        </FormGroup>
                    </Grid>
                </Grid>

                <div className='w-full' style={{ marginTop: '20px' }}>
                    <div className='product-details-subs-bold'>Description</div>
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
                                multiline
                                rows={8}
                                maxRows={10}
                            />
                        </div>
                    </Grid>
                </div>
            </Grid>
        </Grid>

    </Box>
}

export default CategorySelect;