import React, { useState, useEffect } from 'react'
import { Icon, Button, Divider, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getInvoiceById } from './SpecialOrderService'
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import '../../orders/order-view.css'
import Editor from './Editor'
import { getSpecialOrder } from '../USSDService'

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
    justifyContent: 'space-between !important',
    display: 'flex',
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

const SpecialOrderViewer = ({ toggleOrderEditor, id }) => {
  const [state, setState] = useState({})
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (id !== 'add')
      getInvoiceById(id).then((res) => {
        console.log(res.data.object)
        setState({ ...res.data.object })
      })
  }, [id])

  const handlePrint = () => window.print()

  const handleCheck = () =>{
    console.log('Hello Napster')
  }
  let {
    referenceNo,
    customerId,
    createDate,
    deliveryAddress,
    shippingMethod,

    customerName, mobileNo,productName, description, quantity, location, specialOrderNo, expectedDeliveryDate, status
  } = state

  const handleModal = () => {
    setOpen(!open);
  }

  const refresh = async () => {
    getSpecialOrder();
}

  return (
    <>
      <div className={clsx('invoice-viewer py-4', classes.orderViewer)}>
        <div
          className={clsx(
            'viewer_actions px-4 mb-5 flex items-center',
            classes.viewerAction
          )}
        >
          <Link to='/ussd-special-orders'>
            <IconButton>
              <Icon>arrow_back</Icon>
            </IconButton>
          </Link>
          <div>
            <Link to='/products'>
              <Button
                onClick={handleCheck}
                className='mr-4 py-2'
                variant='contained'
                color='primary'
              >
                Check if product exists
              </Button> 
            </Link>
           
          
            {/* <Button
              className='mr-4 py-2'
              variant='contained'
              color='primary'
              onClick={() => toggleOrderEditor()}
            >
              Edit Order
            </Button> */}
            <Button
                className='mr-4 py-2'
                variant='contained'
                color='primary'
                onClick={() => {
                    handleModal()
                }}>
                Edit Special Order
            </Button>
            <Editor
              name={"Edit Special Order"}
              isOpen={open}
              specialOrder={state}
              handleClose={handleModal}
              refresh={() => refresh()}
            />
            <Button
              onClick={handlePrint}
              className='py-2'
              variant='contained'
              color='secondary'
            >
              Print Order
            </Button>
          </div>
        </div>

        <div id='print-area'>
          <div
            className={clsx(
              'viewer_actions px-4 mb-5 flex items-center justify-between',
              classes.viewerAction
            )}
          >
            <div>
              <h5 className='mb-2'>Order Info</h5>
              <p className='mb-4'>Special Order Number: #{specialOrderNo}</p>
              <p className='mb-4'>Product Name: {productName}</p>
              <p className='mb-0'>Product Description: {description}</p>
              <p className='mb-0'>Product Quantity: {quantity}</p>
            </div>
            
            <div className={`text-right`}>
              <h5 className='font-normal capitalize'>
              <div>
                <span className={`mb-4 ORDER ${status}`}>
                  Special order status: {status}
                </span>
              </div>
              <br/>
              <h5 className='font-normal capitalize'>
                <strong>Order date: </strong>
                <span>
                  {createDate
                    ? format(new Date(createDate).getTime(), 'MMMM dd, yyyy')
                    : 'Not set'}
                </span>
              </h5>
                <strong>Expected Delivery Date: </strong>
                <span>
                  {expectedDeliveryDate
                    ? format(new Date(expectedDeliveryDate).getTime(), 'MMMM dd, yyyy')
                    : ''}
                </span>
              </h5>
            </div>
          </div>

          <Divider />
          
          <div
            className={clsx(
              'viewer__billing-info px-4 py-5 flex justify-between',
              classes.viewerAction
            )}
          >
            <div>
              <h5 className='mb-2'>Customer Details</h5>
              <p className='mb-4'>
                {customerName
                  ? `${customerName}`
                  : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {mobileNo ? mobileNo : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {location ? location : null}
              </p>
            </div>
            
            <div className='text-right w-full'>
              <h5 className='mb-2'>Shipping Details</h5>
              <p className='mb-4'>
                {customerName
                  ? `${customerName}`
                  : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                {location ? location : null}
              </p>
              <p className='mb-0 whitespace-pre-wrap'>
                Shipping Method: {shippingMethod ? shippingMethod : null}
              </p>
            </div>
            <div />
          </div>
        </div>
      </div>
    </>
  )
}

export default SpecialOrderViewer
