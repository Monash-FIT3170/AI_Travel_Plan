import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Typography from "@mui/material/Typography"; // Import Typography component
import axios from "axios";
import {useState, useEffect} from "react";
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
    <BackgroundImage>
      <Background>
        <h1>hii</h1>
        <ForexRateComponent />
      </Background>
      ;
    </BackgroundImage>
  );
}
