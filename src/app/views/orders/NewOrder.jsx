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
import Alert from 'app/components/Alert'

import './order-view.css'
import Loader from '../../../matx/components/MatxLoadable/Loading'

import { paymentMethod, shippingMethod, calculateTotal } from './utils'

import { addInvoice, populate, getProductsData } from './OrderService'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

function NewOrders() {
  const initialState = {
    customerId: '',
    orderItems: [],
    paymentMethod: '',
    shippingMethod: '',
    appliedCoupons: [],
    orderSource: 'ADMIN',
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
  const [isOpen, setIsOpen] = React.useState(false)
  const [alertData, setAlertData] = React.useState({ success: false, text: 'We encountered a problem.', title: "Title" })
  const [modalText, setModalText] = React.useState('')


  const getAllDetails = () => {
    populate(
      setCustomers,
      setAlert,
      setSeverity,
      '/afrimash/customers',
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
    getProductsData(setLoading, '/afrimash/products/', setProducts)
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

  // To be changed later
  const handleModal = () => {
    setIsOpen(prev => !prev)
  }




  // 
  const handleInputChange = (i, event, newValues, reason) => {
    if (reason === 'reset') {
      setFields([])
      return
    } else {
      const values = [...fields]
      if (!newValues) return
      else values[i].productId = newValues.id
      setNewProduct(newValues)
      values[i] = { ...values[i] }
      setFields(fields)
      setState({ ...state, orderItems: fields })
    }
  }

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
        if (response.status === 200) {
          // history.push('/orders')
          setIsOpen(prev => !prev)
          setAlertData({ success: true, text: 'You have successfully created an order.', title: "Order Created" })
        }
        else{
          setIsOpen(prev => !prev)
        }
      } else if (!response) {
        setIsOpen(prev => !prev)
        // setCreated({success:false, text:'We encountered a problem'})
        setAlert('An Error Ocurred, Could not Create Order. Try Again')
        setSeverity('error')
      }
    })
  }
  const notification = () => {
    return <Notification alert={alert} severity={severity && severity} />
  }
  const PaperComponent = ({ children }) => (
    <Card>
      {children}
      <div>content</div>
    </Card>
  )
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
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      onChange={handleChange}
                      name='customerId'
                      defaultValue=''
                      select
                      fullWidth
                      margin='normal'
                      label='Select a Customer'
                      type='text'
                      variant='outlined'
                    >
                      {customers.map((customer, idx) => (
                        <MenuItem
                          divider
                          name='customer'
                          key={idx}
                          value={customer.id}
                          style={{ flexDirection: 'column' }}
                        >
                          <h5>{`${customer.firstName} ${customer.lastName}`}</h5>
                          <small className='text-muted'>
                            {customer.mobileNo} {customer.email}
                          </small>
                        </MenuItem>
                      ))}
                    </TextField>
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
                            getOptionLabel={(option) =>
                              `Name: ${option.name || ''} Vendor: ${option.storeId?.name || ''
                              }`
                            }
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
          {/* <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleModal}
          >
            Show Modal
                      </Button> */}
          <Alert isOpen={isOpen} handleModal={handleModal} alertData={alertData} />
        </SimpleCard>
      )}
    </div>
  )
}

export default NewOrders
