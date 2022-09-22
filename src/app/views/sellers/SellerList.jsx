import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import http from '../../services/api'
import { useDialog } from 'muibox'
import './Sellerform.scss'
import Notification from '../../components/Notification'
import { getAllSeller } from './SellerService'
import Loading from 'matx/components/MatxLoadable/Loading'

const SellerList = () => {
  const [isAlive, setIsAlive] = useState(true)
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)

  const [severity, setSeverity] = useState('')
  const [alert, setAlert] = useState('')

  const dialog = useDialog()

  useEffect(() => {
    getAllSeller(setLoading, setUserList, setAlert, setSeverity)
    return () => setIsAlive(false)
  }, [isAlive])

  const columns = [
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]

          return (
            <Link
              to={{
                pathname: '/vendor/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'>{`${user?.name || '-------'}`}</h5>
              </div>
            </Link>
          )
        },
      },
    },

    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <Link
              to={{
                pathname: '/vendor/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'> {user.email || '-----'}</h5>
              </div>
            </Link>
          )
        },
      },
    },

    {
      name: 'phoneno',
      label: 'Phone Number',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <Link
              to={{
                pathname: '/vendor/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'> {user.mobileNo || '-----'}</h5>
              </div>
            </Link>
          )
        },
      },
    },

    {
      name: 'store',
      label: 'Store',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = userList[dataIndex]
          return (
            <div className='flex items-center'>
              <Link
                to={{
                  pathname: '/vendor/details',
                  state: {
                    id: user.id,
                  },
                }}
                className='ml-3'
              >
                  <span className='my-0 text-15'> {user.name || '-----'}</span>
                
              </Link>
            </div>
          );
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
            <Link
              to={{
                pathname: '/vendor/details',
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-muted'>{user.state || '-----'}</h5>
              </div>
            </Link>
          )
        },
      },
    },

    // {
    //   name: 'action',
    //   label: ' ',
    //   options: {
    //     filter: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       let user = userList[dataIndex]
    //       return (
    //         <div className='flex items-center'>
    //           <Link
    //             to={{
    //               pathname: '/vendor/edit',
    //               state: {
    //                 id: user.id,
    //                 user,
    //               },
    //             }}
    //           >
    //             <IconButton>
    //               <Icon>edit</Icon>
    //             </IconButton>
    //           </Link>
    //         </div>
    //       )
    //     },
    //   },
    // },
  ]
  const notification = () => {
    return <Notification alert={alert} severity={severity && severity} />
  }
  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Vendors', path: '/vendors' },
            { name: 'Vendors' },
          ]}
        />
      </div>
      {severity === 'error' && notification()}
      <div className='overflow-auto'>
        <div className='min-w-750 vendor-table'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'All Vendors'}
              data={userList}
              columns={columns}
              options={{
                onRowsDelete: (data) =>
                  dialog
                    .confirm('Are you sure you want to delete?')
                    .then((value) => value)
                    .catch(() => {
                      return false
                    }),
                filterType: 'textField',
                responsive: 'standard',
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
                    <Link
                      to={{
                        pathname: '/vendor/new',
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

export default SellerList
