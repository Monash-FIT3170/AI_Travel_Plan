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
import { useRef } from 'react';
import jsPDF from 'jspdf';
import { ItineraryRight } from '../../pages/itineraryRight';
import { ItineraryTimeLine } from "./ItineraryTimeLine";
import ReportTemplate from './ReportTemplate';
import { renderToStaticMarkup } from 'react-dom/server';
import { Grid } from "@mui/material";
import { useLocalStorage } from "../../components/LocalStorageGeneric";

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


// // Create styles
// const styles = StyleSheet.create({
// 	page: {
// 		padding: 20,
// 	},
// 	table: {
// 		flexDirection: "row",
// 		flexWrap: "wrap",
// 	},
// 	card: {
// 		border: "1pt solid #000",
// 		padding: 10,
//     width: "100%",
// 		marginBottom: 10,
// 	},
// 	title: {
// 		fontSize: 14,
// 		fontWeight: "bold",
// 	},
// 	description: {
// 		fontSize: 12,
// 	},
// });

// const data = [
// 	{ title: "Card 1", description: "Description for Card 1" },
// 	{ title: "Card 2", description: "Description for Card 2" }
// 	// TODO: Change to dynamic data
// ];

// const reportTemplateRef = useRef(null);

// const handlePDF = () => {
//     const doc = new jsPDF({
//       format: 'a4',
//       unit: 'px',
//     });
    

//     // Adding the fonts.
//     doc.setFont('Helvetica', 'normal'); // Use Helvetica font

//     // Render the content using ReactDOMServer
//     const content = renderToStaticMarkup(
//       <ItineraryRightWrapper reportTemplateRef={reportTemplateRef} />
//     );
//     console.log(content);

//     if (content) {
//           const htmlContent = `<div ref="${reportTemplateRef}">${content}</div>`;

//           doc.html(htmlContent, {
//             callback: () => {
//               doc.save('document.pdf');
//             },
//           });
//         }
// };

// // Create Document Component
// const Itinerarypdf = ({ travelItinerary, setItinerary }) => (
// 	// Filling document with cards
// 	<Document>
// 		<Page size="A4" style={styles.page}>
// 			<View style={styles.table}>
// 				{data.map((item, index) => (
// 					<View key={index} style={styles.card}>
// 						<Text style={styles.title}>{item.title}</Text>
// 						<Text style={styles.description}>{item.description}</Text>
// 					</View>
// 				))}
// 			</View>
// 		</Page>
// 	</Document>
// );

  const [itinerary, setItinerary] = useLocalStorage("travelItinerary");

  const handlePDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Render the component into a static markup
    const itineraryTimeLineMarkup = renderToStaticMarkup(
      <Grid item xs={6} style={{ height: "100vh"}}>
        <ItineraryTimeLine
          travelItinerary={itinerary}
          setItinerary={setItinerary}
        />
      </Grid>
    );
    
    // Convert HTML markup to PDF
    doc.html(itineraryTimeLineMarkup, {
      callback: () => {
        doc.save('document.pdf');
      },
    });

    // // Save the PDF
    // doc.save("itinerary_timeline.pdf");
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
      {/* <PDFDownloadLink document={<Itinerarypdf />} fileName="somename.pdf"> */}
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={handlePDF}
              >
                DOWNLOAD ITINERARY
              </Button>


              {/* <ReportTemplate /> */}

              {/* <ItineraryRight reportTemplateRef={reportTemplateRef} /> */}
              {/* <div ref={reportTemplateRef}>
				<ReportTemplate />
			</div> */}
      {/* {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download itinerary')}
    </PDFDownloadLink> */}
            </div>
            
    </div>
  );
}
