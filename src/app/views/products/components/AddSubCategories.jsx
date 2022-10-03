import React, { useEffect } from 'react'
import { TextField, Modal, Button, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from 'app/components/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Formik } from 'formik';
import { patchProductCategory } from '../ProductService';
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

const AddSubCategories = ({
    name,
    isOpen,
    handleClose,
    categories,
    refresh,
    category,
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
        let tempState = {
            ...category, subCategories: [...category?.subCategories, ...values?.productCategories?.map(pc => {
                return {
                    id: pc?.id,
                    isFeatured: pc?.isFeatured,
                    name: pc?.name,
                    productCategoryImages: pc?.productCategoryImages,
                    translatedName: pc?.translatedName,
                    visible: pc?.visible
                }
            })]
        };
        setLoading(true);
        patchProductCategory({ ...tempState })
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    setValues(initialValues);
                    handleClose();
                    refresh();
                }
                else {
                    setLoading(false);
                    setAlertData({ success: false, text: res?.errorMsg ?? 'Invalid details provided', title: 'Unable add categories' })
                    handleModal();
                };
            })
            .catch((err) => {
                setLoading(false);
                setAlertData({ success: false, text: err?.errorMsg ?? 'Invalid details provided', title: 'Unable add categories' })
                handleModal();
            });
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h5 id='simple-modal-title mb-4'>{name}</h5>
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

export default AddSubCategories;
