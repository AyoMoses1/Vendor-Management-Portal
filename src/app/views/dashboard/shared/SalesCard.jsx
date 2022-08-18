import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";


const SalesCard = ({theme, sales}) => {
    return (
        <Grid item xs={12} md={4}>
            <div class="item">
                <Card className="p-20 kird">
                    <div className="ml-12">
                        <h6 className="text-muted">
                        {sales?.label} 
                        </h6>
                    </div>
                    
                    <h4 className="m-0 mt-4 text-primary font-weight-500">
                    {sales?.amount}
                    </h4>
                </Card>
            </div>
        </Grid>
    );
}


export default SalesCard;