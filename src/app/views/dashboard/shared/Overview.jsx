import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import AdjustIcon from "@mui/icons-material/Adjust";
import SalesStatistics from "./SalesStatistics";
import OverviewCard from "./OverviewCard";

const overviews = [
  {
    rate: "+24.4%",
    period: "From Last Month",
    amount: "#1,546,805,865.76",
    label: "Total Sales",
    type: "CREDIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "#1,546,805,865.76",
    label: "Total Expenses",
    type: "DEBIT"
  },
  {
    rate: "+24.4%",
    period: "From Last Month",
    amount: "18,043",
    label: "Total Visitors",
    type: "CREDIT"
  },
  {
    rate: "-24.4%",
    period: "From Last Month",
    amount: "23,654",
    label: "Total Orders",
    type: "DEBIT"
  }
]

const Overview = ({ theme }) => {
  return (
    <Card className="play-card p-10 bg-paper mb-24">
      <div className="card-title mb-12">Overview</div>
      <Grid container spacing={1}>
        <div class="scrolling-wrapper-flexbox">
          { overviews.map(overview => <OverviewCard key={overview.label} overview={overview} theme={theme} />) }
        </div>
        <Grid item xs={12} md={12}>
          <SalesStatistics />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Overview;
