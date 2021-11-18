import React, { useEffect } from 'react'
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import { SimpleCard, Breadcrumb } from 'matx'

import { useDispatch, useSelector } from 'react-redux'
import { getAgentById } from 'app/redux/actions/agents-action'
import Loading from 'matx/components/MatxLoadable/Loading'

const AgentsInfo = ({ location, match }) => {
  const dispatch = useDispatch()
  const { id } = location.state

  const agentDetail = useSelector((state) => state.agentDetails)
  const { agentDetails, error, loading, severity } = agentDetail

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAgentById(id))
    }, 1500)
  }, [dispatch, id])

  console.log(agentDetails)
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
            <h1 className='pl-4 text-center'>Agent Details</h1>
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
          {/* <SimpleCard>
            <h1 className='pl-4 text-center'>Agent User's</h1>
            <Divider />
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className='pl-4'>Username</TableCell>
                  <TableCell>{agentDetails['user'].username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='pl-4'>Firstname</TableCell>
                  <TableCell>
                    {agentDetails['user']?.firstName || '----'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </SimpleCard> */}
          <SimpleCard>
            <h1 className='pl-4 text-center'>Agent Adress</h1>
            <Divider />
            <Table>
              {/* <TableBody>
                {agentDetails &&
                  agentDetails?.deliveryAddresses.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className='pl-4'>{`Address ${
                        idx + 1
                      }`}</TableCell>
                      <TableCell>
                        {item.address || '----'} {item.state || '----'}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody> */}
            </Table>
          </SimpleCard>
        </>
      )}
    </div>
  )
}

export default AgentsInfo
