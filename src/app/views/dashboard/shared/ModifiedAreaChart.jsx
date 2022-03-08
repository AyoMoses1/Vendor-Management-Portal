import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { merge } from 'lodash'

const defaultOption = {
  grid: {
    top: 16,
    left: 36,
    right: 16,
    bottom: 32,
  },
  legend: {},
  tooltip: {
    show: true,
    trigger: 'axis',

    axisPointer: {
      type: 'cross',
      lineStyle: {
        opacity: 0.7,
      },
    },
    crossStyle: {
      color: '#FFAF0F',
    },
  },
  series: [
    {
      areaStyle: {},
      smooth: true,
      lineStyle: {
        width: 4,
        color: '#34812a',
      },
    },
  ],
  xAxis: {
    show: true,
    type: 'category',
    showGrid: false,
    boundaryGap: false,
    axisLabel: {
      color: '#000',
      margin: 20,
      fontSize: 14,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    min: 10,
    max: 60,
    axisLabel: {
      color: '#000',
      margin: 20,
      fontSize: 15,
      fontFamily: 'roboto',
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: '#edf2f4',
      },
    },

    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  color: [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#363636', // color at 0% position
        },
        {
          offset: 1,
          color: '#a39e9e', // color at 100% position
        },
      ],
      global: false, // false by default
    },
  ],
}

const ModifiedAreaChart = ({ height, option }) => {
  return (
    <ReactEcharts
      style={{ height: height }}
      option={merge({}, defaultOption, option)}
    />
  )
}

export default ModifiedAreaChart
