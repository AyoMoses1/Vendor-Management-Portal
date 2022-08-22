import React from 'react'
import { Button, Card } from '@material-ui/core'
import DateRangePickerComponent from './DateRangePicker'
import PageName from './PageName'

const views = [
    {
        id: 1,
        name: "Home Page",
        views: "23"
    },
    {
        id: 2,
        name: "Dashboard",
        views: "23"
    },
    {
        id: 3,
        name: "Order Page",
        views: "23"
    },
    {
        id: 4,
        name: "Home Page",
        views: "23"
    },
    {
        id: 5,
        name: "Dashboard",
        views: "23"
    },
    {
        id: 6,
        name: "Order Page",
        views: "23"
    },
    {
        id: 7,
        name: "Home Page",
        views: "23"
    },
    {
        id: 8,
        name: "Dashboard",
        views: "23"
    },
    {
        id: 9,
        name: "Order Page",
        views: "23"
    },
    {
        id: 10,
        name: "Home Page",
        views: "23"
    },
    {
        id: 11,
        name: "Dashboard",
        views: "23"
    },
    {
        id: 12,
        name: "Order Page",
        views: "23"
    },
]

const PageViews = () => {
    const setSelectedDate = (date) => {
        console.log(date);
    }

    return (
        <div>
            <Card elevation={3} className='p-20'>
                <div className='dropdown'>
                    <div className="analytics-title">Page Views <span><small style={{ fontSize: '10px' }}>(live Report)</small></span></div>
                    <DateRangePickerComponent setSelectedDate={setSelectedDate} />
                </div>
                <div className="scrolling-wrapper-grid">
                    {views.map((view, index) => (
                        <PageName key={view.id} view={{ ...view, index: index + 1 }} />
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default PageViews
