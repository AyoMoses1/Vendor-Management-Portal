import React, { Component, useEffect, useState } from "react";
import { Card, Button, Grid } from "@material-ui/core";
import SalesStatistics from "./SalesStatistics";
import SalesCard from "./SalesCard";
import DateRangePickerComponent from "./DateRangePicker";

const salesFunnels = [
  {
    amount: 13432,
    label: "Total Visits",
  },

  {
    amount: 4200,
    label: "Product View",
  },

  {
    amount: 65,
    label: "Cart Visits",
  },

  {
    amount: 354,
    label: "Check Out Visits",
  },

  {
    amount: 287,
    label: "Purchase",
  },
];

const SalesFunnel = ({ theme }) => {
  const setSelectedDate = (date) => {
    console.log(date);
  };

  const [maxValue, setMaxValue] = useState(0);
  useEffect(() => {
    let maximum = 0;
    if (salesFunnels?.length) {
      for (let i = 0; i < salesFunnels.length; i++) {
        maximum = Math.max(maximum, salesFunnels[i].amount);
      }
    }
    console.log(maximum);
    setMaxValue(maximum);
  }, [salesFunnels]);

  return (
    <Card elevation={3} className="p-20 mb-24">
      <div className="dropdown">
        <div className="analytics-title">Sales Funnel</div>
        <DateRangePickerComponent setSelectedDate={setSelectedDate} />
      </div>
      <Grid container spacing={1}>
        <div className="wrapper">
          {salesFunnels.map((sales) => (
            <SalesCard
              key={sales.label}
              sales={sales}
              theme={theme}
              maxValue={maxValue}
            />
          ))}
        </div>
      </Grid>
    </Card>
  );
};

export default SalesFunnel;
