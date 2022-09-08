import React, { useState, useEffect } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Checkbox, Grid, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
const productAttributes = [
    {
        type: 'Simple',
        value: 'SIMPLE',
    },
    {
        type: 'Complex',
        value: 'COMPLEX',
    },
]

const ProductSpecification = () => {
    const [productAttribute, setProductAttribute] = useState('SIMPLE')
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
        <div className="product-details-title">Product Specification</div>
        <Grid container spacing={1} className='mt-30'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid container spacing={1} className="product-type-input-container">
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <div className='product-specification'>
                            <TextField
                                className='mb-4'
                                name='productAttribute'
                                variant='outlined'
                                margin='normal'
                                select
                                fullWidth
                                value={productAttribute} 
                                onChange={(e) => { }}
                            >
                                {productAttributes.map((type, idx) => (
                                    <MenuItem key={idx} value={type.value}>
                                        {type.type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className='product-color-section'>
                <div className="product-details-title">Colour</div>
                <div className='title-divider'></div>
                <Grid container spacing={1} className="product-type-input-container">
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                        <div className='product-specification'>
                           <div className='color-title'>Name:</div>
                           <label className='section-title'>Colour</label>
                           <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Visible on the product page" className='product-checkbox' />
                                <FormControlLabel control={<Checkbox />} label="Used for variation" />
                            </FormGroup>
                        </div>
                    </Grid>
                    <Grid item lg={8} md={8} sm={6} xs={12}>
                        <div className='product-specification'>
                        <div className='color-title'>Value(s)</div>
                            {/* <TextField
                                className='mb-4'
                                name='productAttribute'
                                variant='outlined'
                                margin='normal'
                                select
                                fullWidth
                                value={productAttribute} 
                                onChange={(e) => { }}
                            >
                                {productAttributes.map((type, idx) => (
                                    <MenuItem key={idx} value={type.value}>
                                        {type.type}
                                    </MenuItem>
                                ))}
                            </TextField> */}
                        </div>
                    </Grid>
                </Grid>
            </Grid>


                {/* <Grid container spacing={1} className="product-type-input-container">
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
                </Grid> */}
        </Grid>
    </Box>
}

export default ProductSpecification;