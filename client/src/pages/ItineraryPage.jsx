import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Typography from "@mui/material/Typography"; // Import Typography component
import Grid from "@mui/material/Grid"
import { AddNewLocationFAB } from "../components/itinerary/AddNewLocationFAB";
import { ItineraryTimeLine } from "../components/itinerary/ItineraryTimeLine";
import MyMap from "./../components/map/MyMap";
import axios from "axios";
import { useState, useEffect } from "react";
import { EmergCardView } from "../components/itinerary/EmergCardView";
import { PdfDownload } from "../components/itinerary/PDFexport";


export function ItineraryPage() {
  const [forexRate, setForexRate] = useState(null);
  const [currencyCode, setCurrencyCode] = useState(null);

  useEffect(() => {
    async function fetchForexRate() {
      const countryName = "america";
      try {
        const response = await axios.post(
          "http://localhost:4000/api/exchangeRate",
          {
            countryName: countryName,
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
        padding: "8px",
        marginBottom: "10px",
      }}
    >
      {forexRate !== null ? (
        <Typography variant="body1">{`Exchange Rate: 1 AUD = ${forexRate} ${currencyCode}`}</Typography>
      ) : (
        <Typography variant="body1">Fetching exchange rate...</Typography>
      )}
    </div>
  );

  return (
    <>
      <BackgroundImage />
      <Background>
        <Grid container>
          <Grid item xs={6}>
            <MyMap />
            <ForexRateComponent />
            <EmergCardView />
          </Grid>
          <div style={{ position: "fixed", bottom: "20px", left: "30px"}}>
              <PdfDownload
                downloadFileName="Itinerary" 
                rootElementId="timeline" 
              />
            </div>
          <Grid id="timeline" item xs={6} style={{ height: "100vh", overflowY: "auto" }}>
          <ItineraryTimeLine />
                <div
                  style={{ position: "fixed", bottom: "20px", right: "50px" }}
                >
                  <AddNewLocationFAB></AddNewLocationFAB>
                </div>
          </Grid>
        </Grid>
      </Background>
    </>
  );
}
