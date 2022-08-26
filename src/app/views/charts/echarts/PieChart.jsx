import React from "react";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";
import { merge } from 'lodash'

const PieChart = ({ height, option, theme }) => {
  const defaultOption = {
    legend: {
      show: true,
      icon: "circle",
      // bottom: 0,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 10,
        fontFamily: "roboto"
      }
    },
    series: [
      {
        avoidLabelOverlap: false,
        hoverOffset: 5,
        stillShowZeroSum: false,
        label: {
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "10",
              fontWeight: "normal"
            },
            formatter: "{b} \n{c} ({d}%)"
          }
        },
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={merge({}, defaultOption, option)}
    />
  );
};

export default withStyles({}, { withTheme: true })(PieChart);
