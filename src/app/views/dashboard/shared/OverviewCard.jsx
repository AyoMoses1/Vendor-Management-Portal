import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import './shared.css';


const OverviewCard = ({ theme, overview }) => {
    return (
        <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className="scrollable-item">
                <Card className="p-10 kard">
                    <div className="flex overview-top">
                        <img className="overview-logo" src={overview?.imgLogo} alt="company-logo" />
                        <div className="ml-12">
                            <div className="overview-top-content">
                                <p className={overview?.type}>{overview?.rate}</p>
                                <small>{overview?.period}</small>
                            </div>
                        </div>
                    </div>
                    <h6 className="text-primary font-weight-500 overview-amount">
                        {overview?.amount}
                    </h6>
                    <p className="overview-footer">{overview?.label}</p>
                </Card>
            </div>
        </Grid>
    );
}

export default OverviewCard;