import React, { Component } from "react";
import { Button, Card, Grid } from "@material-ui/core";
import DoughnutChart from '../../charts/echarts/Doughnut'
import "./shared.css";
import DateRangePickerComponent from "./DateRangePicker";

const Audience = () => {
    const setSelectedDate = (date) => {
        console.log(date);
    }
    const colorPalette1 = ['#FFAF0F', '#0F4E08', '#D16002', '#B0AFAF'];
    const colorPalette2 = ['#0F4E08', '#D16002', '#FFAF0F', '#5E8C0F', '#B3DAB9'];

    return (
        <Card elevation={3} className='p-20 audience'>
            <div className='dropdown'>
                <div className="analytics-title">Audience</div>
                <DateRangePickerComponent setSelectedDate={setSelectedDate} />
            </div>
            <div className="mt-10">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div className='card-subtitle mb-10'>Device</div>
                        <DoughnutChart
                            height='300px'
                            option={{
                                tooltip: {
                                    trigger: 'item'
                                },
                                legend: {
                                    orient: 'vertical',
                                    left: 'left',
                                    itemGap: 5,
                                    top: 0
                                },
                                series: [
                                    {
                                        name: 'Access From',
                                        type: 'pie',
                                        radius: ['40%', '70%'],
                                        center: ["60%", "50%"],
                                        avoidLabelOverlap: false,
                                        label: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            label: {
                                                show: true,
                                                fontSize: '40',
                                                fontWeight: 'bold'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        },
                                        data: [
                                            { value: 1048, name: 'Desktop' },
                                            { value: 735, name: 'Mobile' },
                                            { value: 580, name: 'Tablet' },
                                            { value: 484, name: 'Other' }
                                        ],
                                        color: colorPalette1,
                                    }
                                ]
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className='card-subtitle mb-10'>Traffic Source</div>
                        <DoughnutChart
                            height='300px'
                            option={{
                                tooltip: {
                                    trigger: 'item'
                                },
                                legend: {
                                    orient: 'vertical',
                                    left: 'left',
                                    itemGap: 5,
                                    top: 0
                                },
                                series: [
                                    {
                                        name: 'Access From',
                                        type: 'pie',
                                        radius: ['40%', '70%'],
                                        center: ["60%", "50%"],
                                        avoidLabelOverlap: false,
                                        label: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            label: {
                                                show: true,
                                                fontSize: '40',
                                                fontWeight: 'bold'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        },
                                        data: [
                                            { value: 1048, name: 'Google' },
                                            { value: 735, name: 'Social' },
                                            { value: 580, name: 'Direct' },
                                            { value: 484, name: 'Facebook' },
                                            { value: 300, name: 'Email' }
                                        ],
                                        color: colorPalette2,
                                    }
                                ]
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        </Card>
    );
};

export default Audience;
