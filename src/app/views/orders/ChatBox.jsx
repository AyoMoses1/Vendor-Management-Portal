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
        <Typography gutterBottom component="div" className='comment-header order-text-12'>
          Comment Section
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary" className='chat-text-12 chat-section'>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
}
