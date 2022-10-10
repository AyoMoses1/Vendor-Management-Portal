import React, { useState, useEffect } from 'react'
import { getInvoiceById, updateInvoice, deleteOrderItem, downloadPdfInvoice, downloadParkingSlip } from './OrderService'
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom";
import { errorState } from "../helpers/error-state";
import clsx from 'clsx';
import './order-view.css';
import ChatBox from './ChatBox'
import Downloads from './Downloads'
import Notice from './Notice'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import OrderEditor from './OrderEditor'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDialog } from 'muibox';
import Alert from 'app/components/Alert';
import { CircularProgress } from '@material-ui/core';
import { sendCustomerNote } from '../customers/CustomerService';
import { SimpleCard, Breadcrumb } from 'matx'

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

const OrderViewer = ({ id, order }) => {
  const [state, setState] = useState({})
  const [changeStatus, setChangeStatus] = useState(false)
  const [orderStatus, setOrderStatus] = useState("")
  const [error, setError] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  const [isNewOrder, setIsNewOrder] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dialog = useDialog();
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState({ success: false, text: '', title: '' });
  const [alertOpen, setAlertOpen] = React.useState(false)
  const [downloading, setDownloading] = useState(false);
  const [downloadIndex, setDownloadIndex] = useState(0);
  const [sending, setSending] = useState(false);

  const classes = useStyles()

  useEffect(() => {
    if (id !== 'add')
      getInvoiceById(id).then((res) => {
        setState({ ...res.data.object })
        setOrderStatus(status)
      })
  }, [id])

  const handlePrint = () => window.print()

  const toggleOrderEditor = () => {
    setIsOpen(prev => !prev)
  }


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

  const handleChange = (e) => {
    setChangeStatus(true)
    setOrderStatus(e.target.value)
  }


  let statusValues = [
    { label: "PENDING", value: "PENDING" },
    { label: "AWAITING PAYMENT", value: "AWAITING_PAYMENT" },
    { label: "CONVERTED", value: "CONVERTED" },
    { label: "PROCESSING", value: "PROCESSING" },
    { label: "CANCELLED", value: "CANCELLED" },
    { label: "COMPLETED", value: "COMPLETED" },
  ]

  useEffect(() => {
    if (status === "PENDING") {
      statusValues = []
    }
    else if (status === "AWAITING_PAYMENT") {
      statusValues = []
    }
    else if (status === "PROCESSING") {
      statusValues = []
    }
    else if (status === null) {
      statusValues = []
    }
  }, [state])

  const handleSubmit = () => {
    const auth = JSON.parse(localStorage.getItem("auth_user"));
    if (auth.role.name === "ROLE_ADMIN" || auth.role.name === "ROLE_MANAGER") {
      let tempState = { status: orderStatus, id: id };
      updateInvoice(tempState).then((res) => {
        if (res.status === 200) {
          refresh()
        }
      });
    } else {
      let msg = "You dont have enough permission to perform action";
      errorState(setError, setSeverity, msg);
      return;
    }
  };

  const refresh = () => {
    window.location.reload()
  }

  const handleModal = () => {
    toggleOrderEditor();
  }

  const handleCallBack = () => {
    toggleOrderEditor();
    getInvoiceById(id).then((res) => {
      setState({ ...res.data.object })
      setOrderStatus(status)
    })
    setAlertData({ success: true, text: 'Shipping address updated successfully', title: 'Shipping Address' })
    handleAlertModal();
  }

  const handleRefresh = () => {
    getInvoiceById(id).then((res) => {
      setState({ ...res.data.object })
      setOrderStatus(status)
    })
  }

  const handleAlertModal = () => {
    setAlertOpen(prev => !prev)
  }

  const handleAlertOK = () => {
    handleAlertModal();
  }

  const _deleteOrderItem = (itemId) => {
    if (!loading) {
      dialog
        .confirm(`Are you sure you want to delete this order item?`)
        .then(async (value) => {
          const result = await deleteOrderItem(
            state?.id,
            itemId,
            setLoading
          ).then((res) => {
            setAlertData({ success: true, text: 'Order item deleted successfully', title: 'Order Item Deleted' })
            handleAlertModal();
            getInvoiceById(id).then((res) => {
              setState({ ...res.data.object })
              setOrderStatus(status)
            })
          }).catch((err) => {
            setAlertData({ success: false, text: 'Unable to delete order items. Please try again', title: 'Order Item Deleted' })
            handleAlertModal();
          });
        }).catch(() => {
          return false;
        }
        )
    }
  }

  const handleDownload = async (index) => {
    setDownloadIndex(index);
    if (index === 0) {
      await downloadPdfInvoice(
        state?.id,
        setDownloading
      ).then((res) => {
        setAlertData({ success: true, text: 'Invoice downloaded successfully', title: 'Invoice Downloaded' })
        handleAlertModal();
      }).catch((err) => { })
    } else {
      await downloadParkingSlip(
        state?.id,
        setDownloading
      ).then((res) => {
        setAlertData({ success: true, text: 'Parking slip downloaded successfully', title: 'Parking Slip Downloaded' })
        handleAlertModal();
      }).catch((err) => { })
    }
  }

  const handleSendCustomerNote = async (note) => {
    await sendCustomerNote(state?.customerId?.id, note, setSending).then((res) => {
      if (res && res?.data?.status === "OK") {
        setAlertData({ success: true, text: 'Message sent successfully', title: 'Message Sent' })
        handleAlertModal();
      } else {
        setAlertData({ success: false, text: 'Unable to send message. Please try again', title: 'Message Sent' })
        handleAlertModal();
      }
    }).catch(err => {
      setAlertData({ success: false, text: 'Unable to send message. Please try again', title: 'Message Sent' })
      handleAlertModal();
    })
  }


  return (
    <div className='order-container'>
      <Alert
        isOpen={alertOpen}
        handleModal={handleAlertModal}
        alertData={alertData}
        handleOK={handleAlertOK}
      />
      <Box sx={{ flexGrow: 1 }}>
        <div className='mb-sm-30'>
          <Breadcrumb
            routeSegments={[
              { name: 'Orders', path: '/orders' },
              { name: 'Order Details' },
            ]}
          />
        </div>

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
                        <p className='py-2'>Order Status: </p>
                        <p>Customer Name: </p>
                        <p>Customer ID: </p>
                        <p>Email: </p>
                        <p>Phone: </p>
                      </div>
                      <div className='ml-4 order-text-12'>
                        <form onSubmit={handleChange} className='status-form'>
                          <select value={orderStatus ? orderStatus ?? '' : status ?? ''} onChange={handleChange} className='status-box'>
                            {statusValues.map(value => {
                              return <option key={value.label} value={value.value}>{value.label}</option>
                            })}
                          </select>
                        </form>
                        {/* <p className='py-4'><strong>{status}</strong></p> */}
                        <p><strong>{customerId ? `${customerId.firstName.toUpperCase()} ${customerId.lastName.toUpperCase()}` : null}</strong></p>
                        <p><strong>{customerId ? customerId.id : null}</strong></p>
                        <p><strong>{customerId ? customerId.email : null}</strong></p>
                        <p><strong>{customerId ? customerId.mobileNo : null}</strong></p>
                      </div>
                      <div className='edit-action'>
                        <Button color="primary" onClick={handleSubmit} style={changeStatus ? { "display": "inline-block" } : { "display": "none" }}>Save</Button>
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
                      <div className='header-flex'>
                        <h5>Delivery Address</h5>
                        <div className='edit-action'>
                          <Button color="primary" onClick={() => toggleOrderEditor()}>Edit</Button>
                        </div>
                      </div>
                      <p>{state?.deliveryAddress?.address ?? <small><i>No shipping address</i></small>}</p>
                    </div>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} className={"no-border"}>
                <Item>
                  <div className='order-items'>
                    <div className='header-flex'>
                      <h5>Order Items</h5>
                      {/* <div className='edit-action'>
                          <Button color="primary">Edit</Button>
                      </div> */}
                    </div>
                    <table className='order-table'>
                      <thead className='my-4'>
                        <tr>
                          <Grid item xs={5} className='order-text-14'><small>Item</small></Grid>
                          <Grid item xs={2} className='text-center order-text-14'><small>Cost</small></Grid>
                          <Grid item xs={2} className='text-center order-text-14'><small>Quantity</small></Grid>
                          <Grid item xs={2} className='text-center order-text-14'><small>Total</small></Grid>
                          {state?.status === "PENDING" || state?.status === "AWAITING_PAYMENT" ? <Grid item xs={1} className='text-center order-text-14'></Grid> : <></>}
                        </tr>
                      </thead>
                      <tbody className='order-items'>
                        {orderItems ? orderItems.map((item, index) => (
                          <tr key={item.id} className={index != orderItems.length - 1 ? "order-border-bottom my-4" : ""}>
                            <Grid item xs={5}>
                              <div className='order-flex'>
                                <div className='order-image'>
                                  <img style={{ height: "auto" }} src={item.productId.productImages[0]?.imageUrl} />
                                </div>
                                <div className='order-text-10'>
                                  <span className='product-name'>{item.productId.name.slice(0, 50) + "..."}</span>
                                  <div className='mt-20'>
                                    <p>Capacity: {item.productId.description.slice(0, 20) + "..."}</p> {/* Please this is hardcoded. Will fix this later from the backend*/}
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
                            {state?.status === "PENDING" || state?.status === "AWAITING_PAYMENT" ? <Grid item xs={1} className='text-center order-text-10'>
                              {loading ? <CircularProgress size={15} /> : <Button color="primary" onClick={() => _deleteOrderItem(item?.id)}><DeleteIcon className='del-icon' /> </Button>}
                            </Grid> : <></>}
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
                                  <img style={{ height: "auto" }} src={item.productId.productImages[0]?.imageUrl} />
                                </div>
                                <div className='order-text-10' style={{ width: '70%' }}>
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
                      <p><small><strong>{subTotal?.toLocaleString()}</strong></small></p>
                      <p><small>{orderItems ? orderItems.length && orderItems.map(item => {
                        return item.shippingCost ? item.shippingCost?.toLocaleString() : ''
                      }).reduce(totalShippinCost) : ""}</small></p>
                      <p><small><strong>{totalPrice?.toLocaleString()}</strong></small></p>
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
                <Downloads handleDownload={handleDownload} downloadIndex={downloadIndex} downloading={downloading} />
              </Grid>
              <Grid item xs={12} className={"no-border"}>
                <Notice handleSendCustomerNote={handleSendCustomerNote} sending={sending} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <OrderEditor
        toggleOrderEditor={toggleOrderEditor}
        isNewOrder={isNewOrder}
        id={id}
        isOpen={isOpen}
        order={state}
        name={"Update Shipping Address"}
        orderSource={orderSource}
        handleClose={handleModal}
        handleRefresh={handleRefresh}
        handleCallBack={handleCallBack}
      />
    </div>
  )
}

export default OrderViewer
