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
  const { agentList, count, error, severity, loading } = agents
  const [id, setId] = React.useState(0)
  // const [count, setCount] = React.useState(0)
  const [page, setPage] = React.useState(0)

  const dialog = useDialog()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAgents(page))
  }, [dispatch])

  const onPageChange = (page) => {
    dispatch(getAllAgents(page))
    setPage(page)
  }
  const columns = [
    {
      name: 'id', // field name in the row object
      label: 'S/N', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          setId(user.id)
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-3'>
                <h5 className='my-0 text-15'>{`${user?.id}`}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'firstName', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          setId(user.id)
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
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
      label: 'Contact', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          setId(user.id)
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h6>
                  <strong>Email:</strong> {user?.email}
                </h6>
                <br />
                <h5 className='my-0'>Phone: {user?.mobileNo}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'agentType', // field name in the row object
      label: 'Agent Type', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          setId(user.id)
          return (
            <Link
              to={{
                pathname: `/agent/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='ml-10'>
                <h5 className='my-0'>
                  {user?.agentType === 'BD_AGENT' ? 'BDA AGENT' : 'LEAD AGENT'}
                </h5>
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
                pathname: `/agent/details/${user.id}`,
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
    {
      name: 'action',
      label: ' ',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          let user = agentList[dataIndex]
          return (
            <div>
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
                count,
                page,
                onTableChange: (action, tableState) => {
                  if (action === 'changePage') {
                    onPageChange(tableState.page)
                  }
                },
                filter: true,
                sort: true,

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
                        pathname: '/agent/new',
                        state: {},
                      }}
                    >
                      <Button variant='contained' color='primary'>
                        Add New
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
