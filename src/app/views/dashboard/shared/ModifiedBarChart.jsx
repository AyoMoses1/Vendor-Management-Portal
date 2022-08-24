import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { merge } from 'lodash'

const defaultOption = {
    grid: {
        top: 20,
        right: 16,
        bottom: 64,
        left: 64,
    },
    legend: {},
    tooltip: {
        show: true,
        trigger: 'axis',
        crossStyle: {
            color: '#FFAF0F',
        },
    },
    series: [
        {
            smooth: true,
            itemStyle: {
                width: 1,
                color: '#A4C46E',
            },
            barWidth: '40%',
        },
    ],
    xAxis: {
        show: true,
        type: 'category',
        showGrid: true,
        axisLabel: {
            color: '#6A717D',
            margin: 20,
            fontSize: 12,
        },
        name: 'Month',
        nameLocation: 'middle',
        nameGap: 50,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#EEF0F3'
            }
        }
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#6A717D',
            margin: 20,
            fontSize: 12,
            fontFamily: 'roboto',
        },
        name: 'Naira',
        nameLocation: 'middle',
        nameGap: 50,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#EEF0F3'
            }
        }
    },
}

const ModifiedBarChart = ({ height, option }) => {
    return (
        <ReactEcharts
            style={{ height: height }}
            option={merge({}, defaultOption, option)}
        />
    )
}

export default ModifiedBarChart
