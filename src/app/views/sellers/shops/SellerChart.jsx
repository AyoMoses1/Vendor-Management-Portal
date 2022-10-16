import React from 'react'
import PieChart from 'app/views/charts/echarts/PieChart'

function SellerChart() {

    const colorPalette = ['#16BFD6', '#9B51E0', '#F2994A'];

    return (
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
                            { value: 402, name: 'Cockerels' },
                            { value: 958, name: 'Turkeys' },
                            { value: 958, name: 'Broilers' },
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
    )
}

export default SellerChart