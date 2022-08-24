import React from 'react'
import { Button, Card } from '@material-ui/core'
import DoughnutChart from '../../charts/echarts/Doughnut'

const UsersCard = () => {
    return (
        <div>
            <Card elevation={3} className='p-20'>
                <div className='dropdown'>
                    <div className="analytics-title">Users</div>
                    <div>
                        <Button variant="outlined">Date Range</Button>
                    </div>
                </div>
                <DoughnutChart
                    height='300px'
                    color={['rgb(44, 102, 18)', ' rgb(149, 218, 117)', '#FFAF0F']}
                />
            </Card>
        </div>
    )
}

export default UsersCard
