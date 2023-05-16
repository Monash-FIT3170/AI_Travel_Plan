import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import PlaceIcon from '@mui/icons-material/Place';
import CardMedia from '@mui/material/CardMedia';

export  function EventCardView({event}) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 550 }}>
       <CardHeader
        avatar={
     <PlaceIcon />
              }
        title={event.name}
        subheader={"DURATION: " + ((new Date(event.endTime) - new Date(event.startTime)) / (1000 * 60 * 60)) + " HRS"}
      />
        {/* <CardMedia
        component="img"
        height="194"
        image="https://theworldtravelguy.com/wp-content/uploads/2020/11/DJI_0943_1200.jpg"
        alt="Paella dish"
      /> */}
        
      <CardContent>
       {event.description}
      </CardContent>

      <CardActions>
        <Button size="small">Delete</Button>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}