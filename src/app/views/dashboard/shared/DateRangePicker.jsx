import React, { Component, useEffect, useState } from "react";
import { Grid, Card, Icon, Button, Tooltip, Popover, Typography, } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const DateRangePickerComponent = ({ setSelectedDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expand, setExpand] = useState(false);
  const [local, setLocal] = useState({ startDate: null, endDate: null })

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedDate({ startDate, endDate });
      setLocal({ startDate, endDate });
      handleClose();
    }
  }, [startDate, endDate]);


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    if (local.startDate && local.endDate) {
      setStartDate(null);
      setEndDate(null);
      setLocal({ startDate: null, endDate: null })
      setSelectedDate({ startDate: null, endDate: null })
    } else {
      setAnchorEl(event.currentTarget);
    }
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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button onClick={handleClick} variant="outlined" className="date-toggler">
        {local.startDate && local.endDate ? 'Reset' : 'Date Range'}
        {!local.startDate && !local.endDate ? <img className="caret" src="/assets/icon/caret.svg" alt="company-logo" /> : <></>}
      </Button>

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
          <div>
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