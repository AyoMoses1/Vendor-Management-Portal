import React, { useState, useEffect } from 'react'
import { getInvoiceById } from './OrderService'
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import './order-view.css';
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
          <Grid item xs={8} className={"no-border"}>
            <Grid container spacing={2}>
              <Grid item xs={7} className={"no-border"}>
                <Item>
                  <div
                    className={clsx(
                      'viewer_actions px-2 mb-5',
                      classes.viewerAction
                    )}
                  >
                    <div className='order-header'>
                      <h5 className='mb-2'>Order {referenceNo}</h5>
                      <p className='mt-20'>{createDate ? `Date Created: ${format(new Date(createDate).getTime(), 'MMMM dd, yyyy')}` : ''}</p>
                      <p>Time Created: 12:00 am</p> {/* Note that the time is hard coded. The time is not really coming from the backend*/}
                    </div>

                    {/* <div className='my-4 customer-details'>
                  <div className='order-text-12'>
                    <p className='order-text-12'>Order Status:</p>
                  </div>
                  <div className='ml-6 order-text-12'>
                    <p className='order-text-12'><span className='font-weight-bold'>{status}</span></p>
                  </div>
                </div> */}

                    <div className='customer-details'>
                      <div className='order-text-12'>
                        <p className='py-4'>Order Status: </p>
                        <p>Customer Name: </p>
                        <p>Customer ID: </p>
                        <p>Email: </p>
                        <p>Phone: </p>
                      </div>
                      <div className='ml-4 order-text-12'>
                        <p className='py-4'><strong>{status}</strong></p>
                        <p><strong>{customerId ? `${customerId.firstName.toUpperCase()} ${customerId.lastName.toUpperCase()}` : null}</strong></p>
                        <p><strong>{customerId ? customerId.id : null}</strong></p>
                        <p><strong>{customerId ? customerId.email : null}</strong></p>
                        <p><strong>{customerId ? customerId.mobileNo : null}</strong></p>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={5} className={"no-border"}>
                <Item>
                  <div className={clsx(
                    'viewer_actions px-2 mb-5',
                    classes.viewerAction
                  )}>
                    <div className='billing'>
                      <h5>Billing Address</h5>
                      {orderSource == 'ADMIN' ?
                        <p>{customerId ? `${customerId.deliveryAddresses[0].address}` : null}</p>
                        :
                        orderSource == 'AGENT_APP' ?
                          <p>{state.deliveryAddress ? `${state.deliveryAddress.address}` : null}</p>
                          :
                          <p>{customerId ? `${customerId.address}` : null}</p>
                      }
                    </div>
                    <div className='shipping'>
                      <h5>Shipping Address</h5>
                      <p>Shiping adress</p>
                    </div>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} className={"no-border"}>
                <Item>
                  <div className='order-items'>
                    <h5>Order Items</h5>
                    <table className='order-table'>
                      <thead>
                        <tr>
                          <Grid item xs={6} className='order-text-14'><small>Item</small></Grid>
                          <Grid item xs={2} className='text-center order-text-14'><small>Cost</small></Grid>
                          <Grid item xs={2} className='text-center order-text-14'><small>Quantity</small></Grid>
                          <Grid item xs={2} className='text-center order-text-14'><small>Total</small></Grid>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems ? orderItems.map((item, index) => (
                          <tr key={item.id} className={index != orderItems.length - 1 ? "order-border-bottom my-4" : ""}>
                            <Grid item xs={6}>
                              <div className='order-flex'>
                                <div className='order-image'>
                                  <img style={{ height: "auto" }} src={item.productId.productImages[0].imageUrl} />
                                </div>
                                <div className='order-text-10'>
                                  <span className='product-name'>{item.productId.name.slice(0, 50) + "..."}</span>
                                  <div className='mt-20'>
                                    <p>Capacity: {item.productId.description.slice(0, 20)+ "..."}</p> {/* Please this is hardcoded. Will fix this later from the backend*/}
                                    <p>Seller: {item.productId.storeId.sellerId.name}</p>
                                  </div>
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={2} className='text-center order-text-10'>
                              N{item.itemPrice ? item.itemPrice?.toLocaleString() : item.productId.price?.toLocaleString()}
                            </Grid>
                            <Grid item xs={2} className='text-center order-text-10'>
                              {item.itemQuantity}
                            </Grid>
                            <Grid item xs={2} className='text-center order-text-10'>
                              N{item.subTotal?.toLocaleString()}
                            </Grid>
                          </tr>
                        )) : ""}
                      </tbody>
                    </table>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} className={"no-border1"}>
                <Item>
                  <div className='shipping-items'>
                    <h5 className='mb-0'>Shipping for Order Items</h5>
                    <table className='order-table'>
                      <thead>
                        <tr>
                          <Grid item xs={10} className='order-text-14'></Grid>
                          <Grid item xs={2} className='order-text-14 text-center'><small>Cost</small></Grid>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems ? orderItems.map((item, index) => (
                          <Grid container key={item.id} className={index != orderItems.length - 1 ? "order-border-bottom my-4" : ""}>
                            <Grid item xs={10}>
                              <div className='order-flex'>
                                <div className='order-image'>
                                  <img style={{ height: "auto" }} src={item.productId.productImages[0].imageUrl} />
                                </div>
                                <div className='order-text-10' style={{width: '70%'}}>
                                  <h6>{item.productId.shippingClass?.name}</h6>
                                  <p><span className='desc-width'>Description:</span> {item.productId.shippingClass?.description}</p>
                                  <p><span className='desc-width'>Item:</span> <span className='product-name'>{item.productId.name.slice(0, 20) + "..."}</span></p>
                                  <p><span className='desc-width'>Quantity:</span> {item.itemQuantity}</p>
                                  <p><span>Seller:</span> {item.productId.storeId.sellerId.name}</p>
                                </div>
                              </div>
                            </Grid>
                            <Grid item xs={2} className='text-center order-text-10'>
                              N{item.shippingCost?.toLocaleString()}
                            </Grid>
                          </Grid>
                        )) : ""}
                      </tbody>
                    </table>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} className={"no-border2"}>
                <Item>
                  <div className='order-total'>
                    <div>
                      <p><small>Item SubTotal:</small></p>
                      <p><small>Shipping: </small></p>
                      <p><strong><small>Total:</small></strong></p>
                    </div>
                    <div className='ml-4'>
                      <p><small><strong>{subTotal}</strong></small></p>
                      <p><small>{orderItems ? orderItems.length && orderItems.map(item => {
                        return item.shippingCost ? item.shippingCost : ''
                      }).reduce(totalShippinCost) : ""}</small></p>
                      <p><small><strong>{totalPrice}</strong></small></p>
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} className={"no-border"}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={"no-border"}>
                <ChatBox />
              </Grid>
              <Grid item xs={12} className={"no-border"}>
                <Downloads />
              </Grid>

              <Grid item xs={12} className={"no-border"}>
                <Notice />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default OrderViewer
