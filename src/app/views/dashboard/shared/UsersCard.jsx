import React from 'react'
import { Button, Card } from '@material-ui/core'
import DateRangePickerComponent from './DateRangePicker'
import PieChart from 'app/views/charts/echarts/PieChart'

const UsersCard = () => {
    const setSelectedDate = (date) => {
        console.log(date);
    }
    const colorPalette = ['#5E8C0F', '#0F4E08'];

    return (
        <div>
            <Card elevation={3} className='p-20'>
                <div className='dropdown'>
                    <div className="analytics-title">Users</div>
                    <DateRangePickerComponent setSelectedDate={setSelectedDate} />
                </div>
                <PieChart
                    height='300px'
                    option={{
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            itemGap: 4
                        },
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: '50%',
                                data: [
                                    { value: 402, name: 'New Users' },
                                    { value: 958, name: 'Returning Users' },
                                ],
                                color: colorPalette,
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    }}
                />
            </Card>
        </div>
    )
}

export default UsersCard
