import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import { List, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

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


// Create styles
const styles = StyleSheet.create({
	page: {
		padding: 20,
	},
	table: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	card: {
		border: "1pt solid #000",
		padding: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
	},
	description: {
		fontSize: 12,
	},
});

const data = [
	{ title: "Card 1", description: "Description for Card 1" },
	{ title: "Card 2", description: "Description for Card 2" },
	// TODO: Change to dynamic data
];

// Create Document Component
const Itinerarypdf = ({ travelItinerary, setItinerary }) => (
	// Filling document with cards
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.table}>
				{data.map((item, index) => (
					<View key={index} style={styles.card}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.description}>{item.description}</Text>
					</View>
				))}
			</View>
		</Page>
	</Document>
);

  const handlePDF = () => {
    console.log("test")
  };

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
    <div style={{ position: "fixed", bottom: "20px", left: "30px"}}>
      <PDFDownloadLink document={<Itinerarypdf />} fileName="somename.pdf">
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={handlePDF}
              >
                DOWNLOAD ITINERARY
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download itinerary')}
              </Button>
    </PDFDownloadLink>
            </div>
    </div>
  );
}
