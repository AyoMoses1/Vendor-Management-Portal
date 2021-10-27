import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import http from '../../services/api'

const CustomerList = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    http.get(`/afrimash/customers`).then((response) => {
      let { data } = response
      console.log(data)
      if (isAlive) setUserList(data.object)
    })
    return () => setIsAlive(false)
  }, [isAlive])

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
        <div className='min-w-750'>
          <MUIDataTable
            title={'All Customers'}
            data={userList}
            columns={columns}
            options={{
              filterType: 'textField',
              responsive: 'standard',
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
                      onChange={({ target: { value } }) => handleSearch(value)}
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
                      pathname: '/customer/new',
                      state: {},
                    }}
                  >
                    <IconButton>
                      <Button variant='contained' color='primary'>
                        <Icon>add</Icon>Add New
                      </Button>
                    </IconButton>
                  </Link>
                )
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomerList
