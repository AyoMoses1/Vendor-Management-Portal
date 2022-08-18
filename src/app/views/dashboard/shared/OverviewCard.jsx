import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import AdjustIcon from "@mui/icons-material/Adjust";


const OverviewCard = ({ theme, overview }) => {
    return (
        <Grid item lg={4} md={4} sm={12} xs={12}>
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
                    <h6> {overview?.rate} </h6>
                    <p>{overview?.period}</p>
                    </small>
                </div>
                </div>
                <h6 className="m-0 mt-4 text-primary font-weight-500">
                {overview?.amount}
                </h6>
                <p>{overview?.label}</p>
            </Card>
            </div>
        </Grid>
    );
}

export default OverviewCard;