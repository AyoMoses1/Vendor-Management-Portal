import React, { useState, useEffect } from 'react'
import {
  FormControl,
  InputLabel,
  Input,
  Card,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Grid,
  Icon,
  Checkbox,
} from '@material-ui/core'
import { Breadcrumb, SimpleCard } from 'matx'
import { makeStyles } from '@material-ui/core/styles'
import http from '../../services/api'
import { useHistory } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import Notification from '../../components/Notification'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      //   margin: theme.spacing(2),
      //   width: '63ch',
    },
  },
}))

const paymentMethod = [
  {
    label: 'Bank Transfer',
    value: 'PAYMENT_METHOD_BANK_TRANSFER',
  },
  {
    label: 'Cash',
    value: 'PAYMENT_METHOD_CASH',
  },
  {
    label: 'Paystack',
    value: 'PAYMENT_METHOD_PAYSTACK',
  },
  {
    label: 'POS',
    value: 'PAYMENT_METHOD_POS',
  },
  {
    label: 'Wallet',
    value: 'PAYMENT_METHOD_WALLET',
  },
]

const shippingMethod = [
  {
    label: 'Delivery',
    value: 'DELIVERY',
  },
  {
    label: 'Drop Off',
    value: 'DROP_OFF',
  },
  {
    label: 'Pick Up',
    value: 'PICK_UP',
  },
]

function NewOrder() {
  const initialState = {
    customerId: '',
    orderItems: [],
    paymentMethod: '',
    shippingMethod: '',
    paidAmount: '',
    // deliveryAddress: "",
    appliedCoupons: [],
  }

  const history = useHistory()

  const classes = useStyles()
  const [state, setState] = useState(initialState)
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [fields, setFields] = useState([{ productId: '', itemQuantity: '' }])
  const [coupons, setCoupons] = useState([])
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')

  useEffect(() => {
    getCustomers()
    getProducts()
    getCoupons()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
    console.log(state)
  }

  const handleChangeInput = (i, event) => {
    const values = [...fields]
    const { name, value } = event.target
    values[i][name] = value
    let totalPrice = values[i][name] * values[i].itemQuantity
    values[i] = { ...values[i], totalPrice }
    setFields(values)
    console.log(fields)
    setState({ ...state, orderItems: fields })
  }

  const handleInputChange = (i, event, newValues) => {
    console.log(newValues)
    let itemPrice = newValues.price
    const values = [...fields]
    const { name, value } = event.target
    values[i].productId = newValues.id
    values[i] = { ...values[i], itemPrice }
    setFields(values)
    console.log(fields)
    setState({ ...state, orderItems: fields })
  }

  //   const handleCoupons = (i, event, newValues) =>{

  //   }

  const handleAddInput = () => {
    const values = [...fields]
    values.push({
      productId: '',
      itemQuantity: '',
    })
    setFields(values)
    console.log(values)
    console.log(fields)
  }

  const handleRemoveInput = (i) => {
    const values = [...fields]
    console.log(values)
    values.splice(i, 1)
    setFields(values)
  }

  const getCoupons = () => {
    http
      .get(`/afrimash/coupons/`)
      .then((response) => {
        if (response instanceof Object) {
          if (response.data.object) {
            console.log(response.data)
            setCoupons(response.data.object)
          }
        }
      })
      .catch((err) => {
        setAlert('An Error Ocurred, Please Try Again')
        setSeverity('error')
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    http.post('/afrimash/orders', state).then((response) => {
      if (response instanceof Object) {
        if (response.data.status === 'OK') {
          history.push('/orders')
        }
      } else if (response) {
        setAlert('An Error Ocurred, Could not Create Order. Try Again')
        setSeverity('error')
      }
    })
  }

  const getCustomers = () => {
    http
      .get(`/afrimash/customers`)
      .then((response) => {
        setCustomers(response.data.object)
        console.log(response.data.object)
      })
      .catch((err) => {
        setAlert('An Error Ocurred, Please Try Again')
        setSeverity('error')
      })
  }

  const getProducts = () => {
    http
      .get(`/afrimash/products/`)
      .then((response) => {
        console.log(response.data.object)
        setProducts(response.data.object)
      })
      .catch((err) => {
        setAlert('An Error Ocurred, Please Try Again')
        setSeverity('error')
      })
  }

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Orders', path: '/orders' },
            { name: 'Create Order' },
          ]}
        />
      </div>
      <Notification alert={alert} severity={severity} />
      <SimpleCard title='Create New Order'>
        <div className='w-100 overflow-auto'>
          <Card>
            <form className='px-4'>
              <TextField
                onChange={handleChange}
                // value={state.name}
                name='customerId'
                select
                margin='dense'
                label='Customer'
                type='text'
                fullWidth
                variant='outlined'
              >
                {customers.map((customer) => (
                  <MenuItem
                    name='customer'
                    value={customer.id}
                  >{`${customer.firstName} ${customer.lastName}`}</MenuItem>
                ))}
              </TextField>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  {fields.map((field, idx) => {
                    return (
                      <div key={`${field}-${idx}`} className='maindiv'>
                        <Autocomplete
                          id='productId'
                          name='productId'
                          options={products}
                          value={fields.product}
                          getOptionLabel={(option) => option.name}
                          onChange={(e, newValues) =>
                            handleInputChange(idx, e, newValues)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='Product'
                              name='productId'
                              margin='dense'
                              variant='outlined'
                            />
                          )}
                        />
                      </div>
                    )
                  })}

                  <TextField
                    onChange={handleChange}
                    name='paymentMethod'
                    select
                    margin='dense'
                    label='Payment Method'
                    type='text'
                    fullWidth
                    variant='outlined'
                  >
                    {paymentMethod.map((paymentMethod) => (
                      <MenuItem
                        name='PaymentMethod'
                        value={paymentMethod.value}
                      >
                        {paymentMethod.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    onChange={handleChange}
                    name='shippingMethod'
                    select
                    margin='dense'
                    label='Shipping Method'
                    type='text'
                    fullWidth
                    variant='outlined'
                  >
                    {shippingMethod.map((shippingMethod) => (
                      <MenuItem
                        name='shippingMethod'
                        value={shippingMethod.value}
                      >
                        {shippingMethod.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  {fields.map((field, idx) => {
                    return (
                      <div key={`${field}-${idx}`} className='maindiv'>
                        <TextField
                          onChange={(e, newValues) => handleChangeInput(idx, e)}
                          value={fields.quantity}
                          name='itemQuantity'
                          id='itemQuantity'
                          margin='dense'
                          label='Quantity'
                          type='text'
                          style={{ width: '81%' }}
                          variant='outlined'
                        />

                        <IconButton onClick={() => handleAddInput()}>
                          <Icon color='success'>add</Icon>
                        </IconButton>

                        <IconButton onClick={() => handleRemoveInput(idx)}>
                          <Icon color='success'>remove</Icon>
                        </IconButton>
                      </div>
                    )
                  })}
                  <TextField
                    onChange={handleChange}
                    value={state.paidAmount}
                    name='paidAmount'
                    margin='dense'
                    label='Amount'
                    type='text'
                    fullWidth
                    variant='outlined'
                  />

                  <Autocomplete
                    multiple
                    id='categoried'
                    options={coupons}
                    onChange={(event, newValue) => {
                      let coupons = []
                      newValue.forEach((element) => {
                        let couponlist = {
                          coupon: {
                            code: '',
                          },
                        }
                        couponlist.coupon.code = element.code
                        coupons.push(couponlist)
                      })
                      console.log(coupons)
                      setState({ ...state, appliedCoupons: coupons })
                      console.log(state)
                    }}
                    getOptionLabel={(option) => option.code}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.code}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant='outlined'
                        label='Apply Coupons'
                        placeholder='Select Coupons'
                        fullWidth
                        margin='dense'
                      />
                    )}
                  />

                  {/* <TextField
                                    onChange={handleChange}
                                    value={state.deliveryAddress}
                                    name="deliveryAddress"
                                    margin="dense"
                                    label="Address "
                                    type="text"
                                    fullWidth
                                    variant="outlined" 
                                /> */}
                </Grid>
              </Grid>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleSubmit}
              >
                Create
              </Button>
            </form>
          </Card>
        </div>
      </SimpleCard>
    </div>
  )
}

export default NewOrder
