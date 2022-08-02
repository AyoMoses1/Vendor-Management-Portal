import React, { useState, useEffect } from 'react'
import { Icon, Button, Divider, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getInvoiceById } from './OrderService'
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import './order-view.css'
import ChatBox from './ChatBox'
import Downloads from './Downloads'
import Notice from './Notice'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  '@global': {
    '@media print': {
      'body, *, html': {
        visibility: 'hidden',
      },
      '#print-area': {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        '& *': {
          visibility: 'visible',
        },
      },
    },
  },
  orderViewer: {
    '& h5': {
      fontSize: 15,
    },
    paddingBottom: '4px',
  },
  viewerAction: {
    justifyContent: '',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    marginBottom: '2px',
    paddingLeft: '4px',
    paddingRight: '4px',
    minHeight: '200px',
  },
  tableBottom: {
    display: 'flex',
    justifyContent: 'flex-end !important',
  },
}))

const OrderViewer = ({ toggleOrderEditor, id }) => {
  const [state, setState] = useState({})

  const classes = useStyles()

  useEffect(() => {
    if (id !== 'add')
      getInvoiceById(id).then((res) => {
        console.log(res.data)
        setState({ ...res.data.object })
      })
  }, [id])

  const handlePrint = () => window.print()

  let {
    referenceNo,
    customerId,
    status,
    createDate,
    deliveryAddress,
    shippingMethod,
    orderSource,
    orderItems,
    totalPrice,
    totalShippingCost,
    subTotal
  } = state


  const totalShippinCost = (total, shippingCost) => {
    total += shippingCost
    return total 
  }
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));


  return (
    <div className='order-container'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Item>
              <div
                className={clsx(
                  'viewer_actions px-4 mb-5',
                  classes.viewerAction
                )}
            >
                <div>
                  <h5 className='mb-2'>Order {referenceNo}</h5>
                  <p>{createDate ? `Date Created: ${format(new Date(createDate).getTime(), 'MMMM dd, yyyy')}`: ''}</p>
                  <p>Time Created: 12:00 am</p> {/* Note that the time is hard coded. The time is not really coming from the backend*/}
                </div>

                <div className='my-4'>
                  <h6>Order Status : {status}</h6>
                </div>

                <div className='customer-details'>
                  <div>
                    <p>Customer Name: </p>
                    <p>Customer ID: </p>
                    <p>Email: </p>
                    <p>Phone: </p>
                  </div>
                  <div className='ml-4'>
                    <p><strong>{customerId ? `${customerId.firstName.toUpperCase()} ${customerId.lastName.toUpperCase()}`: null}</strong></p>
                    <p><strong>{customerId ? customerId.id: null}</strong></p>
                    <p><strong>{customerId ? customerId.email: null}</strong></p>
                    <p><strong>{customerId ? customerId.mobileNo: null}</strong></p>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <div  className={clsx(
                  'viewer_actions px-4 mb-5',
                  classes.viewerAction
                )}>
                <div className='billing'>
                  <h5>Billing Address</h5>
                  {orderSource == 'ADMIN' ? 
                    <p>{customerId ? `${customerId.deliveryAddresses[0].address}`: null}</p> 
                    : 
                    orderSource == 'AGENT_APP' ?
                    <p>{state.deliveryAddress ? `${state.deliveryAddress.address}`: null}</p>
                    :
                    <p>{customerId ? `${customerId.address}`: null}</p>
                    }
                </div>
                <div className='shipping'>
                  <h5>Shipping Address</h5>
                  <p>Shiping adress</p>
                </div>
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <ChatBox/>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <div className='order-items'>
                <h5>Order Items</h5>
                <table className='order-table'>
                  <thead>
                    <tr>
                      <Grid item xs = {8}><strong>Item</strong></Grid>
                      <Grid Item><strong>Cost</strong></Grid>
                      <Grid Item><strong>Quantity</strong></Grid>
                      <Grid Item><strong>Total</strong></Grid>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems ? orderItems.map(item => (
                      <tr key={item.id}>
                        <Grid item xs={8}>
                          <div className='order-flex'>
                            <div className='order-image'>
                              <img src={item.productId.productImages[0].imageUrl}/>
                            </div>
                            <div>
                              <span className='product-name'>{item.productId.name.slice(0, 50) + "..."}</span>
                              <p>Capacity: 16 Litres</p> {/* Please this is hardcoded. Will fix this later from the backend*/}
                              <p>Seller: {item.productId.storeId.sellerId.name}</p>
                            </div>    
                          </div>
                        </Grid>
                        <Grid item>
                          {item.itemPrice ? item.itemPrice: item.productId.price}
                        </Grid>
                        <Grid item>
                          {item.itemQuantity}
                        </Grid>
                        <Grid item>
                          {item.subTotal}
                        </Grid>
                      </tr>
                    )): ""}
                  </tbody>
                </table>
              </div>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Downloads/>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <div className='shipping-items'>
                <h5>Shipping for Order Items</h5>
                <table className='order-table'>
                  <thead>
                    <Grid container justifyContent="flex-end">
                      <tr>
                        <Grid item xs = {2}><strong>Cost</strong></Grid>
                      </tr>
                    </Grid>
                  </thead>
                  <tbody>
                    {orderItems ? orderItems.map(item => (
                      <Grid container key={item.id}>
                        <Grid item xs ={8}>
                          <div className='order-flex'>
                            <div className='order-image'>
                              <img src={item.productId.productImages[0].imageUrl}/>
                            </div>
                            <div>
                              <h6>{item.productId.shippingClass?.name}</h6>
                              <p>Description: {item.productId.shippingClass?.description}</p>
                              <p>Item: <span className='product-name'>{item.productId.name.slice(0, 20) + "..."}</span></p>
                              <p>Quantity: {item.itemQuantity}</p>
                              <p>Seller: {item.productId.storeId.sellerId.name}</p>
                            </div>    
                          </div>
                        </Grid>
                        <Grid item xs={4} textAlign="end">
                          {item.shippingCost}
                        </Grid>
                      </Grid>
                    )): ""}
                  </tbody>
                </table>
              </div>  
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Notice/>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <div className='order-total'>
                <div>
                  <p>Item SubTotal: </p>
                  <p>Shipping: </p>
                  <p><strong>Total:</strong></p>
                </div>
                <div className='ml-4'>
                  <p><strong>{subTotal}</strong></p>
                  <p>{orderItems ? orderItems.length && orderItems.map(item => {
                    return item.shippingCost ? item.shippingCost: ''
                  }).reduce(totalShippinCost): ""}</p>
                  <p><strong>{totalPrice}</strong></p>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default OrderViewer
