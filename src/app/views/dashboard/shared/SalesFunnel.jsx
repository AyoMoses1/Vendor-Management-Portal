import React, { Component } from "react";
import {
  Card,
  Button,
  Icon,
  IconButton,
  Grid,
  Tooltip,
} from "@material-ui/core";
import SalesStatistics from "./SalesStatistics";
import SalesCard from "./SalesCard";


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
  }
];

const SalesFunnel = ({ theme }) => {
  return (
    <Card elevation={3} className="p-10 mb-24">
      <div className='dropdown'>
        <div className="card-title mb-12">Sales Funnel</div>
        <div>
          <Button variant="outlined">Date Range</Button>
        </div>
        </div>
      <Grid container spacing={1}>
        <div class="wrapper">
          {salesFunnels.map((sales) => (
            <SalesCard key={sales.label} sales={sales} theme={theme} />
          ))}
        </div>
        <Grid item xs={12} md={12}>
          <SalesStatistics />
        </Grid>
      </Grid>
    </Card>
  );
}

export default SalesFunnel;
