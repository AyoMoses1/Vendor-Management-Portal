import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Tooltip } from "@material-ui/core";
import './seller.css'


const SellerCard = ({theme, seller }) => {
    return (
        <Grid item lg={4} md={4} sm={12} xs={12}>
            <div className="scrollable-item">
                <Card className="p-10 card">
                    <div className="flex seller-top">
                        <div>
                          <img className="seller-logo" src={seller?.imgLogo} alt="logo" />
                        </div>                   
                        <div className="seller-top-content">
                            <h6 className="text-primary font-weight-500 overview-amount">
                            {seller?.total}
                            </h6>
                            <p className="seller-footer">{seller?.label}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </Grid>
    );
}

export default SellerCard;