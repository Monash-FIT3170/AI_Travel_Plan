import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from "@mui/material/CardHeader";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { List, ListItem } from '@mui/material';

  
  export default function EmergCardView(emerg, itinerary) {
    // const [country, setCountry] = useState(itinerary.country);

    return (
      <Card sx={{ minWidth: 275 }}>

        <CardHeader
          avatar={<ContactEmergencyIcon />}
          title={"Emergency Contacts"}
        //   subheader={
        //     "DURATION: " +
        //     ((new Date(event.endTime) - new Date(event.startTime)) / (1000 * 60 * 60)) +
        //     " HRS"}

        // TODO: Make this subheader name Dynamic
        subheader={"Services in Bali"}
        // subheader={"Services in " + country.name}

        />

        <CardContent>

          <Typography variant="body2">
            {/* TODO: Make this dynamic */}
            {/* country.description */}
            <List>
            <ListItem>Main Emergency: 112</ListItem>
            <ListItem>Ambulance: 118</ListItem>
            <ListItem>Police: 110</ListItem>
            <ListItem>Fire Dpt: 113</ListItem>
            <ListItem>Search & Rescue: 111, 115, 151</ListItem>
            </List>
          </Typography>
        </CardContent>
      </Card>
    );
  }