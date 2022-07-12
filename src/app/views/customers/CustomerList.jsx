import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Loading from 'matx/components/MatxLoadable/Loading'
import './customer-view.css'

import Notification from '../../components/Notification'
import { getAllCustomer } from './CustomerService'

const CustomerList = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [userList, setUserList] = useState([])

  const [loading, isLoading] = useState(false)
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')
  const [source, setSource] = useState('')

  const sourceTypes = [
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
    {
      type: 'IVR',
      value: 'IVR',
    },
    {
      type: 'SMS',
      value: 'SMS',
    },
  ]

  useEffect(() => {
    getAllCustomer(setUserList, isLoading, setAlert, setSeverity, source)
    return () => setIsAlive(false)
  }, [isAlive, source])

  console.log({ userList })
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
                <h5 className='my-0 text-15'>{`${user?.firstName} ${user?.lastName}`}</h5>
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
                <h5 className='my-0 text-muted'>{user.address || '-----'}</h5>
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
                <h5 className='my-0 text-muted'> {user.mobileNo || '-----'}</h5>
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
                  <Icon>edit</Icon>
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
          let user = userList[dataIndex]
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  user: user.user,
                },
              }}
            >
              <div>
                {/* <h5 className='my-0 text-15'>{`${user?.id}`}</h5> */}
              </div>
            </Link>
          )
        },
      },
    },
  ]

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
        <div className='min-w-750'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'All Customers'}
              data={userList}
              columns={columns}
              options={{
                filterType: 'textField',
                responsive: 'standard',
                sort: true,
                sortOrder: { name: 'id', direction: 'desc' },
                //   selectableRows: "none", // set checkbox for each row
                //   search: false, // set search option
                //   filter: false, // set data filter option
                //   download: false, // set download option
                //   print: false, // set print option
                //   pagination: true, //set pagination option
                //   viewColumns: false, // set column option
                elevation: 0,
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
                          pathname: '/customer/new',
                          state: {},
                        }}
                      >
                        <IconButton>
                          <Button variant='contained' color='primary'>
                            Add New
                          </Button>
                        </IconButton>
                      </Link>
                      <div className='w-full flex-end flex'>
                        <div className='w-220 flex-end'>
                          <TextField
                            className='mb-4'
                            name='mobileNo'
                            label='Filter by source'
                            variant='outlined'
                            margin='normal'
                            select
                            fullWidth
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                          >
                            {sourceTypes.map((sourceType, idx) => (
                              <MenuItem key={idx} value={sourceType.value}>
                                {sourceType.type}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </div>
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
