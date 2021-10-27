import React, { useState, useEffect } from 'react'
import {
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
import { useHistory } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import Notification from '../../components/Notification'

import './order-view.css'
import Loader from '../../../matx/components/MatxLoadable/Loading'

import { paymentMethod, shippingMethod, calculateTotal } from './utils'

import { addInvoice, populate } from './OrderService'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

function NewOrder() {
  const initialState = {
    customerId: '',
    orderItems: [],
    paymentMethod: '',
    shippingMethod: '',
    appliedCoupons: [],
  }

  const history = useHistory()
  const [state, setState] = useState(initialState)
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = React.useState(false)
  const [fields, setFields] = useState([
    { productId: 0, itemQuantity: 1, totalPrice: 0 },
  ])
  const [coupons, setCoupons] = useState([])
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')
  const [isIconTrue, setDisableIcon] = useState(false)
  const [product, setNewProduct] = React.useState([])

  const getAllDetails = () => {
    populate(
      setCustomers,
      setAlert,
      setSeverity,
      '/afrimash/customers',
      setLoading
    )
    populate(
      setProducts,
      setAlert,
      setSeverity,
      '/afrimash/products/',
      setLoading
    )
    populate(
      setCoupons,
      setAlert,
      setSeverity,
      '/afrimash/coupons/',
      setLoading
    )
  }

  useEffect(() => {
    getAllDetails()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setState({ ...state, [name]: value })
  }

  const handleChangeInput = (i, event, newValues) => {
    const values = calculateTotal(i, event, newValues, fields, product)
    setFields(values)
    setState({ ...state, orderItems: fields })
  }

  const handleInputChange = (i, event, newValues, reason) => {
    setNewProduct(newValues)
    if (reason === 'reset') {
      setFields([])
      return
    } else {
      const values = [...fields]
      values[i].productId = newValues.id

      values[i] = { ...values[i] }
      setFields(fields)
      setState({ ...state, orderItems: fields })
    }
  }

  //   const handleCoupons = (i, event, newValues) =>{

  //   }

  const handleAddInput = () => {
    const values = [...fields]
    values.push({
      productId: 0,
      itemQuantity: 0,
    })
    setDisableIcon(false)

    setFields(values)
    setState({ ...state, orderItems: values })
  }

  const handleRemoveInput = (i) => {
    const values = [...fields]
    values.splice(i, 1)

    if (values.length === 0) {
      setDisableIcon(true)
      return
    }
    setFields(values)
    setState({ ...state, orderItems: values })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addInvoice({ ...state }).then((response) => {
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
  const notification = () => {
    return <Notification alert={alert} severity={severity && severity} />
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
      {severity === 'error' && notification()}
      {loading ? (
        <Loader />
      ) : (
        <SimpleCard title='Create New Order'>
          <div className='w-100 overflow-auto'>
            <Card>
              <form className='px-4' onSubmit={handleSubmit}>
                <TextField
                  onChange={handleChange}
                  // value={state.name}
                  name='customerId'
                  defaultValue=''
                  fullWidth
                  select
                  margin='normal'
                  label='Select a Customer'
                  type='text'
                  variant='outlined'
                >
                  {customers.map((customer, idx) => (
                    <MenuItem
                      name='customer'
                      key={idx}
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
                            key={`${field}-${idx}`}
                            name='productId'
                            defaultValue=''
                            options={products}
                            value={fields.product}
                            getOptionLabel={(option) => option.name || ''}
                            onChange={(e, newValues) =>
                              handleInputChange(idx, e, newValues)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label='Product name'
                                name='productId'
                                margin='normal'
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
                      defaultValue=''
                      select
                      margin='normal'
                      label='Payment Method'
                      type='text'
                      fullWidth
                      variant='outlined'
                    >
                      {paymentMethod.map((paymentMethod, idx) => (
                        <MenuItem
                          name='PaymentMethod'
                          value={paymentMethod.value}
                          key={idx}
                        >
                          {paymentMethod.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      onChange={handleChange}
                      name='shippingMethod'
                      select
                      defaultValue=''
                      margin='normal'
                      label='Shipping Method'
                      type='text'
                      fullWidth
                      variant='outlined'
                    >
                      {shippingMethod.map((shippingMethod, idx) => (
                        <MenuItem
                          name='shippingMethod'
                          value={shippingMethod.value}
                          key={idx}
                        >
                          {shippingMethod.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {fields.map((field, idx) => {
                      return (
                        <div key={`${field}-${idx}`} className='maindiv qty'>
                          <TextField
                            onChange={(e, newValues) =>
                              handleChangeInput(idx, e)
                            }
                            value={fields.quantity}
                            name='itemQuantity'
                            id='itemQuantity'
                            defaultValue=''
                            margin='normal'
                            label='Quantity'
                            type='number'
                            style={{ width: '80%' }}
                            variant='outlined'
                          />
                          <IconButton
                            className='qty'
                            onClick={() => handleAddInput()}
                          >
                            <Icon>add</Icon>
                          </IconButton>

                          <IconButton
                            disabled={isIconTrue}
                            className='qty'
                            onClick={() => handleRemoveInput(idx)}
                          >
                            <Icon>remove</Icon>
                          </IconButton>
                        </div>
                      )
                    })}
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
                        setState({ ...state, appliedCoupons: coupons })
                      }}
                      getOptionLabel={(option) => option.code || ''}
                      getOptionSelected={(option, value) =>
                        option.code === value.code
                      }
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
                          margin='normal'
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <div className='d-flex'>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                  >
                    Create new order
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </SimpleCard>
      )}
    </div>
  )
}

export default NewOrder
