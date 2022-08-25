import React, { Component, useState } from "react";
import { Grid, Card, Icon, Button, Tooltip, } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const DateRangePickerComponent = ({getDateRangeValue}) => {
    const [selectedDate, setSelectedDate] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDate, setShowDate] = useState(false);
    const handleClick = () => {
        getDateRangeValue("DateRangeClicked")
        setShowDate(prev => !prev)
        
    }
    return (
      <div>
        <Button onClick={handleClick} variant="outlined" className="date-toggler">
          Date Range
        </Button>

        <div className="date-flex">
          <DatePicker
            isClearable
            filterDate={(d) => {
              return new Date() > d;
            }}
            placeholderText="Select Start Date"
            dateFormat="MMMM d, yyyy h:mmaa"
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={(date) => setStartDate(date)}
            className={showDate ? "" : "hide"}
          />
          <DatePicker
            isClearable
            filterDate={(d) => {
              return new Date() > d;
            }}
            placeholderText="Select End Date"
            dateFormat="MMMM d, yyyy h:mmaa"
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={(date) => setEndDate(date)}
            style={showDate ? { display: "block" } : { display: "none" }}
            className={showDate ? "" : "hide"}
          />
        </div>
      </div>
    );
}

export default DateRangePickerComponent;