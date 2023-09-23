import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Typography from "@mui/material/Typography"; // Import Typography component
import Grid from "@mui/material/Grid";
import { AddNewLocationFAB } from "../components/itinerary/AddNewLocationFAB";
import { ItineraryTimeLine } from "../components/itinerary/ItineraryTimeLine";
import MyMap from "./../components/map/MyMap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTravelItinerary } from "../TravelItineraryContext";
import PdfDownload from "../components/itinerary/PDFexport";
import { MonetizationOn } from '@mui/icons-material';
import { EmergCardView } from "../components/itinerary/EmergCardView";
import { MapContextProvider } from "../components/map/MapContext";


export function ItineraryPage() {
  const travelItinerary = useTravelItinerary();
  const [forexRate, setForexRate] = useState(null);
  const [currencyCode, setCurrencyCode] = useState(null);

  const country = travelItinerary.country;
  useEffect(() => {
    async function fetchForexRate() {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/exchangeRate",
          {
            countryName: country,
          }
        );
        console.log("Response data:", response.data);

        if (response.data.rate !== null) {
          console.log("Setting forex rate:", response.data.forexRate);
          setForexRate(response.data.forexRate);
        }

        // Also set the countryCode if available in the response
        if (response.data.currencyCode !== null) {
          console.log("Setting country code:", response.data.currencyCode);
          setCurrencyCode(response.data.currencyCode);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchForexRate();
  }, []);
  const ForexRateComponent = () => (
    <div
    style={{
      backgroundColor: "#f0f0f0",
      padding: "20px",
      marginBottom: "10px",
      borderRadius: "5px"
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <MonetizationOn fontSize="large" style={{ marginRight: "10px" }} />
      <Typography variant="h6">Exchange rate</Typography>
    </div>
    {forexRate !== null ? (
      <Typography variant="body1">{`1 Australian Dollar = ${forexRate} ${currencyCode}`}</Typography>
    ) : (
      <Typography variant="body1">Fetching exchange rate...</Typography>
    )}
  </div>
  );

  return (
    <>

      <BackgroundImage />
      <Background>
        <MapContextProvider>
          <Grid container>
            <Grid item xs={6}>
              <div style={{ marginLeft: "30px" }}>
                <MyMap />
                <h4>Key Destination Information</h4>
                <ForexRateComponent />
                <EmergCardView></EmergCardView>
                <PdfDownload
                  downloadFileName="Itinerary"
                  rootElementId="timeline"
                />
               </div>
            </Grid>
            <Grid
              id="timeline"
              item
              xs={6}
              style={{ height: "100vh", overflowY: "auto" }}
            >
              <ItineraryTimeLine />
              <div style={{ position: "fixed", bottom: "20px", right: "50px" }}>
                <AddNewLocationFAB></AddNewLocationFAB>
              </div>
            </Grid>
          </Grid>
        </MapContextProvider>
      </Background>
    </>
  );
}
