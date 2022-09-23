import React, { useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, Grid } from '@material-ui/core';

const files = [
    {
        id: 1,
        file: '/assets/images/gallery1.png'
    },
    {
        id: 2,
        file: '/assets/images/gallery2.png'
    },
]

const ProductGallery = ({ product }) => {
    const [displayImage, setDisplayImage] = useState(0);
    // const [displayVideo, setDisplayVideo] = useState(0);
    const [images, setImages] = useState(files)
    const [videos, setVideos] = useState(files)

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
            <Button variant='contained' color='primary' className='product-outline-save-btn'>Save</Button>
        </div>
        <Grid container spacing={2} className='mt-4'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className='product-details-subs'>Product Images</div>
                <div className='product-gallery-images-frame'>
                    <Grid container spacing={3} style={{ marginTop: '2px' }}>
                        {images.map((_image, i) => <Grid key={i + 'image'} item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-frame'>
                                <div className='product-gallery-image-container'>
                                    <img src={_image.file} />
                                </div>
                                <div className='gallery-base'>
                                    <div onClick={() => {
                                        if (i !== displayImage)
                                            setDisplayImage(i)
                                    }} className={i === displayImage ? '' : 'action-item'}>{i === displayImage ? 'Display Photo' : 'Set as display'}</div>
                                    <img src='/assets/icon/delete-basket.svg' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>View</div>
                                </div>
                            </div>
                        </Grid>)}
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
            {/* <Grid item lg={12} md={12} sm={12} xs={12} className="mt-4 mb-4">
                <div className='product-details-subs'>Videos</div>
                <div className='product-gallery-images-frame'>
                    <Grid container spacing={3} style={{ marginTop: '2px' }}>
                        {videos.map((_video, i) => <Grid key={i + 'image'} item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-frame'>
                                <div className='product-gallery-image-container'>
                                    <img src={_video.file} />
                                </div>
                                <div className='gallery-base'>
                                    <div onClick={() => {
                                        if (i !== displayVideo)
                                            setDisplayVideo(i)
                                    }} className={i === displayVideo ? '' : 'action-item'}>{i === displayVideo ? 'Display Photo' : 'Set as display'}</div>
                                    <img src='/assets/icon/delete-basket.svg' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item'>View</div>
                                </div>
                            </div>
                        </Grid>)}
                        <Grid item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-blank'>
                                <div className='gallery-add'>
                                    <img src='/assets/icon/gallery-add.svg' />
                                    <div>Add Video</div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Grid> */}
        </Grid>
    </Box>
}

export default ProductGallery;