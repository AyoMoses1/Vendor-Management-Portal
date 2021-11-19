import React from 'react'
import { Breadcrumb, SimpleCard } from 'matx'
import AgentForm from './AgentForm'

function NewAgent({ location }) {
  return (
    <div className='m-sm-30'>
      <div className='mb-sm-30'>
        <Breadcrumb
          routeSegments={[
            { name: 'Products', path: '/agents' },
            { name: 'New Agent' },
          ]}
        />
      </div>
      <SimpleCard title='Add New Agent'>
        <AgentForm />
      </SimpleCard>
    </div>
  )
}

export default NewAgent
