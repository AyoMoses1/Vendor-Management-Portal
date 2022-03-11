import React, { useEffect , useState} from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import http from '../../../services/api'
import { useDialog } from 'muibox'

import Loading from 'matx/components/MatxLoadable/Loading'
import Notification from 'app/components/Notification'
import { getShippingOptionGroup } from 'app/redux/actions/shippingActions'
import { useDispatch, useSelector } from 'react-redux'

const GetAllShippingClass = () => {

const shippingOptionGroupList = useSelector((state) => state.shippingOptionGroupList)
const {loading, shipping, error} = shippingOptionGroupList


  const history = useHistory()

  const [severity, setSeverirty] = React.useState('')
  const dialog = useDialog()


const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(getShippingOptionGroup({}))
  }, [])

  const columns = [

    {
      name: 'name', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          const shippingGroup = shipping[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-group/details`,
                state: {
                  id: shippingGroup.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${shippingGroup?.name}`}</p>
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
          const ShippingGroup = shipping[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-group/details`,
                state: {
                  id: ShippingGroup.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <p className='my-0 text-10'>{`${ShippingGroup?.description}`}</p>
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
          const ShippingGroup = shipping[dataIndex]
          return (
            <Link
              to={{
                pathname: `/shipping-group/details`,
                state: {
                  id: ShippingGroup.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>{`${ShippingGroup?.id}`}</div>
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
          let user = shipping[dataIndex]
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
                          .then(() => window.location.reload())
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
          let shippingGroup = shipping[dataIndex]
          return (
            <div className='flex items-center ml-10'>
              <Link
                to={{
                  pathname: `/shipping-group/new`,
                  state: {
                    id: shippingGroup.id,
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
            { name: 'Shipping Group', path: '/shipping-group' },
            { name: 'Shipping Group' },
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
              title={'Shipping Option Group'}
              data={shipping}
              columns={columns}
              options={{
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
                        pathname: '/shipping-groups/new',
                        state: {},
                      }}
                    >
                      <Button variant='contained' color='primary'>
                        Create new Group
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