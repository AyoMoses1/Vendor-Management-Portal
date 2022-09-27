import React, { useEffect } from 'react'
import './shared.css'
import Box from '@mui/material/Box';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormControl from '@mui/material/FormControl';
import { patchProductCategory } from '../ProductService';
import Alert from 'app/components/Alert';

const CategoryEdit = ({ catergory }) => {
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
    const handleDisplayModal = () => {
        setIsOpen(!isOpen)
    }

    console.log(catergory)
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

    useEffect(() => {
        if (catergory) {
            setValues(catergory);
        }
    }, [catergory])
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
                    <FormControl variant="outlined" className='w-100'>
                        <TextField
                            className='mb-4 mx-0'
                            name='name'
                            label='Category Name'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name || ''}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                        />
                    </FormControl>
                    <FormControl variant="outlined" className='w-100'>
                        <TextField
                            className='mb-4 mx-0'
                            name='translatedName'
                            label='Slug'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.translatedName || ''}
                            error={Boolean(touched.translatedName && errors.translatedName)}
                            helperText={touched.translatedName && errors.translatedName}
                        />
                    </FormControl>
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
        <Alert
            isOpen={isOpen}
            handleModal={handleDisplayModal}
            alertData={alertData}
            handleOK={handleDisplayModal}
        />
    </Box>
}

const productSchema = yup.object().shape({
    name: yup.string().required('Category Name is required'),
    translatedName: yup.string().required('Slug is required'),
});

export default CategoryEdit;