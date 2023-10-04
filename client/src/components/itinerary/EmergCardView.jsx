import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import {List, ListItem} from "@mui/material";
import axios from "axios";
import {useTravelItinerary} from "../../TravelItineraryContext";
const URL = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : "http://localhost:4000/";
export function EmergCardView() {
  const [emergencyData, setEmergencyData] = useState({
    country: {countryName: ""},
    ambulanceNumber: "",
    policeNumber: "",
    fireNumber: "",
    universalNumber: "",
  });

  const itinerary = useTravelItinerary();
  const country = itinerary.country;
  //need to check when they change country
  console.log(country);
  useEffect(() => {
    if (country && emergencyData.country.countryName !== country) {
      axios
        .get(URL + "api/emergencyContact?country=" + country)
        .then((response) => {
          const data = response.data.detail;
          setEmergencyData(data);
        })
        .catch((error) => {
          console.error("Error fetching emergency data:", error);
        });
    }
  }, [country, emergencyData.country.countryName]);

  const isUniversalEmergencyNumber = emergencyData.universalNumber === "";

  return (
    <div>
      <Card sx={{minWidth: 275}}>
        <CardHeader
          avatar={<ContactEmergencyIcon />}
          title={"Emergency Contacts"}
          subheader={`Services in ${emergencyData.country.countryName}`} // Update this subheader as needed
        />
        <CardContent>
          <Typography variant="body1">
            <List>
              {isUniversalEmergencyNumber && (
                <>
                  <ListItem>
                    Ambulance: {emergencyData.ambulanceNumber}
                  </ListItem>
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
}
