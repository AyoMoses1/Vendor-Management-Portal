import React, { useEffect } from 'react'
import { TextField, Modal, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { debounce } from "lodash";
import Notification from '../../../components/Notification';
import Alert from 'app/components/Alert';
import { Autocomplete } from '@mui/material';
import { getAllProducts } from '../ProductService';
import http from '../../../services/api';

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

function AddProduct({
    name,
    isOpen,
    handleClose,
    refresh,
    categoryId,
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [products, setProducts] = React.useState([]);
    const [alertData, setAlertData] = React.useState({ success: false, text: '', title: '' });
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(null);

    const handleModal = () => {
        setOpen(prev => !prev)
    }


    const addProduct = async () => {
        let tempState = [{ id: categoryId }];
        setLoading(true);
        http.patch(`/afrimash/products/${value?.id}/associate-categories`, tempState).then((response) => {
            setLoading(false);
            setValue('');
            handleClose();
            refresh();
        }).catch(err => {
            setLoading(false);
        });
    }

    const debouncedProducts = debounce(async (value) => {
        if (value.length > 0) {
            const response = await getAllProducts(value)
            setProducts(formatProducts(response?.content))
        } else {
            const response = await getAllProducts('')
            setProducts(formatProducts(response?.content))
        }
    }, 700);

    const performSearch = (value) => {
        debouncedProducts(value);
    };

    const formatProducts = (items) => {
        const pros = items?.length ? items.map(it => {
            return {
                id: it?.id,
                name: it?.name,
                image: it?.productImages?.length ? it?.productImages[0]?.imageUrl : null
            }
        }) : []
        return pros;
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h4 id='simple-modal-title mb-4'>{name}</h4>
            {severity === 'error' && (
                <Notification alert={alert} severity={severity || ''} />
            )}


            <div className="mt-20">
                <Autocomplete
                    options={products}
                    getOptionLabel={(option) => option?.name}
                    renderInput={(params) =>
                        <TextField
                            fullWidth
                            {...params}
                            label='Search Product'
                            variant='outlined'
                            value={value}
                            onChange={({ target: { value } }) => {
                                performSearch(value)
                            }
                            } />
                    }
                    renderOption={(props, option, state) => {
                        return (
                            <div className={classes.productRender} {...props} key={`${option?.name}: ${option?.id}`}>
                                <div className={classes.productRenderName}>{option?.name}</div>
                                <div className={classes.productRenderImage}><img className={classes.productRenderImg} src={option?.image ?? "/assets/images/Afrimash.svg"} /></div>
                            </div>
                        );
                    }}
                    onChange={(event, value) => setValue(value)}
                />

                <Button
                    type='button'
                    variant='contained'
                    color='primary'
                    className='w-full mt-4'
                    disabled={loading || !value}
                    onClick={addProduct}
                >
                    Add Product
                </Button>
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

export default AddProduct;
