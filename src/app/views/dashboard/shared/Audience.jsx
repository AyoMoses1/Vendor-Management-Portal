import React, { Component } from "react";
import {
    Card,
    Icon,
    IconButton,
    Grid,
    Tooltip,
} from "@material-ui/core";
import DoughnutChart from '../../charts/echarts/Doughnut'
import "./shared.css";

const Audience = () => {
    return (
        <Card elevation={3} className='p-10 audience'>
            <div className='card-title'>Audience</div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className='card-subtitle'>Device</div>
                    <DoughnutChart
                        height='300px'
                        color={['rgb(44, 102, 18)', ' rgb(149, 218, 117)', '#FFAF0F']}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className='card-subtitle'>Device</div>

                </Grid>
            </Grid>
        </Card>
    );
};

export default Audience;
