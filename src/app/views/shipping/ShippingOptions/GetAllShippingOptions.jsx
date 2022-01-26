import React, { useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import http from '../../../services/api'

import Loading from 'matx/components/MatxLoadable/Loading'
import Notification from 'app/components/Notification'
import axios from 'axios'

const GetAllShippingOptions = () => {
  const [shippinOptions, setShippingOptions] = React.useState([])
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [severity, setSeverirty] = React.useState('')

  const getAllShippingOptions = async () => {
    setLoading(true)
    // http.get('/afrimash/shipping-option').then((res) => {
    //   console.log(typeof res.data)
    //   setShippingOptions(res?.data.object)
    //   setLoading(false)
    // })
    const token = localStorage.getItem('jwt_token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    await fetch('https://api.afrimash.com/afrimash/shipping-option', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      const result = await res.json()
      console.log(result)
    })
  }

  useEffect(() => {
    getAllShippingOptions()
  }, [])

  const columns = [
    {
      name: 'methodCondition', // field name in the row object
      label: 'Method Condition', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingOptions = shippinOptions[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/`,
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingOptions.methodCondition}`}</p>
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
          const shippingZone = shippinOptions[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/`,
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingZone?.name}`}</p>
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
          const shippingZone = shippinOptions[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-class/details/`,
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingZone?.description}`}</p>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'shippingZone', // field name in the row object
      label: 'Shipping Zone', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingZone = shippinOptions[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/`,
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingZone?.shippingZone.name}`}</p>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'shippingZone', // field name in the row object
      label: 'Shipping Zone', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingZone = shippinOptions[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/`,
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingZone?.shippingClass.name}`}</p>
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
          const shippingClass = shippinOptions[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-option/details/`,
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-10'>{`${shippingClass?.id}`}</h5>
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
            { name: 'Shipping Options', path: '/shipping-option' },
            { name: 'Shipping Options' },
          ]}
        />
        {severity === 'error' && (
          <Notification alert={error} severity={severity || ''} />
        )}
      </div>
      <div className='overflow-auto'>
        <div className='min-w-750'>
          {loading ? (
            <Loading />
          ) : (
            <MUIDataTable
              title={'Shipping Options'}
              data={shippinOptions}
              columns={columns}
              options={{
                // onRowsDelete: (data) =>
                //   dialog
                //     .confirm('Are you sure you want to delete?')
                //     .then((value) => console.log('delete'))
                //     .catch(() => {
                //       return false
                //     }),
                // count,
                // page,
                // onTableChange: (action, tableState) => {
                //   if (action === 'changePage') {
                //     onPageChange(tableState.page)
                //   }
                // },
                filter: true,
                sort: true,
                sortOrder: { name: 'id', direction: 'desc' },
                filterType: 'dropdown',
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
                        pathname: '/shipping-option/new',
                        state: {},
                      }}
                    >
                      <Button variant='contained' color='primary'>
                        Create new shipping option
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

export default GetAllShippingOptions
