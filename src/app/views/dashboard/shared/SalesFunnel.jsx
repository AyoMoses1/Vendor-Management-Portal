import React, { Component } from "react";
import {
  Card,
  Button,
  Grid,
} from "@material-ui/core";
import SalesStatistics from "./SalesStatistics";
import SalesCard from "./SalesCard";
import DateRangePickerComponent from "./DateRangePicker";


const salesFunnels = [
  {
    amount: "13,432",
    label: "Total Visits",
  },

  {
    amount: "4.2K",
    label: "Product View",
  },

  {
    amount: "65",
    label: "Cart Visits",
  },

  {
    amount: "354",
    label: "Check Out Visits",
  },

  {
    amount: "287",
    label: "Purchase",
  },
]

const SalesFunnel = ({ theme }) => {
  const getDateRangeValue = (value) => {
    console.log(value);
  }
  return (
    <Card elevation={3} className="p-20 mb-24">
      <div className="dropdown">
        <div className="analytics-title mb-12">Sales Funnel</div>
          <DateRangePickerComponent getDateRangeValue={getDateRangeValue} />
      </div>
      <Grid container spacing={1}>
        <div className="wrapper">
          {salesFunnels.map((sales) => (
            <SalesCard key={sales.label} sales={sales} theme={theme} />
          ))}
        </div>
      </Grid>
    </Card>
  );
}

export default SalesFunnel;
