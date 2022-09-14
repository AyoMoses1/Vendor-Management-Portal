import React from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Checkbox, Button, Grid } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ProductCategory = () => {
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
            <div className="product-details-title">Product Category</div>
            <Button variant='contained' color='primary' className='product-outline-save-btn'>Save</Button>
        </div>
        <Grid container spacing={2} className='mt-4'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Primary Category" className='product-checkbox' />
                    <FormControlLabel control={<Checkbox />} label="Primary Category" className='product-checkbox' />
                </FormGroup>
                {/* <Button color="primary" className='del-icon'><DeleteIcon  />Move to trash</Button> */}
            </Grid>
        </Grid>

    </Box>
}

export default ProductCategory;