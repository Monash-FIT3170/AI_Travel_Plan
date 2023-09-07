import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {List, ListItem} from "@mui/material";

export default function CurrencyExchangeView() {
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [country] = useState("indonesia");

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchCurrencyCode = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const currencyCode = Object.keys(data[0].currencies)[0];
        setCurrencyCode(currencyCode);
        return currencyCode;
      }
    } catch (error) {
      console.error("Error fetching currency code", error);
    }
  };

  const fetchExchangeRate = async () => {
    const currencyCode = await fetchCurrencyCode();
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud/${currencyCode.toLowerCase()}.json`
      );
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        const currencyCode = Object.keys(data)[1];
        const exchangeRate = data[currencyCode];
        setExchangeRate(exchangeRate.toFixed(2));
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  return (
    <Card sx={{minWidth: 275, margin: 2}}>
      <CardHeader title="Currency Exchange" />

      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1">
            <List>
              <ListItem>
                1 AUD = {exchangeRate} {currencyCode}
              </ListItem>
            </List>
          </Typography>
          <CurrencyExchangeIcon sx={{fontSize: 50, color: "#66BB6A"}} />
        </Box>
      </CardContent>
    </Card>
  );
}
