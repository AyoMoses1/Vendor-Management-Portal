import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from 'matx/components/MatxLoadable/Loading'
import './customer-view.css'
// import { deleteUser } from '../user-management/UserService'
import { useDialog } from 'muibox'

import Notification from '../../components/Notification'
import { filterAllCustomer, getAllCustomer } from './CustomerService';
import { getCustomerStatistics } from '../dashboard/DashboardService'
import { debounce } from 'lodash'

const CustomerList = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [userList, setUserList] = useState([])

  const [loading, isLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')
  const [source, setSource] = useState('ALL')
  const [title, setTitle] = useState('All Customers')
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10);
  const [statistics, setStatistics] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState('');

  // const dialog = useDialog()

  const sourceTypes = [
    {
      type: 'ALL CUSTOMERS',
      value: 'ALL',
      name: 'All Customers'
    },
    {
      type: 'USSD',
      value: 'USSD',
      name: 'USSD'
    },
    {
      type: 'ADMIN',
      value: 'ADMIN',
      name: 'Admin'
    },
    {
      type: 'AGENT APP',
      value: 'AGENT_APP',
      name: 'Agent App'
    },
    {
      type: 'CUSTOMER APP',
      value: 'CUSTOMER_APP',
      name: 'Customer App'
    },
    {
      type: 'MARKET PLACE',
      value: 'MARKET_PLACE',
      name: 'Market Place'
    },
    {
      type: 'IVR',
      value: 'IVR',
      name: 'IVR'
    },
    {
      type: 'SMS',
      value: 'SMS',
      name: 'SMS'
    },
  ]

  const handleTitle = (value) => {
    const v = sourceTypes.find(s => s.value === value).name;
    setTitle(v);
  }

  useEffect(() => {
    const _source = source === 'ALL' ? '' : source;
    getAllCustomer(setUserList, setCount, isLoading, setAlert, setSeverity, size, page, _source, query)
    return () => setIsAlive(false)
  }, [isAlive, source, size]);

  useEffect(() => {
    getCustomerStatistics(setStatistics);
  }, [])

  useEffect(() => {
    if (statistics.length) {
      if (source === 'ALL') {
        setTotal(count);
      } else {
        const tempTotal = statistics.find(s => s.source === source)?.total ?? 0;
        setTotal(tempTotal);
      }
    }
  }, [statistics, source])

  const onPageChange = (page) => {
    const _source = source === 'ALL' ? '' : source;
    getAllCustomer(setUserList, setCount, isLoading, setAlert, setSeverity, size, page, _source, query)
    setPage(page)
  }

  const columns = [
    {
      name: 'firstName', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <h5 className='my-0 text-12 text-control'>{`${user?.firstName} ${user?.lastName}`}</h5>
                <small className='text-muted'>{user?.email}</small>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <h6 className='my-0 text-muted'>{user.address || '-----'}</h6>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'mobileNo',
      label: 'Phone Number',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <h5 className='my-0 text-muted ellipsis'> {user.mobileNo || '-----'}</h5>
              </Link>
            </div>
          )
        },
      },
    },
    {
      name: 'lastActivity',
      label: 'Last Active',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/customer/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                <h5 className='my-0 text-muted'>
                  {' '}
                  {user.lastActivity || '-----'}
                </h5>
              </Link>
            </div>
          )
        },
      },
    },
    // {
    //   name: 'delete',
    //   label: ' ',
    //   options: {
    //     filter: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       let user = userList[dataIndex]
    //       return (
    //         <div className='flex items-center'>
    //           <div>
    //             <IconButton
    //               onClick={() =>
    //                 dialog
    //                   .confirm(`Are you sure you want to delete ${user?.firstName || 'N/A'} ${user?.lastName || 'N/A'
    //                     }?`)
    //                   .then(async (value) => {
    //                     const result = await deleteUser(
    //                       user?.id,
    //                       isLoading,
    //                     ).then((res) => {
    //                       refresh();
    //                       // setAlertData({ success: true, text: 'User has been deleted successfully', title: 'User Deleted' })
    //                       // handleAlertModal();
    //                     }).catch((err) => {
    //                       // setAlertData({ success: false, text: 'Unable to delete user. Please try again', title: 'User Deleted' })
    //                       // handleAlertModal();
    //                     });
    //                   })
    //                   .catch(() => {
    //                     return false;
    //                   })
    //               }
    //             >
    //               <Icon>delete</Icon>
    //             </IconButton>
    //           </div>
    //         </div>
    //       )
    //     },
    //   },
    // },
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <div className='flex-grow'></div>
              <Link
                to={{
                  pathname: '/customer/edit',
                  state: {
                    id: user.id,
                    user,
                  },
                }}
              >
                <IconButton>
                  <Icon fontSize='small'>edit</Icon>
                </IconButton>
              </Link>
            </div>
          )
        },
      },
    },
    // {
    //   name: 'id', // field name in the row object
    //   label: '', // column title that will be shown in table
    //   options: {
    //     filter: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       let user = userList[dataIndex]
    //       return (
    //         <Link
    //           to={{
    //             pathname: `/agent/details/${user.id}`,
    //             state: {
    //               id: user.id,
    //               user: user.user,
    //             },
    //           }}
    //         >
    //           <div>
    //             <h5 className='my-0 text-15'>{`${user?.id}`}</h5>
    //           </div>
    //         </Link>
    //       )
    //     },
    //   },
    // },
  ]

  const debouncedCustomers = debounce(value => {
    const _source = source === 'ALL' ? '' : source;
    if (value.length > 0) {
      filterAllCustomer(setUserList, setCount, setAlert, setSeverity, size, page, _source, value);
      setQuery(value);
    } else {
      filterAllCustomer(setUserList, setCount, setAlert, setSeverity, size, page, _source, '');
      setQuery('');
    }
  }, 700);


  const performSearch = (value) => {
    debouncedCustomers(value)
  }

  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Customers', path: '/customers' },
            { name: 'Customer' },
          ]}
        />
      </div>
      <div className='overflow-auto'>
        {severity === 'error' && (
          <Notification alert={alert} severity={severity || ''} />
        )}
        <div className='min-w-750 customer-table'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={<div>
                <h4 className='mt-4 mb-0'>{title}</h4>
                <div className='w-full flex'>
                  <div className='w-220 flex-end sources'>
                    <TextField
                      className='mb-4'
                      name='mobileNo'
                      label='Filter by source'
                      variant='outlined'
                      margin='normal'
                      select
                      fullWidth
                      value={source}
                      onChange={(e) => { setSource(e.target.value); handleTitle(e.target.value) }}
                    >
                      {sourceTypes.map((sourceType, idx) => (
                        <MenuItem key={idx} value={sourceType.value}>
                          {sourceType.type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
              </div>}
              data={userList}
              columns={columns}
              options={{
                filter: false,
                responsive: 'standard',
                serverSide: true,
                count,
                sort: true,
                setTableProps: () => ({ className: "customer-table" }),
                selectableRows: false,
                sortOrder: { name: 'id', direction: 'desc' },
                elevation: 0,
                page,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    onPageChange(tableState.page)
                  }
                },
                rowsPerPageOptions: [10, 20, 40, 80, 100],
                rowsPerPage: size,
                onChangeRowsPerPage: (x) => {
                  setSize(x)
                },
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
                        onChange={({ target: { value } }) => {
                          handleSearch(value);
                          performSearch(value)
                        }
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
                            <IconButton onClick={() => {
                              hideSearch();
                              const _source = source === 'ALL' ? '' : source;
                              filterAllCustomer(setUserList, setCount, setAlert, setSeverity, size, page, _source, '');
                            }}>
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
                          pathname: '/customer/new',
                          state: {},
                        }}
                      >
                        <IconButton>
                          <Button variant='contained' color='primary'>
                            Add New
                          </Button>
                        </IconButton>
                        <div className='w-full pr-20 flex justify-end items-center'>
                          <p className='pr-10'>Total: </p>
                          <h6 className='mb-0'>{total}</h6>
                        </div>
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

export default CustomerList