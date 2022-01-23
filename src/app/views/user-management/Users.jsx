import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Notification from '../../components/Notification'

import { getAllUser } from './UserService'
import Loading from 'matx/components/MatxLoadable/Loading'

const Users = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [userList, setUserList] = useState([])
  const [loading, isLoading] = useState()
  const [alert, setAlert] = useState('')
  const [severity, setSeverity] = useState('')
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    getAllUser(setUserList, isLoading, setAlert, setSeverity, setCount, page)
    console.log(userList)
    return () => setIsAlive(false)
  }, [isAlive, page])

  const onPageChange = (page) => {
    getAllUser(setUserList, isLoading, setAlert, setSeverity, setCount, page)
    setPage(page)
  }

  const columns = [
    {
      name: 'firstname', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <Link
              to={{
                pathname: '/user/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${user?.firstName || 'N/A'} ${
                  user?.lastName || 'N/A'
                }`}</h5>
                <small className='text-muted'>{user?.email}</small>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'phoneNo',
      label: 'Phone Number',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <Link
              to={{
                pathname: '/user/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'>{user.phoneNo || '-----'}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          let role = user.role?.name
          return (
            <Link
              to={{
                pathname: '/user/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'>
                  {' '}
                  {role?.substr(5) || '-----'}
                </h5>
              </div>
            </Link>
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
                  pathname: '/user/edit',
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
          return (
            <div>{/* <h5 className='my-0 text-15'>{`${user?.id}`}</h5> */}</div>
          )
        },
      },
    },
  ]

  return (
    <div className='m-sm-30'>
      {severity === 'error' && (
        <Notification severity={severity} alert={alert} />
      )}
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[{ name: 'Users', path: '/users' }, { name: 'Users' }]}
        />
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'All Users'}
              data={userList}
              columns={columns}
              options={{
                filterType: 'textField',
                responsive: 'standard',
                elevation: 0,
                serverSide: true,
                count,
                sort: true,
                sortOrder: { name: 'id', direction: 'desc' },
                page,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    onPageChange(tableState.page)
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
                        pathname: '/user/new',
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Users
