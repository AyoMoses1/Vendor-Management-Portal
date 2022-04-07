import React, { useEffect } from 'react'
import {
  Divider,
  Table,
  TextField,
  Grow,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'
import http from '../../services/api'

import { useDialog } from 'muibox'

import { SimpleCard, Breadcrumb } from 'matx'

import { useDispatch, useSelector } from 'react-redux'

import {
  getAgentById,
  getAgentCustomers,
  getAgentOrders,
} from 'app/redux/actions/agents-action'
import Loading from 'matx/components/MatxLoadable/Loading'
import { Box } from '@material-ui/core'
import { Button } from '@material-ui/core'

import './style.scss'

const AgentsInfo = ({ location, match }) => {
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0)
  const [agentStatus, setAgentStatus] = React.useState('')

  const { id, agentCode } = location.state
  const dialog = useDialog()

  const agentDetail = useSelector((state) => state.agentDetails)
  const agentCustomerList = useSelector((state) => state.agentCustomers)
  const agentOrder = useSelector((state) => state.agentOrder)

  const { agentDetails, error, loading, severity } = agentDetail
  const { agentCustomers } = agentCustomerList
  const { agentOrders, count } = agentOrder
  console.log({id});
  useEffect(() => {
    setTimeout(() => {
      dispatch(getAgentById(id))
      dispatch(getAgentCustomers(agentCode))
      dispatch(getAgentOrders(id, page))
    }, 1500)
  }, [dispatch, id, agentCode, page, agentStatus])

  const columns = [
    {
      name: 'firstname', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentCustomers[dataIndex]
          return (
            <Link
              to={{
                pathname: `/customer/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${user?.firstName} ${user?.lastName}`}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'mobileNo', // field name in the row object
      label: 'Phone', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentCustomers[dataIndex]

          return (
            <Link
              to={{
                pathname: `/customer/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h5 className='my-0'>{user?.mobileNo}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'email', // field name in the row object
      label: 'Email', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentCustomers[dataIndex]
          return (
            <Link
              to={{
                pathname: `/customer/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h6>{user?.email}</h6>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'state',
      label: 'State',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentCustomers[dataIndex]
          return (
            <Link
              to={{
                pathname: `/customer/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'> {user.state || '-----'}</h5>
              </div>
            </Link>
          )
        },
      },
    },
  ]
  const orders = [
    {
      name: 'orderNumber', // field name in the row object
      label: 'Order Number', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = agentOrders[dataIndex]
          return (
            <Link
              to={{
                pathname: `/order/details/${order.id}`,
                state: {
                  id: order.id,
                  order,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${order?.orderNumber}`}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'status', // field name in the row object
      label: 'Order Status', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = agentOrders[dataIndex]
          return (
            <Link
              to={{
                pathname: `/order/details/${order.id}`,
                state: {
                  id: order.id,
                  order,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h5 className='my-0'>{order?.status}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'totalPrice', // field name in the row object
      label: 'Total price', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = agentOrders[dataIndex]
          return (
            <Link
              to={{
                pathname: `/order/details/${order.id}`,
                state: {
                  id: order.id,
                  order,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h6>{order?.totalPrice}</h6>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let order = agentOrders[dataIndex]
          return (
            <Link
              to={{
                pathname: `/order/details/${order.id}`,
                state: {
                  id: order.id,
                  order,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'> {order?.date}</h5>
              </div>
            </Link>
          )
        },
      },
    },
  ]
  const onChangePage = (page) => {
    dispatch(getAgentOrders(id, page))
    setPage(page)
  }

  const onDeactivateAccount = (id, action) => {
    if (agentDetails.status === 'ACTIVE') {
      dialog
        .confirm('Are you sure you want to deactivate this agent account?')
        .then(() =>
          http.patch(`/afrimash/agents/${id}/status/SUSPENDED`).then((res) => {
            if (res.status === 200) {
              setAgentStatus('SUSPENDED')
            }
          })
        )
        .catch((error) => console.error(error))
    } else if (
      agentDetails.status === 'SUSPENDED' ||
      agentDetails.status === 'IN_ACTIVE'
      || agentDetails.status === 'PENDING'
    ) {
      dialog
        .confirm('Activate Agent account?')
        .then(() =>
          http.patch(`/afrimash/agents/${id}/status/ACTIVE`).then((res) => {
            if (res.status === 200) {
              setAgentStatus('ACTIVE')
            }
          })
        )
        .catch((error) => console.log(error))
    } else {
      return
    }
  }

  const generateAgentAccount = (id) => {
    if (agentDetails.virtualAccount === null) {
      http
        .patch(`/afrimash/agents/${id}/provision-virtual-account`)
        .then((res) => {
          if (res.status === 200) {
            setAgentStatus('Acount_created')
          }
        })
    }
  }
  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Agent', path: '/agents' },
            { name: 'View Agent' },
          ]}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SimpleCard>
            <div className='flex flex-space-between flex-middle'>
              <h5 className='pl-4 text-left'>Agent Details</h5>
              <div>
                {agentDetails.virtualAccount === null && (
                  <Button
                    onClick={() => generateAgentAccount(agentDetails.id)}
                    variant='contained'
                    color='primary'
                    className='mr-4'
                  >
                    Generate Account
                  </Button>
                )}
                <Button
                  onClick={() => onDeactivateAccount(agentDetails.id)}
                  variant={
                    agentDetails.status === 'ACTIVE' ? `outlined` : 'contained'
                  }
                  disabled={
                    !agentDetails.status === 'ACTIVE' ||
                    !agentDetails.status === 'SUSPENDED' ||
                    !agentDetails.status === 'IN_ACTIVE'
                  }
                  className={`deactivate-button ${agentDetails.status}`}
                >
                  {agentDetails.status === 'ACTIVE'
                    ? 'Deactivate Account'
                    : 'Activate Agent'}
                </Button>
              </div>
            </div>
            <Divider className='mt-4' />
            <Table className='mb-4'>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-4'>Agent Name</TableCell>
                  <TableCell>
                    <h5 className='mt-4 mb-2'>
                      {`${agentDetails && agentDetails.firstName} ${
                        agentDetails.lastName
                      }`}
                    </h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Email</TableCell>
                  <TableCell>
                    <div>{agentDetails.email}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Phone Number</TableCell>
                  <TableCell>
                    <div>{agentDetails.mobileNo}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Virtual Account</TableCell>
                  <TableCell>
                    <div>{agentDetails && agentDetails['virtualAccount']}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Agent State</TableCell>
                  <TableCell>
                    <div>{agentDetails && agentDetails['state']}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Agent Type</TableCell>
                  <TableCell>
                    <div>
                      {agentDetails && agentDetails['agentType'] === 'BD_AGENT'
                        ? 'BDA AGENT'
                        : 'LEAD AGENT'}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Agent Status</TableCell>
                  <TableCell>
                    <div>
                      {agentDetails?.status}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SimpleCard>
          <Divider />
          <Box mt={5}>
            <SimpleCard>
              <MUIDataTable
                title={'Agent Customers'}
                data={agentCustomers}
                columns={columns}
                options={{
                  onRowsDelete: (data) =>
                    dialog
                      .confirm('Are you sure you want to delete?')
                      .then((value) => console.log('delete'))
                      .catch(() => {
                        return false
                      }),
                  filterType: 'textField',
                  responsive: 'standard',
                  elevation: 5,
                  rowsPerPageOptions: [10, 20, 40, 80, 100],
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
                        />
                      </Grow>
                    )
                  },
                }}
              />
            </SimpleCard>
          </Box>
          <Box mt={5}>
            <SimpleCard>
              <MUIDataTable
                title={'Agent Orders'}
                data={agentOrders}
                columns={orders}
                options={{
                  onRowsDelete: (data) =>
                    dialog
                      .confirm('Are you sure you want to delete?')
                      .then((value) => console.log('delete'))
                      .catch(() => {
                        return false
                      }),
                  filterType: 'textField',
                  responsive: 'standard',
                  elevation: 5,
                  rowsPerPage: 50,
                  serverSide: true,
                  count,
                  page,
                  filter: 'disabled',
                  onTableChange: (action, tableState) => {
                    if (action === 'changePage') {
                      onChangePage(tableState.page)
                    }
                  },
                  rowsPerPageOptions: [10, 20, 40, 80, 100],
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
                        />
                      </Grow>
                    )
                  },
                }}
              />
            </SimpleCard>
          </Box>
        </>
      )}
    </div>
  )
}

export default AgentsInfo
