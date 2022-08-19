import React, { Component } from "react";
import { Card } from "@material-ui/core";
import { Grid } from '@material-ui/core'




const ViewedCard = ({ theme, view }) => {
    return (
        <Grid container spacing={3}>
            <Grid item lg={3} md={3} sm={3} xs={3}>
                <div className="mostview-number">
                    <div>{view?.id}</div>
                </div>
            </Grid>
            <Grid item lg={9} md={9} sm={9} xs={9}>
                <Card className="kerd">
                    <div className="flix">
                        <div className="pics"> </div>
                        <div className="ml-12">
                            <small className="text-muted">
                                <p className="mostview-name">{view?.name}</p>
                                <p className="mostview-cat">{view?.item}</p>
                            </small>
                            <h6 className="mostview-amount">{view?.amount}</h6>
                        </div>
                    </div>
                </Card>
            </Grid>
        </Grid>

    )
}

export default ViewedCard;

