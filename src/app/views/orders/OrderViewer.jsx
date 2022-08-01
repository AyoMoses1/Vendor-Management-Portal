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
  
  return (
    <div className='order-container'>
      <div className={clsx('invoice-viewer py-4 order-width flex-left', classes.orderViewer)}>
        {/* <div
          className={clsx(
            'viewer_actions px-4 mb-5 flex items-center',
            classes.viewerAction
          )}
        >
          <Link to='/orders'>
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
          <div>
            <Button
              className='mr-4 py-2'
              variant='contained'
              color='primary'
              onClick={() => toggleOrderEditor()}
            >
              Edit Order
            </Button>
            <Button
              onClick={handlePrint}
              className='py-2'
              variant='contained'
              color='secondary'
            >
              Print Order
            </Button>
          </div>
        </div> */}

        <div id='print-area'>
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
          <div className={clsx(
              'viewer_actions px-4 mb-5',
              classes.viewerAction
            )} >
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
              <p>Shiping adress is limited in this area</p>
            </div>
          </div>
          

          {/* <div
            className={clsx(
              'viewer__billing-info px-4 py-5 flex justify-between',
              classes.viewerAction
            )}
          >
            <div>
              <h5 className='mb-2'>Customer Details</h5>
              <p className='mb-4'>
                {customerId
                  ? `${customerId.firstName} ${customerId.lastName}`
                  : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {customerId ? customerId.mobileNo : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {customerId ? customerId.email : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {deliveryAddress ? deliveryAddress?.address : null}
              </p>
            </div>
            <div className='text-right w-full'>
              <h5 className='mb-2'>Shipping Details</h5>
              <p className='mb-4'>
                {customerId
                  ? `${customerId.firstName} ${customerId.lastName}`
                  : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {customerId ? customerId.email : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {deliveryAddress ? deliveryAddress?.address : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                Shipping Method: {shippingMethod ? shippingMethod : null}
              </p>
            </div>
            <div />
          </div> */}
        </div>

        <div className='order-items'>
            <h5>Order Items</h5>
            <table className='order-table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cost</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderItems ? orderItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className='order-flex'>
                        <div className='order-image mx-4'>
                          <img src={item.productId.productImages[0].imageUrl}/>
                        </div>
                        <div>
                          <span className='product-name'>{item.productId.name.slice(0, 50) + "..."}</span>
                          <p>Capacity: 16 Litres</p> {/* Please this is hardcoded. Will fix this later*/}
                          <p>Seller: {item.productId.storeId.sellerId.name}</p>
                        </div>    
                      </div>
                    </td>
                    <td>
                      {item.itemPrice ? item.itemPrice: item.productId.price}
                    </td>
                    <td>
                      {item.itemQuantity}
                    </td>
                    <td>
                      {item.subTotal}
                    </td>
                  </tr>
                )): ""}
              </tbody>
            </table>
        </div>

        {/* Shipping section */}

        <div className='shipping-items'>
          <h5>Shipping for Order Items</h5>
          <table className='order-table'>
            <thead>
              <tr>
                <th></th>

                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {orderItems ? orderItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className='order-flex'>
                      <div className='order-image'>
                        <img src={item.productId.productImages[0].imageUrl}/>
                      </div>
                      <div>
                        <h6>{item.productId.shippingClass.name}</h6>
                        <p>Description: {item.productId.shippingClass.description}</p>
                        <p>Item: <span className='product-name'>{item.productId.name.slice(0, 20) + "..."}</span></p>
                        <p>Quantity: {item.itemQuantity}</p>
                        <p>Seller: {item.productId.storeId.sellerId.name}</p>
                      </div>    
                    </div>
                  </td>
                  <td>
                    {item.shippingCost}
                  </td>
                </tr>
              )): ""}
            </tbody>
          </table>
        </div>  
        <div className='order-total'>
            <div>
              <p>Item SubTotal: </p>
              <p>Shipping: </p>
              <p><strong>Total:</strong></p>
            </div>
            <div className='ml-4'>
              <p><strong>{subTotal}</strong></p>
              <p><strong>{orderItems ? orderItems.map(item => item.shippingCost).reduce(totalShippinCost) : ''}</strong></p>
              <p><strong>{totalPrice}</strong></p>
            </div>
          </div>
        </div>
      <div className='flex-right'>
        <div className={clsx(
              'viewer_actions px-4 mb-5',
              classes.viewerAction
            )}>
          <ChatBox/>
          <Downloads/>
          <Notice/>
        </div>        
      </div>
    </div>
  )
}

export default OrderViewer
