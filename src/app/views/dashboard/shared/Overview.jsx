import React, { Component } from "react";
import { Grid, Card, Icon, Button, Tooltip } from "@material-ui/core";
import SalesStatistics from "./SalesStatistics";
import OverviewCard from "./OverviewCard";

const overviews = [
  {
    rate: "+24.4%",
    period: "From Last Month",
    amount: "₦ 1,546,805,865.76",
    label: "Total Sales",
    type: "CREDIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "₦ 1,546,805,865.76",
    label: "Total Expenses",
    type: "DEBIT"
  },
  {
    rate: "+24.4%",
    period: "From Last Month",
    amount: "₦ 18,043",
    label: "Total Visitors",
    type: "CREDIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "₦ 23,654",
    label: "Total Orders",
    type: "DEBIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "₦ 23,654",
    label: "Total Orders",
    type: "DEBIT"
  },
]

const Overview = ({ theme }) => {
  return (
    <Card className="play-card p-20 bg-paper mb-24">
      <div className="dropdown">
        <div className="analytics-title mb-12">Overview</div>
        <div>
          <Button variant="outlined">Date Range</Button>
        </div>
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
