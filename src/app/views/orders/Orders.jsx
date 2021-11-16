import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { useDialog } from 'muibox'

import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './order-view.css'
import { deleteInvoice, getAllInvoice } from './OrderService'
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

  // const productList = useSelector((state) => state.ecommerce)
  // const { orderList } = productList

  useEffect(() => {
    getAllInvoice(setOrders, setLoading, page, setCount)
    dispatch({ type: GET_ALL_ORDERS })
    return () => setIsAlive(false)
  }, [isAlive, page])

  const onChangePage = (page) => {
    getAllInvoice(setOrders, setLoading, page, setCount)
    setPage(page)
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
            <div className={`flex items-center ${order.status}`}>
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
                <span className='my-0 text-15'>
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
  ]

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb routeSegments={[{ name: 'Orders', path: '/orders' }]} />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'All Orders'}
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
                filterType: 'textField',
                responsive: 'standard',
                fixedHeader: true,
                rowsPerPage: 50,
                serverSide: true,
                count,
                page,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    onChangePage(tableState.page)
                  }
                },
                elevation: 5,
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
                    <Link
                      to={{
                        pathname: '/order/new',
                        state: {},
                      }}
                    >
                      <Button variant='contained' color='primary'>
                        <Icon>add</Icon>Add New
                      </Button>
                    </Link>
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
