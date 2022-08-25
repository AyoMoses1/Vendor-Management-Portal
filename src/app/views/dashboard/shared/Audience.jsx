import React, { Component } from "react";
import { Button, Card, Grid } from "@material-ui/core";
import DoughnutChart from '../../charts/echarts/Doughnut'
import "./shared.css";

const Audience = () => {
    return (
        <Card elevation={3} className='p-20 audience'>
            <div className='dropdown'>
                <div className="analytics-title">Audience</div>
                <div>
                    <Button variant="outlined">Date Range</Button>
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className='card-subtitle'>Device</div>
                    <DoughnutChart
                        height='300px'
                        color={['rgb(44, 102, 18)', ' rgb(149, 218, 117)', '#FFAF0F']}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='card-subtitle'>Traffic Source</div>
                    <DoughnutChart
                        height='300px'
                        color={['rgb(44, 102, 18)', ' rgb(149, 218, 117)', '#FFAF0F']}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

export default Audience;
