import React, { Component } from "react";
import { Grid, Card, Icon, Button, Tooltip } from "@material-ui/core";
import SalesStatistics from "./SalesStatistics";
import OverviewCard from "./OverviewCard";
import DateRangePickerComponent from "./DateRangePicker";



const overviews = [
  {
    rate: "+24.4%",
    period: "From Last Month",
    amount: "₦ 1,546,805,865.76",
    label: "Total Received Sales",
    type: "CREDIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "₦ 1,546,805,865.76",
    label: "Total Completed Sales",
    type: "DEBIT"
  },
  {
    rate: "+24.4%",
    period: "From Last Month",
    amount: "₦ 23,654",
    label: "Total Received Orders",
    type: "CREDIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "₦ 23,654",
    label: "Total Completed Orders",
    type: "DEBIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "₦ 23,654",
    label: "Total Visitors",
    type: "DEBIT"
  },
]

const Overview = ({ theme }) => {
  const setSelectedDate = (date) => {
    console.log(date);
  }

  return (
    <Card className="play-card p-20 bg-paper mb-24">
      <div className="dropdown">
        <div className="analytics-title">Overview</div>
        <DateRangePickerComponent setSelectedDate={setSelectedDate} />
      </div>
      <Grid container spacing={1}>
        <div className="scrolling-wrapper-flexbox">
          {overviews.map((overview) => (
            <OverviewCard
              key={overview.label}
              overview={overview}
              theme={theme}
              className="overview-card"
            />
          ))}
        </div>
        <Grid item xs={12} md={12}>
          <SalesStatistics />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Overview;
