import { MenuItem, TextField } from "@material-ui/core";
import React, { Component, useState } from "react";
import DateRangePickerComponent from "./DateRangePicker";
import ModifiedBarChart from "./ModifiedBarChart";
import Tabs from "./Tabs";

const tabs = [
  {
    id: 1,
    name: 'Income'
  },
  {
    id: 2,
    name: 'Sales'
  }
]

const years = [
  {
    type: '2019',
    value: '2019',
  },
  {
    type: '2020',
    value: '2020',
  },
  {
    type: '2021',
    value: '2021',
  },
  {
    type: '2022',
    value: '2022',
  },
]

const SalesStatistics = () => {
  const [yr, setYr] = useState('2022')
  const setSelectedDate = (date) => {
    console.log(date);
  }

  const handleTitle = (string) => {
    console.log(string);
  }

  const handleSetValue = (index) => {
    console.log(index);
  }

  return (
    <div elevation={3}>
      <div className="dropdown">
        <div className="analytics-title">Sales Statistics</div>
        {/* <DateRangePickerComponent setSelectedDate={setSelectedDate} /> */}

        <div className="year-dropdown">
          <TextField
            className='mb-4 filter-area'
            name='mobileNo'
            label='Set Year'
            variant='outlined'
            margin='normal'
            select
            value={yr}
            onChange={(e) => {
              setYr(e.target.value)
              handleTitle(e.target.value)
            }}
          >
            {years.map((year, idx) => (
              <MenuItem key={idx} value={year.value}>
                {year.type}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <Tabs tabs={tabs} setValue={handleSetValue} />
      <div className="overflow-auto">
        <div>
          <ModifiedBarChart
            height='280px'
            option={{
              xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  data: [
                    120,
                    150,
                    150,
                    80,
                    70,
                    110,
                    130,
                    {
                      value: 200,
                      itemStyle: {
                        color: '#5E8C0F'
                      }
                    },
                  ],
                  type: 'bar'
                }
              ]
            }}
          ></ModifiedBarChart>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
