import React, { Component } from "react";
import {
  Card,
  Icon,
  IconButton,
  Grid,
  Tooltip,
} from "@material-ui/core";

const SalesFunnel = ({ theme }) => {
  return (
    <Card elevation={3} className="p-10 mb-24">
      <div className="card-title mb-12">Sales Funnel</div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card className="p-sm-24">
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="p-sm-24">
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
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="p-sm-24">
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
        </Grid>
      </Grid>
    </Card>
  );
};

export default SalesFunnel;
