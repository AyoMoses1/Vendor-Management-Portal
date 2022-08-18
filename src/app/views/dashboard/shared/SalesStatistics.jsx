import React, { Component } from "react";
import ModifiedAreaChart from "./ModifiedAreaChart";

const SalesStatistics = () => {
  return (
    <div elevation={3} className="pt-20">
      <div className="card-title mb-12">Sales Statistics</div>
      <div className="overflow-auto">
        <div className='pb-86 pt-30 px-30 bg-analytics'>
          <ModifiedAreaChart
            height='280px'
            option={{
              series: [
                {
                  data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
                  type: 'line',
                },
              ],
              xAxis: {
                data: [
                  'Jan',
                  'Feb',
                  'Mar',
                  'Apr',
                  'May',
                  'Jun',
                  'Jul',
                  'Aug',
                  'Sep',
                  'Oct',
                  'Nov',
                  'Dec',
                ],
              },
            }}
          ></ModifiedAreaChart>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
