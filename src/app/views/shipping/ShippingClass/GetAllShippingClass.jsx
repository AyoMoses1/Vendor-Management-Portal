import React, { useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import http from '../../../services/api'
import { useDialog } from 'muibox'

import Loading from 'matx/components/MatxLoadable/Loading'
import Notification from 'app/components/Notification'
import '../styles.css';

const GetAllShippingClass = () => {
  const [shippinClasses, setShippingClasses] = React.useState([])
  const history = useHistory()
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [severity, setSeverirty] = React.useState('')
  const dialog = useDialog()

  const getAllShippingClasses = () => {
    setLoading(true)
    http.get('/afrimash/shipping-class').then((res) => {
      setShippingClasses(res?.data.object)
      setLoading(false)
    })
  }

  useEffect(() => {
    getAllShippingClasses()
  }, [])

  const columns = [
    {
      name: 'priority', // field name in the row object
      label: 'Priority', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingClass = shippinClasses[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-class/details`,
                state: {
                  id: shippingClass.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingClass?.priority}`}</p>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingClass = shippinClasses[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-class/details`,
                state: {
                  id: shippingClass.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingClass?.name}`}</p>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'description', // field name in the row object
      label: 'Description', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingClass = shippinClasses[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-class/details`,
                state: {
                  id: shippingClass.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'></p>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'id', // field name in the row object
      label: 'ID', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingClass = shippinClasses[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-class/details`,
                state: {
                  id: shippingClass.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'></div>
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
          let user = shippinClasses[dataIndex]
          return (
            <div className='flex items-center'>
              <div>
                <IconButton
                  onClick={() =>
                    dialog
                      .confirm('Are you sure you want to delete?')
                      .then((value) => {
                        http
                          .delete(`afrimash/shipping-class/${user.id}`)
                          .then(() => {
                            getAllShippingClasses()
                          })
                      })
                      .catch(() => {
                        return false
                      })
                  }
                >
                  <Icon>delete</Icon>
                </IconButton>
              </div>
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
          let shippingClass = shippinClasses[dataIndex]
          return (
            <div className='flex items-center ml-10'>
              <Link
                to={{
                  pathname: `/shipping-class/new`,
                  state: {
                    id: shippingClass.id,
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
            { name: 'Shipping Class', path: '/shipping-classes' },
            { name: 'Shipping Class' },
          ]}
        />
        {severity === 'error' && (
          <Notification alert={error} severity={severity || ''} />
        )}
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750 shipping-tables'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'Shipping Classes'}
              data={shippinClasses}
              columns={columns}
              options={{
                filter: true,
                sort: true,
                sortOrder: { name: 'id', direction: 'desc' },
                filterType: 'dropdown',
                responsive: 'standard',
                elevation: 0,
                selectableRows: false,
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
                        pathname: '/shipping-class/new',
                        state: {},
                      }}
                    >
                      <Button variant='contained' color='primary'>
                        Create new Class
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

export default GetAllShippingClass
