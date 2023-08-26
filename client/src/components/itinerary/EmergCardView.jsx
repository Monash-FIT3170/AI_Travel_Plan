import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { List, ListItem } from "@mui/material";
import axios from "axios";

export default function EmergCardView() {
  const [emergencyData, setEmergencyData] = useState({
    country: {},
    ambulanceNumber: "",
    policeNumber: "",
    fireNumber: "",
    universalNumber: "",
  });

  useEffect(() => {
    // Replace 'YOUR_API_URL' with the actual URL of your backend API
    axios
      .get("http://localhost:4000/api/emergencyContact?country=AU")
      .then((response) => {
        const data = response.data.detail; // Assuming your API response is an object with emergency details
        console.log(data);
        setEmergencyData(data);
        console.log(emergencyData);
      })
      .catch((error) => {
        console.error("Error fetching emergency data:", error);
      });
  }, [emergencyData]);

  const isUniversalEmergencyNumber = emergencyData.universalNumber === "";
    
  return (
    <div>
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={<ContactEmergencyIcon />}
        title={"Emergency Contacts"}
        subheader={`Services in ${emergencyData.country.countryName}`} // Update this subheader as needed
      />
      <CardContent>
        <Typography variant="body2">
          <List>
            {isUniversalEmergencyNumber && (
              <>
                <ListItem>Ambulance: {emergencyData.ambulanceNumber}</ListItem>
                <ListItem>Police: {emergencyData.policeNumber}</ListItem>
                <ListItem>Fire Dpt: {emergencyData.fireNumber}</ListItem>
              </>
            )}
            {!isUniversalEmergencyNumber && (
              <ListItem>
                Main Emergency: {emergencyData.universalNumber}
              </ListItem>
            )}
          </List>
        </Typography>
      </CardContent>
    </Card>
            
    </div>
  );

};