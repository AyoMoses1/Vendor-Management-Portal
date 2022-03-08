import React from 'react'
import { Breadcrumb, SimpleCard } from 'matx'
import AgentForm from './AgentForm'

const EditAgent = ({ location }) => {
  const { id, user } = location.state
  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Agents', path: '/agents' },
            { name: 'Edit Agent' },
          ]}
        />
      </div>
      <SimpleCard title='Edit Agent Details'>
        <AgentForm isEdit={true} id={id} agent={user} />
      </SimpleCard>
    </div>
  )
}

export default EditAgent
