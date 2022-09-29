import React, { useEffect, useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import { Lightbox } from "react-modal-image";
import { patchProductCategory } from '../ProductService';
import Alert from 'app/components/Alert';
import http from '../../../services/api';

const CategoryImage = ({ category, invoke }) => {
    const [displayImage, setDisplayImage] = useState(0);
    const [images, setImages] = useState([])
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [boxState, setBoxState] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [updating, setUpdating] = useState(false);
    const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
    const [isOpen, setIsOpen] = React.useState(false)
    const [values, setValues] = React.useState();
    const hiddenFileInput = React.useRef(null);

    const handleDisplayModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (category) {
            setImages(category?.productCategoryImages)
            setValues({ ...category })
        }
    }, [category])

    const handleBoxState = () => {
        setBoxState(!boxState);
    }

    const handleSetImage = (file) => {
        setImage(file.imageUrl);
        setPreview(file.id);
        handleBoxState();
    }

    const handleSubmit = () => {
        const payload = { ...values };
        setUpdating(true)
        patchProductCategory({ ...payload })
            .then((res) => {
                if (res.status === 200) {
                    setValues(res?.data?.object);
                    setImages(res?.data?.object?.productCategoryImages)
                    setUpdating(false)
                    setAlertData({ success: true, text: "Category images updated sucessfully", title: 'Category Image Updated' })
                    handleDisplayModal();
                }
                else {
                    setUpdating(false)
                    setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update category image' })
                    handleDisplayModal();
                };
            })
            .catch((err) => {
                setUpdating(false)
                setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update category image' })
                handleDisplayModal();
            });

    }

    const deleteImage = async (id) => {
        await http.delete_new(`/afrimash/product-categories/image/${id}/remove`).then(res => {
            if (res.status === 200) {
                setLoading(false);
                setAlertData({ success: true, text: "Category image removed sucessfully", title: 'Category Image Removed' })
                handleDisplayModal();
                invoke();
            }
            else {
                setLoading(false);
                setAlertData({ success: false, text: 'Unable to delete image', title: 'Failed' })
                handleDisplayModal();
            };
        }).catch(err => {
            setLoading(false);
            setAlertData({ success: false, text: 'Unable to delete image', title: 'Failed' })
            handleDisplayModal();
        })
    }

    const handleClick = event => {
        if (!loading) {
            hiddenFileInput.current.click();
        }
    };

    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        setLoading(true);
        const formData = new FormData();
        formData.append('image-file', fileUploaded);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        await http.post_new(`/afrimash/product-categories/image?productCategoryId=${category?.id}`, formData, config).then(res => {
            if (res.status === 200) {
                setLoading(false);
                invoke();
            }
            else {
                setLoading(false);
            };
        }).catch(err => {
            setLoading(false);
        })
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
            <div className="product-details-title">Category Image</div>
            <Button
                variant='contained'
                color='primary'
                className='product-outline-save-btn'
                onClick={handleSubmit}
                disabled={updating}
            >
                {updating ? <CircularProgress size={14} className='mr-10' /> : ''}
                {updating ? "Please wait..." : "Save"}
            </Button>
        </div>
        <Grid container spacing={2} className='mt-4 mb-4'>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className='product-gallery-images-frame'>
                    <Grid container spacing={3} style={{ marginTop: '2px' }}>
                        {images.map((_image, i) => <Grid key={i + 'image'} item lg={4} md={4} sm={4} xs={4}>
                            <div className='product-gallery-image-frame'>
                                <div className='product-gallery-image-container'>
                                    <img src={_image.imageUrl} />
                                </div>
                                <div className='gallery-base'>
                                    <div onClick={() => {
                                        if (i !== displayImage)
                                            setDisplayImage(i)
                                    }} className={i === displayImage ? '' : 'action-item'}>{i === displayImage ? 'Display Photo' : 'Set as display'}</div>
                                    <img onClick={() => deleteImage(_image?.id)} src='/assets/icon/delete-basket.svg' />
                                </div>
                                <div className='gallery-base'>
                                    <div className='action-item' onClick={() => handleSetImage(_image)}>View</div>
                                </div>
                                {
                                    boxState && preview === _image?.id && <Lightbox
                                        large={image}
                                        alt="Product Image"
                                        onClose={handleBoxState}
                                    />
                                }
                            </div>
                        </Grid>)}
                        <Grid item lg={4} md={4} sm={4} xs={4} onClick={handleClick}>
                            <div className='product-gallery-image-blank'>
                                <div className='gallery-add'>
                                    {loading ? <CircularProgress size={24} /> : <><img src='/assets/icon/gallery-add.svg' /> <div>Add Image</div></>}
                                </div>
                            </div>
                        </Grid>
                        <input
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                    </Grid>
                </div>
            </Grid>
        </Grid>
        <Alert
            isOpen={isOpen}
            handleModal={handleDisplayModal}
            alertData={alertData}
            handleOK={handleDisplayModal}
        />
    </Box>
}

export default CategoryImage;