import React, { Component } from "react";
import { Card } from "@material-ui/core";
import { Grid } from '@material-ui/core'




const PageName = ({ theme, view }) => {
    return (
        <Grid container spacing={3}>
            <Grid item lg={2} md={2} sm={2} xs={2}>
                <div className="mostview-number">
                    <div>{view?.index}.</div>
                </div>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <div className="flix">
                    <div className="ml-12">
                        <h6 className="page-name">{view?.name}</h6>
                    </div>
                </div>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
                <div className="mostview-number">
                    <div>{view?.views}<small style={{fontSize: "12px"}}>views</small></div>
                </div>
            </Grid>
        </Grid>

    )
}

export default PageName;

