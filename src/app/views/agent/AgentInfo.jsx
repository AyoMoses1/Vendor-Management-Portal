import React, { useEffect } from 'react'
import {
  Divider,
  Table,
  TextField,
  Grow,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'

import { useDialog } from 'muibox'

import { SimpleCard, Breadcrumb } from 'matx'

import { useDispatch, useSelector } from 'react-redux'
import {
  getAgentById,
  getAgentCustomers,
} from 'app/redux/actions/agents-action'
import Loading from 'matx/components/MatxLoadable/Loading'

const AgentsInfo = ({ location, match }) => {
  const dispatch = useDispatch()
  const { id, agentCode } = location.state
  const dialog = useDialog()

  const agentDetail = useSelector((state) => state.agentDetails)
  const agentCustomerList = useSelector((state) => state.agentCustomers)

  const { agentDetails, error, loading, severity } = agentDetail
  const { agentCustomers } = agentCustomerList

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAgentById(id))
      dispatch(getAgentCustomers(agentCode))
    }, 1500)
  }, [dispatch, id, agentCode])

  const columns = [
    {
      name: 'firstname', // field name in the row object
      label: 'Name', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentCustomers[dataIndex]
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
      label: 'Phone', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentCustomers[dataIndex]

          return (
            <Link
              to={{
                pathname: `/customer/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h5 className='my-0'>{user?.mobileNo}</h5>
              </div>
            </Link>
          )
        },
      },
    },
    {
      name: 'email', // field name in the row object
      label: 'Email', // column title that will be shown in table
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) => {
          let user = agentCustomers[dataIndex]

          return (
            <Link
              to={{
                pathname: `/customer/details/${user.id}`,
                state: {
                  id: user.id,
                  agentCode: user.agentCode,
                },
              }}
              className='flex items-center'
            >
              <div className='w-220'>
                <h6>{user?.email}</h6>
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
          let user = agentCustomers[dataIndex]
          return (
            <Link
              to={{
                pathname: `/customer/details/${user.id}`,
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
  ]
  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Agent', path: '/agents' },
            { name: 'View Agent' },
          ]}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SimpleCard>
            <h5 className='pl-4 text-left'>Agent Details</h5>
            <Divider />
            <Table className='mb-4'>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-4'>Agent Name</TableCell>
                  <TableCell>
                    <h5 className='mt-4 mb-2'>
                      {`${agentDetails && agentDetails.firstName} ${
                        agentDetails.lastName
                      }`}
                    </h5>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Email</TableCell>
                  <TableCell>
                    <div>{agentDetails.email}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Phone Number</TableCell>
                  <TableCell>
                    <div>{agentDetails.mobileNo}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>State</TableCell>
                  <TableCell>
                    <div>{agentDetails && agentDetails['state']}</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Agent Type</TableCell>
                  <TableCell>
                    <div>
                      {agentDetails && agentDetails['agentType'] === 'BD_AGENT'
                        ? 'BDA AGENT'
                        : 'LEAD AGENT'}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SimpleCard>
          <SimpleCard>
            <MUIDataTable
              title={'Agent Customers'}
              data={agentCustomers}
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
                      />
                    </Grow>
                  )
                },
              }}
            />
          </SimpleCard>
        </>
      )}
    </div>
  )
}

export default AgentsInfo
