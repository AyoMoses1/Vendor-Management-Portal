import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import AdjustIcon from "@mui/icons-material/Adjust";
import SalesStatistics from "./SalesStatistics";

const Overview = ({ theme }) => {
  return (
    <Card className="play-card p-10 bg-paper mb-24">
      <div className="card-title mb-12">Overview</div>
      <Grid container spacing={1}>
        <div class="scrolling-wrapper-flexbox">
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <AdjustIcon
                  style={{
                    fontSize: "25px",
                    opacity: 0.6,
                    color: theme.palette.primary.main,
                  }}
                >
                  group
                </AdjustIcon>
                <div className="ml-12">
                  <small className="text-muted">
                   <h6> +24.4% </h6>
                    <p>From Last Month</p>
                  </small>
                </div>
              </div>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                #1,546,805,865.76
              </h6>
              <p>Total Sales</p>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <AdjustIcon
                  style={{
                    fontSize: "25px",
                    opacity: 0.6,
                    color: theme.palette.primary.main,
                  }}
                >
                  attach_money
                </AdjustIcon>
                <div className="ml-12">
                  <small className="text-muted">
                    <h6> -24.4% </h6>
                    <p>From Last Month</p>
                  </small>
                </div>
              </div>
              <h6 className="m-0 mt-4 text-primary font-weight-500">
                #1,546,805,865.76
              </h6>
              <p>Total Expenses</p>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <AdjustIcon
                  style={{
                    fontSize: "25px",
                    opacity: 0.6,
                    color: theme.palette.primary.main,
                  }}
                >
                  group
                </AdjustIcon>
                <div className="ml-12">
                  <small className="text-muted">
                   <h6> +24.4% </h6>
                    <p>From Last Month</p>
                  </small>
                </div>
              </div>
              <h6 className="m-0 mt-4 text-primary font-weight-500">18,043</h6>
              <p>Total Visitors</p>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <AdjustIcon
                  style={{
                    fontSize: "25px",
                    opacity: 0.6,
                    color: theme.palette.primary.main,
                  }}
                >
                  attach_money
                </AdjustIcon>
                <div className="ml-12">
                  <small className="text-muted">
                    <h6>-24.4%</h6>
                    <p>From Last Month</p>
                  </small>
                </div>
              </div>
              <h6 className="m-0 mt-4 text-primary font-weight-500">23,654</h6>
              <p>Total Orders</p>
              <Tooltip title="View Details" placement="top">
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </Card>
          </div>
        </div>
        <Grid item xs={12} md={12}>
          <SalesStatistics />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Overview;
