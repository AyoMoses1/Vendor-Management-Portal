import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";

const SalesCard = ({ theme, sales, maxValue }) => {
  return (
    <div className="kird">
      <div className="sales-card-data">
        <h6 className="sales-card-label">{sales?.label}</h6>
        <h4 className="m-0 mt-4 text-primary font-weight-500 sales-card-amount">
          {sales?.amount}
        </h4>
      </div>
      <div className="sales-funnel" style={{clipPath: "polygon(0 1%, 100% 16%, 100% 85%, 0% 100%)"}}>
        
      </div>
    </div>
  );
};

export default SalesCard;
