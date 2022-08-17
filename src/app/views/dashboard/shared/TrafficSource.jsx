import React from 'react'
import { Card } from '@material-ui/core'
import DoughnutChart from '../../charts/echarts/Doughnut'

const TrafficSource = () => {
    return (
        <div>
            <Card elevation={3} className='p-10'>
                <div className='card-title'>Traffic Sources</div>
                <div className='card-subtitle'>Last 30 days</div>
                <DoughnutChart
                    height='300px'
                    color={['rgb(44, 102, 18)', ' rgb(149, 218, 117)', '#FFAF0F']}
                />
            </Card>
        </div>
    )
}

export default TrafficSource
