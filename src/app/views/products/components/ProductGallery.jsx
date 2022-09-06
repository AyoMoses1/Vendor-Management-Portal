import React, { useState, useEffect } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { Button, Checkbox, Grid, MenuItem, TextField } from '@material-ui/core';

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

const ProductGallery = () => {
    const [productType, setProductType] = useState('SIMPLE')
    const [values, setValues] = React.useState({
        name: '',
        coupons: '',
        longDescription: '',
        weightRange: '',
        showPassword: false,
    });

    const [state, setState] = React.useState({ gilad: false });
    const { gilad } = state;

    const handleChange = (event) => {
        // setValue(event.target.value);
    };

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
        <div className='flex justify-between items-center'>
            <div className="product-details-title">Gallery</div>
            <Button variant='contained' color='primary' className='product-gallery-save-btn'>Save</Button>
        </div>
        <Grid container spacing={3} className='mt-30'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className=''>Product Images</div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                
            </Grid>
        </Grid>
    </Box>
}

export default ProductGallery;