import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { useDialog } from 'muibox'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import {
  Grow,
  Icon,
  IconButton,
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import './order-view.css'
import { deleteInvoice, getAllInvoice, getOrderStatus } from './OrderService'
import Loading from 'matx/components/MatxLoadable/Loading'

import { GET_ALL_ORDERS } from '../../redux/actions/EcommerceActions'

import { useDispatch } from 'react-redux'

const Orders = (props) => {
  const [isAlive, setIsAlive] = useState(true)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const dialog = useDialog()
  const dispatch = useDispatch()
  const [source, setSource] = useState('ALL')
  const [size, setSize] = useState(10);
  const [title, setTitle] = useState('ALL ORDERS')
  const [allOrders, setAllOrders] = useState([])
  const [showAllOrders, setShowAllOrders] = useState(false)
  const [orderStatus, setOrderStatus] = useState([])
  const [value, setValue] = React.useState(0);



  const fetchOrderStatus = async (event, newValue) => {
    setValue(newValue);
    const response = await getOrderStatus(setLoading)
    setOrderStatus(response)
  };

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }


  // const productList = useSelector((state) => state.ecommerce)
  // const { orderList } = productList
  const sourceTypes = [
    {
      type: 'ALL ORDERS',
      value: 'ALL',
    },
    {
      type: 'USSD',
      value: 'USSD',
    },
    {
      type: 'ADMIN',
      value: 'ADMIN',
    },
    {
      type: 'AGENT APP',
      value: 'AGENT_APP',
    },
    {
      type: 'CUSTOMER APP',
      value: 'CUSTOMER_APP',
    },
    {
      type: 'MARKET PLACE',
      value: 'MARKET_PLACE',
    },
  ]
  useEffect(() => {
    setLoading(true)
    const _source = source === 'ALL' ? '' : source;

    const fetchAllOrders = async () => {
      const response = await getAllInvoice(setLoading, page, _source)
      setOrders(response?.content)
      setCount(response?.totalElements)
    }

    fetchAllOrders()
    dispatch({ type: GET_ALL_ORDERS })
    fetchOrderStatus()
    return () => setIsAlive(false)
  }, [dispatch, isAlive, page, source])

  const onChangePage = (page) => {
    getAllInvoice(setOrders, setLoading, page, setCount)
    setPage(page)
  }

  const handleActiveLink = async (orderStats, e) => {
    setLoading(true)
    const _source = source === 'ALL' ? '' : source;
    console.log(orderStats)
    const response = await getAllInvoice(setLoading, page, _source)
    setLoading(false)
    setOrders(response.content.filter(res => {
      return res.status === orderStats
    }))
  }


  const handleTitle = (string) => {
    string.includes('_') ? setTitle(string.split('_').shift() + " " + string.split('_').pop()) : setTitle(string)
  }
  const columns = [
    {
      name: 'referenceNo', // field name in the row object
      label: 'Order', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/order/details',
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>{order?.referenceNo}</span>
                <br />
                <small className='text-muted'>
                  {order?.customerId.firstName}
                </small>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex]
          return (
            <div className={`items-center ORDER ${order.status}`}>
              <Link
                to={{
                  pathname: '/order/details',
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className='ml-3'
              >
                <span className={`my-0 text-15 ORDER ${order.status}`}>
                  {' '}
                  {`${order.status}` || '-----'}
                </span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'deliveryAddress',
      label: 'Billing Address',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/order/details',
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0'>
                  {order?.deliveryAddress?.address || '-----'}
                </span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'totalPrice',
      label: 'Gross Sales',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/order/details',
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0'>₦{order?.totalPrice}</span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'createDate',
      label: 'Date',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/order/details',
                  state: {
                    id: order.id,
                    order,
                  },
                }}
                className='ml-3'
              >
                <span className='my-0 text-15'>{order?.createDate}</span>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/order/details',
                  state: {
                    id: order.id,
                    order,
                  },
                }}
              >
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'id', // field name in the row object
      label: '', // column title that will be shown in table
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let order = orders[dataIndex]
          return (
            <div>
              <h5 className='my-0 text-15'>{`${order?.id}`}</h5>
            </div>
          )
        },
      },
    },
  ]

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb routeSegments={[{ name: 'Orders', path: '/orders' }]} />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750 all-order-table'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={<div>
                <h5 className='mt-4 mb-0'>{title}</h5>
                <div className='w-full flex'>
                  <div className='w-220 flex-end'>
                    <TextField
                      className='mb-4 filter-area'
                      name='mobileNo'
                      label='Filter by source'
                      variant='outlined'
                      margin='normal'
                      select
                      value={source}
                      onChange={(e) => {
                        setSource(e.target.value)
                        e.target.value == 'ALL' ? setTitle('ALL ORDERS') :
                          handleTitle(e.target.value)
                      }}
                    >
                      {sourceTypes.map((sourceType, idx) => (
                        <MenuItem key={idx} value={sourceType.value}>
                          {sourceType.type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <ul className='stats-nav'>
                    {orderStatus.map((stats) => {
                      return <li key={stats.orderStatus} onClick={(e) => handleActiveLink(stats.orderStatus, e)} id={stats.orderStatus}>{stats.orderStatus}({stats.total})</li>
                    })}
                  </ul>
                </div>
              </div>
              }
              data={orders}
              columns={columns}
              options={{
                onRowsDelete: (data) =>
                  dialog
                    .confirm('Are you sure you want to delete?')
                    .then((value) => deleteInvoice(data.data))
                    .catch(() => {
                      return false
                    }),
                sort: true,
                filter: true,
                sortOrder: { name: 'id', direction: 'desc' },
                filterType: 'textField',
                responsive: 'standard',
                fixedHeader: true,
                selectableRows: false,
                rowsPerPageOptions: [10, 20, 40, 80, 100],
                count,
                page,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    onChangePage(tableState.page)
                  }
                },
                elevation: 0,
                customSearchRender: (
                  searchText,
                  handleSearch,
                  hideSearch,
                  options
                ) => {
                  return (
                    <Grow appear in={true} timeout={300}>
                      <TextField
                        variant='outlined'
                        size='small'
                        fullWidth
                        onChange={({ target: { value } }) =>
                          handleSearch(value)
                        }
                        InputProps={{
                          style: {
                            paddingRight: 0,
                          },
                          startAdornment: (
                            <Icon className='mr-2' fontSize='small'>
                              search
                            </Icon>
                          ),
                          endAdornment: (
                            <IconButton onClick={hideSearch}>
                              <Icon fontSize='small'>clear</Icon>
                            </IconButton>
                          ),
                        }}
                      />
                    </Grow>
                  )
                },
                customToolbar: () => {
                  return (
                    <>
                      <Link
                        to={{
                          pathname: '/order/new',
                          state: {},
                        }}
                      >
                        <Button variant='contained' color='primary'>
                          Add New
                        </Button>
                      </Link>
                    </>
                  )
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default Orders
