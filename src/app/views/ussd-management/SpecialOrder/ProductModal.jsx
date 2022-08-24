import React, { useEffect } from 'react'
import {Modal, Button, RadioGroup, FormControl, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import "../SpecialOrders/special-orders.css"
import { errorState } from '../../helpers/error-state';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { updateInvoice } from "./SpecialOrderService";
import Notification from '../../../components/Notification';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { Formik } from 'formik'
import * as yup from 'yup'
import { searchProductsByKeyword } from 'app/views/products/ProductService';


function getModalStyle() {
    const top = 30 
    const left = 50 

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        // border: '1px solid red',
        borderRadius: '10px',
        boxShadow: theme.shadows[2],
        // padding: theme.spacing(5, 4, 3),
    },
}))

const initialValues = {
    productName: '',
}




function ProductModal({
    name,
    isOpen,
    specialOrder,
    handleClose,
    refresh
}) {
    const classes = useStyles()
    const [modalStyle] = React.useState(getModalStyle)
    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState('')
    const [severity, setSeverity] = React.useState('')
    const [buttonState, setButtonState] = React.useState('Add');
    const [error, setError] = React.useState("");
    const [products, setProducts] = React.useState([])
   
    const history = useHistory();

    const [values, setValues] = React.useState(initialValues)

    useEffect(() => {
        if (specialOrder) {
            const { productName, quantity, status } = specialOrder
            setValues({ ...initialValues, productName, quantity, status, ...specialOrder })
            setButtonState('Update');
        } else {
            setValues(initialValues);
        }
    }, [specialOrder])

    const handleChange = async(term) => {
      const searchedProducts = await searchProductsByKeyword(term);
      setProducts(searchedProducts.content)
    }
    

    const handleRedirect = (value) => {
     history.push({
      pathname: '/product/details',
      state: {id: value.id}
     })
      console.log(value.id)
    }

    
    const body = (
        <Autocomplete
            id="country-select-demo"
            noOptionsText={'Product not found'}
            onChange={(event,value) => handleRedirect(value)}
            sx={{ width: 700 }}
            style={modalStyle}
            className={classes.paper}
            options={products}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <div className='products-container'>
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>                    
                  <img
                      loading="lazy"
                      width="100%"
                      src={`${option?.productImages[0]?.imageUrl}`}
                      alt=""
                  />
                  {option.name} 
                </Box>
              </div>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                className="product-search"
                placeholder='Enter product name'
                onChange={(e) => handleChange(e.target.value)}
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                />
            )}
        />
 
      
    )
    return (
        <div>
            <Modal open={isOpen} onClose={handleClose}>
                {body}
            </Modal>
        </div>
    )
}

const customerValidations = yup.object().shape({
    productName: yup.string().required('Please enter a valid product name. i.e Day Old Chicks'),
})


export default ProductModal;
