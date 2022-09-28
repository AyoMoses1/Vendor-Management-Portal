import React from 'react'
import { TextField, Modal, Button, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from 'app/components/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import http from '../../../services/api';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Formik } from 'formik';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[2],
        padding: theme.spacing(5, 4, 3),
    },
    productRender: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'red',
    },
    productRenderName: {
        width: '85%'
    },
    productRenderImage: {
        width: '15%',
        padding: '0px 5px',
    },
    productRenderImg: {
        height: '32px',

    }
}))

const AddCategories = ({
    name,
    isOpen,
    handleClose,
    categories,
    refresh,
    id,
}) => {
    const initialValues = {
        productCategories: [],
    };
    const [values, setValues] = React.useState(initialValues);
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alertData, setAlertData] = React.useState({ success: false, text: '', title: '' });
    const [open, setOpen] = React.useState(false)

    const handleModal = () => {
        setOpen(prev => !prev)
    }

    const handleSubmit = (values, { setSubmitting }) => {
        let tempState = values?.productCategories?.map(pc => { return { id: pc?.id } })
        setLoading(true);
        http.patch(`/afrimash/products/${id}/associate-categories`, tempState).then((response) => {
            setLoading(false);
            handleClose();
            refresh();
        }).catch(err => {
            setLoading(false);
        });
        // const payload = { ...state, ...values };
        // const data = new FormData();
        // const updateData = {
        //     id: state.id,
        //     name: values?.name || state.name,
        //     description: values?.description || state.description,
        //     sku: values?.sku || state.sku,
        //     translatedName: state.translatedName,
        //     productCode: state.productCode,
        //     buyPrice: state.buyPrice,
        //     rating: state.rating,
        //     price: values?.price || state.price,
        //     discountRate: values?.discountRate || state.discountRate,
        //     tags: getIdsFromArray(values?.tags) || getIdsFromArray(state.tags),
        //     shippingClass: state.shippingClass,
        //     brandId: values?.brandId || state.brandId,
        //     storeId: values?.storeId?.id || state.storeId?.id,
        //     productCategories: values?.productCategories,
        //     productType: values?.productType
        // };
        // data.append('product', JSON.stringify(payload));

        // imageList.forEach((file, imageFile) => {
        //     data.append('imageFile', file);
        // });

        // if (!isNewProduct) {
        //     updateProduct({ ...Product, ...updateData })
        //         .then((res) => {
        //             if (res.status === 200) {
        //                 setAlertData({ success: true, text: "Product created sucessfully", title: 'Product Created' })
        //                 handleDisplayModal();
        //             }
        //             else {
        //                 setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to create product' })
        //                 handleDisplayModal();
        //             };
        //         })
        //         .catch((err) => console.error(err));
        // } else {
        //     createProduct(data)
        //         .then((res) => {
        //             if (res.status === 200) {
        //                 created(res?.data?.object?.id)
        //                 closeModal();
        //             }
        //             else {
        //                 setAlertData({ success: false, text: 'Invalid details provided', title: 'Unable to create product' })
        //                 handleDisplayModal();
        //             };
        //         })
        //         .then((err) => console.error(err));
        // }

    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h4 id='simple-modal-title mb-4'>{name}</h4>
            <div className="mt-20">
                <Formik
                    initialValues={values}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
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
                            <Autocomplete
                                multiple
                                id='categories'
                                name='categories'
                                options={categories}
                                value={values.productCategories}
                                onChange={(event, newValue) => {
                                    setValues({ ...values, productCategories: newValue })
                                }}
                                getOptionLabel={
                                    (option) => {
                                        return option?.name ?? ""
                                    }
                                }
                                getOptionSelected={(option, value) => option.id === value.id}
                                renderOption={(option, { selected }) => (
                                    <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.name}
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant='outlined'
                                        label='Select Categories'
                                        placeholder='Category'
                                        fullWidth
                                        margin='normal'
                                    />
                                )}
                            />

                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className='w-full mt-4'
                                disabled={loading || !values?.productCategories?.length}
                            >
                                Add Categories
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div >
    )
    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                {body}
            </Modal>
            <Alert
                isOpen={open}
                handleModal={handleModal}
                alertData={alertData}
                handleOK={handleModal}
            />
        </div>
    )
}

export default AddCategories;
