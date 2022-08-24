import React, { Component } from "react";
import { Grid, Card, Icon, Button, Tooltip } from "@material-ui/core";

const DateRangePicker = ({getDateRangeValue}) => {

    const handleClick = () => {
        getDateRangeValue("DateRageClciked")
    }
    return <div>
        <Button onClick={handleClick} variant="outlined">Date Range</Button>
    </div>
}

export default DateRangePicker;