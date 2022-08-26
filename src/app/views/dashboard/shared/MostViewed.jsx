import React from 'react';
import { Card, Grid, Button } from '@material-ui/core';
import ViewedCard from "./ViewedCard";
import SalesStatistics from "./SalesStatistics";
import DateRangePickerComponent from "./DateRangePicker";


const views = [
  {
    id: 1,
    name: "Knapsack Sprayer",
    item: "Category: Equipment",
    amount: "₦ 245,092"
  },
  {
    id: 2,
    name: "Knapsack Sprayer",
    item: "Category: Equipment",
    amount: "₦ 245,092"
  },
  {
    id: 3,
    name: "Knapsack Sprayer",
    item: "Category: Equipment",
    amount: "₦ 245,092"
  },
  {
    id: 4,
    name: "Knapsack Sprayer",
    item: "Category: Equipment",
    amount: "₦ 245,092"
  },
  {
    id: 5,
    name: "Knapsack Sprayer",
    item: "Category: Equipment",
    amount: "₦ 245,092"
  },
  {
    id: 6,
    name: "Knapsack Sprayer",
    item: "Category: Equipment",
    amount: "₦ 245,092"
  }
]

const MostViewed = ({ theme }) => {
  const setSelectedDate = (date) => {
    console.log(date);
  }

  return (
    <div>
      <Card elevation={3} className="p-20">
        <div className="dropdown">
          <div className="analytics-title">Most Viewed</div>
          <DateRangePickerComponent setSelectedDate={setSelectedDate} />
        </div>
        <div className="scrolling-wrapper-grid">
          {views.map((view) => (
            <ViewedCard key={view.id} view={view} theme={theme} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default MostViewed
