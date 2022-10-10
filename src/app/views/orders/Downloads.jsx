import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CircularProgress } from '@material-ui/core';
import "./order-view.css"

export default function MediaCard({ handleDownload, downloadIndex, downloading }) {
  return (
    <Card sx={{ maxWidth: 345 }} className='order-card'>
      <CardContent>
        <Typography gutterBottom className='download-header' component="div">
          Downloads
        </Typography>
        <Divider />
        <Button disabled={downloading} onClick={() => { handleDownload(0) }} className='invoice-btn my-4'>Download PDF Invoice {downloading && downloadIndex === 0 ? <CircularProgress size={15} className={"ml-2"} /> : <></>}</Button>
        <Button disabled={downloading} onClick={() => { handleDownload(1) }} className='invoice-btn'>Download Parking slip {downloading && downloadIndex === 1 ? <CircularProgress size={15} className={"ml-2"} /> : <></>}</Button>
      </CardContent>
    </Card>
  );
}
