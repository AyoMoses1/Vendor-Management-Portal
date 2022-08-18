import React, { Component } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Tooltip,
} from "@material-ui/core";
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
                <Icon
                  style={{
                    fontSize: "44px",
                    opacity: 0.6,
                    color: theme.palette.primary.main
                  }}
                >
                  group
                </Icon>
                <div className="ml-12">
                  <small className="text-muted">New Leads</small>
                  <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
                </div>
              </div>
              <Tooltip title="View Details" placement="top">
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <Icon
                  style={{
                    fontSize: "44px",
                    opacity: 0.6,
                    color: theme.palette.primary.main
                  }}
                >
                  attach_money
                </Icon>
                <div className="ml-12">
                  <small className="text-muted">This week Sales</small>
                  <h6 className="m-0 mt-4 text-primary font-weight-500">$80500</h6>
                </div>
              </div>
              <Tooltip title="View Details" placement="top">
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <Icon
                  style={{
                    fontSize: "44px",
                    opacity: 0.6,
                    color: theme.palette.primary.main
                  }}
                >
                  attach_money
                </Icon>
                <div className="ml-12">
                  <small className="text-muted">This week Sales</small>
                  <h6 className="m-0 mt-4 text-primary font-weight-500">$80500</h6>
                </div>
              </div>
              <Tooltip title="View Details" placement="top">
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <Icon
                  style={{
                    fontSize: "44px",
                    opacity: 0.6,
                    color: theme.palette.primary.main
                  }}
                >
                  group
                </Icon>
                <div className="ml-12">
                  <small className="text-muted">New Leads</small>
                  <h6 className="m-0 mt-4 text-primary font-weight-500">3050</h6>
                </div>
              </div>
              <Tooltip title="View Details" placement="top">
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <Icon
                  style={{
                    fontSize: "44px",
                    opacity: 0.6,
                    color: theme.palette.primary.main
                  }}
                >
                  attach_money
                </Icon>
                <div className="ml-12">
                  <small className="text-muted">This week Sales</small>
                  <h6 className="m-0 mt-4 text-primary font-weight-500">$80500</h6>
                </div>
              </div>
              <Tooltip title="View Details" placement="top">
                <IconButton>
                  <Icon>arrow_right_alt</Icon>
                </IconButton>
              </Tooltip>
            </Card>
          </div>
          <div class="scrollable-item">
            <Card className="p-10 kard">
              <div className="flex flex-middle">
                <Icon
                  style={{
                    fontSize: "44px",
                    opacity: 0.6,
                    color: theme.palette.primary.main
                  }}
                >
                  attach_money
                </Icon>
                <div className="ml-12">
                  <small className="text-muted">This week Sales</small>
                  <h6 className="m-0 mt-4 text-primary font-weight-500">$80500</h6>
                </div>
              </div>
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
