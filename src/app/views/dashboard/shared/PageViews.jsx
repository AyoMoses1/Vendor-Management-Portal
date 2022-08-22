import React from 'react'
import { Button, Card } from '@material-ui/core'
import DoughnutChart from '../../charts/echarts/Doughnut'

const PageViews = () => {
    return (
        <div>
            <Card elevation={3} className='p-20'>
                <div className='dropdown'>
                    <div className="analytics-title">Page Views <span><small>(live Report)</small></span></div>
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

export default PageViews
