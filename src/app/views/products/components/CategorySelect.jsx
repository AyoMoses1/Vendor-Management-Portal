import React, { useEffect, useState } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Grid, TextField, Checkbox, Button, CircularProgress } from '@material-ui/core';
import * as yup from 'yup';
import { patchProductCategory } from '../ProductService';
import { Formik } from 'formik';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';

const CategorySelect = ({ category, categories }) => {
    const [updating, setUpdating] = React.useState(false);
    const [values, setValues] = React.useState({
        commission: null,
        id: null,
        isFeatured: null,
        isFeaturedOnUssd: null,
        name: '',
        parentCategoryId: null,
        productCategoryImages: [],
        subCategories: [],
        translatedName: '',
        visible: null,
    });
    const [isOpen, setIsOpen] = React.useState(false)
    const [alertData, setAlertData] = React.useState({ success: false, text: '', title: '' });
    const [subCategories, setSubCategories] = React.useState([])
    const handleDisplayModal = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        console.log(category)
        if (category) {
            console.log(category)
            setValues(category);
        }
    }, [category])

    const handleSelect = (newValue, fieldName) => {
        if (Object.keys(values).some(key => key === fieldName)) {
            setValues({ ...values, [fieldName]: newValue });
        }
    };

    const handleSubmit = (items, { setSubmitting }) => {
        const payload = { ...values, ...items };
        console.log(payload)
        setUpdating(true)
        patchProductCategory({ ...payload })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setValues(res?.data?.object);
                    setUpdating(false)
                    setAlertData({ success: true, text: "Category details updated sucessfully", title: 'Category Details Updated' })
                    handleDisplayModal();
                }
                else {
                    setUpdating(false)
                    setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update category details' })
                    handleDisplayModal();
                };
            })
            .catch((err) => {
                console.log(err);
                setUpdating(false)
                setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to update category details' })
                handleDisplayModal();
            });

    }

    const handleSubCategory = (event, id) => {
        const checked = event.target.checked;
        if (!checked) {
            setSubCategories([...subCategories, id])
        } else {
            const _subCategories = subCategories;
            const index = _subCategories.indexOf(id);
            if (index > -1) {
                _subCategories.splice(index, 1);
            }
            setSubCategories(_subCategories);
        }
    }

    useEffect(() => {
        console.log(subCategories)
    }, [subCategories])

    return <Box
        component="form"
        className='product-type-box'
        sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
    >
        <Formik
            initialValues={values}
            onSubmit={handleSubmit}
            enableReinitialize={true}
            validationSchema={productSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className='product-details-subs-bold mb-2'>Parent Category</div>
                    <FormControl sx={{ width: '50%' }} variant="outlined">
                        <Autocomplete
                            id='parentCategoryId'
                            options={categories.filter(item => item?.name)}
                            name='parentCategoryId'
                            value={values.parentCategoryId}
                            getOptionLabel={(option) => {
                                return option?.name ?? ""
                            }}
                            getOptionSelected={(option, value) => {
                                return option.id === value
                            }}
                            onChange={(event, newValue) =>
                                handleSelect(newValue, 'parentCategoryId')
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    className='mx-0'
                                    variant='outlined'
                                    label='Select Parent Category'
                                    margin='normal'
                                />
                            )}
                        />
                    </FormControl>

                    <div className='product-details-subs-bold mt-30 mb-2'>Sub-Categories</div>
                    {
                        values?.subCategories?.length > 0 ?
                            values?.subCategories?.map((scwp, idx) =>
                                <FormControl key={idx + 'scwp'}>
                                    <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => handleSubCategory(e, scwp?.id)} />} label={scwp?.name} className='product-checkbox' />
                                </FormControl>
                            ) : <div style={{ marginTop: '30px', marginLeft: '12px', marginBottom: '30px' }}>No sub-categories</div>
                    }
                    <div className='button-flex'>
                        <Button
                            variant='contained'
                            color='primary'
                            className='product-gallery-save-btn'
                            type='submit'
                            disabled={updating}
                        >
                            {updating ? <CircularProgress size={14} className='mr-10' /> : ''}
                            {updating ? "Please wait..." : "Save"}
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    </Box>
}

const productSchema = yup.object().shape({});

export default CategorySelect;