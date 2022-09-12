import React, { Component, useEffect, useState } from "react";
import { Grid, Card, Icon, Box, Button, Tooltip, Popover, Typography, } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./shared.css";
import { formatFullDate } from "utils";



const DateRangePickerComponent = ({ setSelectedDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expand, setExpand] = useState(false);
  const [local, setLocal] = useState({ startDate: null, endDate: null })

  useEffect(() => {
    if (startDate && endDate) {
      console.log(startDate);
      console.log(endDate);
      setSelectedDate({ startDate, endDate });
      setLocal({ startDate, endDate });
      handleClose();
    }
  }, [startDate, endDate]);


  const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   if (local.startDate && local.endDate) {
  //     setStartDate(null);
  //     setEndDate(null);
  //     setLocal({ startDate: null, endDate: null })
  //     setSelectedDate({ startDate: null, endDate: null })
  //   } else {
  //     setAnchorEl(event.currentTarget);
  //   }
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCalendarOpen = () => {
    setExpand(true)
  }

  const handleCalendarClose = () => {
    setExpand(false)
  }

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
    setLocal({ startDate: null, endDate: null })
    setSelectedDate({ startDate: null, endDate: null })
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="text-right">
      {/* <Button onClick={handleClick} variant="outlined" className="date-toggler">
        {local.startDate && local.endDate ? 'Reset' : 'Date Range'}
        {!local.startDate && !local.endDate ? <img className="caret" src="/assets/icon/caret.svg" alt="company-logo" /> : <></>}
      </Button> */}
      <Button onClick={handleClick} variant="outlined" className="date-toggler">
        {'Select Date'}
        {<img className="caret" src="/assets/icon/caret.svg" alt="company-logo" />}
      </Button>

      {startDate && endDate ? <div className="flex items-center date-range">
        <div className="dates">{formatFullDate(startDate)}</div>
        <div className="spacer">to</div>
        <div className="dates">{formatFullDate(endDate)}</div>
        <img onClick={reset} className="clear-icon" src="/assets/icon/clear.svg" alt="clear" />
      </div> : <></>}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className={expand ? 'card-popover' : 'default-set'}
      >
        <div className="date-flex">
          <div className="first_input">
            <DatePicker
              isClearable
              filterDate={(d) => {
                return new Date() > d;
              }}
              placeholderText="Select Start Date"
              size="xsmall"
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => setStartDate(date)}
              onCalendarOpen={handleCalendarOpen}
              onCalendarClose={handleCalendarClose}
            />
          </div>
          <Box sx={{ mx: 1 }}> to </Box>
          <div>
            <DatePicker
              isClearable
              filterDate={(d) => {
                return new Date() > d;
              }}
              placeholderText="Select End Date"
              size="xsmall"
              dateFormat="MMMM d, yyyy h:mmaa"
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onChange={(date) => setEndDate(date)}
              onCalendarOpen={handleCalendarOpen}
              onCalendarClose={handleCalendarClose}
            />
          </div>
        </div>
      </Popover>


    </div>
  );
}

export default DateRangePickerComponent;