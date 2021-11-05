import React, { useEffect } from 'react'
import { Breadcrumb } from 'matx'
import MUIDataTable from 'mui-datatables'
import { Grow, Icon, IconButton, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAgents } from 'app/redux/actions/agents-action'
import { useDialog } from 'muibox'
import './style.scss'
import Loading from 'matx/components/MatxLoadable/Loading'
import Notification from 'app/components/Notification'

const Agents = () => {
  const agents = useSelector((state) => state.agents)
  const { agentList, error, severity, loading } = agents
  const [id, setId] = React.useState(0)

  const dialog = useDialog()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAgents())
  }, [dispatch])

  const columns = [
    {
      name: 'firstname', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          setId(user.id)
          return (
            <Link
              to={{
                pathname: `/agent/${user.id}`,
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${user?.firstName} ${user?.lastName}`}</h5>
                <small className='text-muted'>{user?.email}</small>
                <br />
                <small className='text-muted'>{user?.mobileNo}</small>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'deliveryAddresses',
      label: 'Delivery Address',
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          let address = user.deliveryAddresses.map((name) => name.address)
          let state = user.deliveryAddresses.map((name) => name.state)
          return (
            <Link
              to={{
                pathname: `/agent/${user.id}`,
                state: {
                  id: user.id,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3 w-50'>
                <p className='my-0 text-overflow text-muted'>
                  {address && address.join(' , ')}
                </p>
                <strong className='my-0 text-overflow text-muted'>
                  {state && state.join(' , ')}
                </strong>
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
          let user = agentList[dataIndex]
          return (
            <Link
              to={{
                pathname: `/agent/${user.id}`,
                state: {
                  id: user.id,
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
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          return (
            <div className='flex items-center'>
              <div className='flex-grow'></div>
              <Link
                to={{
                  pathname: '/agent/edit',
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
            { name: 'Agents', path: '/agents' },
            { name: 'Agent' },
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
              title={'All Agents'}
              data={agentList}
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
                        pathname: '/agent/new',
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

export default Agents
