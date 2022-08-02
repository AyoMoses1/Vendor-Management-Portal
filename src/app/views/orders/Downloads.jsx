import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }} className='order-card'>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Downloads
        </Typography>
        <Divider/>
       <Button className='invoice-btn my-4'>Download PDF Invoice</Button>
       <Button className='invoice-btn'>Download Parking slip</Button>
      </CardContent>
    </Card>
  );
}
