import React from 'react'

import { MatxProgressBar } from 'matx'
import { Card } from '@material-ui/core'

const MostViewed = () => {
  return (
    <div>
      <Card elevation={3} className='p-10'>
        <div className='card-title'>Most Viewed</div>
        <small className='text-muted'>Today</small>
        <div className='pt-8' />
        <MatxProgressBar value={75} color='primary' text='Google (102k)' />
        <div className='py-4' />
        <MatxProgressBar value={45} color='secondary' text='Twitter (40k)' />
        <div className='py-4' />
        <MatxProgressBar value={75} color='primary' text='Facebook (80k)' />

        <div className='py-12' />
        <small className='text-muted'>Yesterday</small>
        <div className='pt-8' />
        <MatxProgressBar value={75} color='primary' text='Google (102k)' />
        <div className='py-4' />
        <MatxProgressBar value={45} color='secondary' text='Twitter (40k)' />
        <div className='py-4' />
        <MatxProgressBar value={75} color='primary' text='Facebook (80k)' />
      </Card>
    </div>
  )
}

export default MostViewed
