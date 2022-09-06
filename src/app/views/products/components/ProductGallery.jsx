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
        <Grid container spacing={2} className='mt-4'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className='product-details-subs'>Product Images</div>
                <div className='product-gallery-images-frame'>
                    <Grid container spacing={3} style={{ marginTop: '2px' }}>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-frame'>
                                <div className='product-gallery-image-container'>
                                    <img src='/assets/images/gallery1.png' />
                                </div>
                                <div className='gallery-base'>
                                    <div>Display Photo</div>
                                    <img src='/assets/icon/delete-basket.svg' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>View</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-frame'>
                                <div className='product-gallery-image-container'>
                                    <img src='/assets/images/gallery2.png' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>Set as display</div>
                                    <img src='/assets/icon/delete-basket.svg' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>View</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-blank'>
                                <div className='gallery-add'>
                                    <img src='/assets/icon/gallery-add.svg' />
                                    <div>Add Image</div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className="mt-4 mb-4">
                <div className='product-details-subs'>Videos</div>
                <div className='product-gallery-images-frame'>
                    <Grid container spacing={3} style={{ marginTop: '2px' }}>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-frame'>
                                <div className='product-gallery-image-container'>
                                    <img src='/assets/images/gallery1.png' />
                                </div>
                                <div className='gallery-base'>
                                    <div>Display Photo</div>
                                    <img src='/assets/icon/delete-basket.svg' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>View</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-frame'>
                                <div className='product-gallery-image-container'>
                                    <img src='/assets/images/gallery2.png' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>Set as display</div>
                                    <img src='/assets/icon/delete-basket.svg' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>View</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-blank'>
                                <div className='gallery-add'>
                                    <img src='/assets/icon/gallery-add.svg' />
                                    <div>Add Image</div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    </Box>
}

export default ProductGallery;