import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import { ItineraryTimeLine } from "../components/itinerary/ItineraryTimeLine";
import Grid from "@mui/material/Grid";
import { useLocalStorage } from "../components/LocalStorageGeneric";
import ChatBox from "../components/chatbox/ChatBox";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function ItineraryRight() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [cost, setCost] = useState();
  const [location, setLocation] = useState();
  const [chatResponse, setResponse] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currencyInput, setCurrencyInput] = useState(""); 
  const [currencyOutput, setCurrencyOutput] = useState("N/A"); 
  const [currencyCode, setCurrencyCode] = useState(null);
  const [country, setCountry] = useState("india")
  const [errors, setErrors] = useState({
  
    name: "",
    startDate: "",
    endDate: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setCost("");
    setLocation("");
    setResponse("");
    setStartDate(null); // Set to the current date or an initial date value
    setEndDate(null); // Set to the current date or an initial date value
    // setErrors({ name: "", date: "", time: "" });
  };

  const handleSave = () => {
    if (errors.name || errors.startDateError || errors.endDateError) {
      alert("Please enter valid inputs before saving.");
      return;
    }

    // Create a new event object with updated values
    const newEvent = {
      chatResponse,
      cost,
      description,
      endTime: dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      startTime: dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      name,
      location,
    };

    // Add the new event to the itinerary without sorting
    itinerary.schedule[0].activities.push(newEvent);

    // Reform itinerary
    setItinerary(reformItinerary(itinerary));
    setOpen(false);
  };

  useEffect(() => {
    fetchCurrencyCode();
    getExchangeRate();
  }, []);

  useEffect(() => {
    let nameError = "";
    let startDateError = "";
    let endDateError = "";

    if (!name || !name.trim()) {
      nameError = "Name is required";
    }

    // TODO: Check null Date
    if (startDate === null) {
      startDateError = "Start Date is required";
    }
    if (endDate === null) {
      endDateError = "End Date is required";
    }

    setErrors({
      name: nameError,
      startDate: startDateError,
      endDate: endDateError,
    });
  }, [name, startDate, endDate]);

  const [itinerary, setItinerary, updateTravelItineraryLocalStorage] =
    useLocalStorage("travelItinerary", {
      startDate: null,
      endDate: null,
      schedule: [],
    });

  // NOTE: Reconstructing because the timezone in the mock data is not the same as the timezone in the browser.
  // TODO: When prompting gpt, provide user's timezone such that GPT returns event times in the user's timezone.
  const reformItinerary = (itinerary) => {
    // Flatten all events
    const allEvents = itinerary.schedule.flatMap(
      (dailyItinerary) => dailyItinerary.activities,
    );

    // Sort all events by startTime
    allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    // Create a map of dates to events
    const dateToEventsMap = allEvents.reduce((map, event) => {
      const eventDate = dayjs(event.startTime).format("YYYY-MM-DD");
      if (!map[eventDate]) {
        map[eventDate] = [];
      }
      map[eventDate].push(event);
      return map;
    }, {});

    // Reconstruct the schedule array
    const newSchedule = Object.entries(dateToEventsMap).map(
      ([date, activities], index) => ({
        day: index + 1,
        date: new Date(date),
        activities,
      }),
    );

    // Return a new itinerary object
    return { ...itinerary, schedule: newSchedule };
  };

  // Fetch the Currency Code for Exchange Rate
  const fetchCurrencyCode = async () => {
    const apiKey = "ptrDvnw9Al7TzU0GAl9Qx9beSgnGG5geWK9m6nLe";
    try {
      const response = await fetch(
        `https://countryapi.io/api/name/${country}?apikey=${apiKey}`
      );
      const data = await response.json();
      const countryKey = Object.keys(data)[0];
      if (data && data[countryKey] && data[countryKey].currencies) {
        const currencyCode = Object.keys(data[countryKey].currencies)[0];
        setCurrencyCode(currencyCode); 
        return currencyCode
      }
    } catch (error) {
      console.error("Error fetching currency code", error);
      return null;
    }
  };
  
  // Fetch exchange rate based on the currency code
  const fetchExchangeRate = async () => {
    const currencyCode = await fetchCurrencyCode()
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/aud/${currencyCode.toLowerCase()}.json`
      );
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        const currencyCode = Object.keys(data)[1];
        const exchangeRate = data[currencyCode];
        return exchangeRate.toFixed(2);  
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return null;
    }
  };

  const getExchangeRate = async () => {
    const exchangeRate = await fetchExchangeRate();
    setExchangeRate(exchangeRate); 
  };

  // Allow user to perform calculations with the exchange rate
  const handleCurrencyInputChange = (event) => {
    const inputValue = event.target.value;
    setCurrencyInput(inputValue);  

    if (!isNaN(inputValue)) {
      const convertedValue = parseFloat(inputValue) * exchangeRate;
      setCurrencyOutput(convertedValue.toFixed(2)); 
    } 
  };

  return (
    <div style={{ position: "relative" }}>
      <BackgroundImage />
      <Background>
        <Grid container>
          <Grid item xs={6}>
            <ChatBox
              travelItinerary={itinerary}
              setItinerary={setItinerary}
              updateTravelItineraryInLocalStorage={
                updateTravelItineraryLocalStorage
              }
            ></ChatBox>
          </Grid>
          <Grid item xs={6} style={{ height: "100vh", overflowY: "auto" }}>
            <ItineraryTimeLine
              travelItinerary={itinerary}
              setItinerary={setItinerary}
            />
            <div style={{ position: "fixed", bottom: "20px", right: "50px" }}>
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                ADD NEW LOCATION
              </Button>
            </div>

            <div style={{ position: "fixed", bottom: "170px", right: "130px" }}>
              <label><b>Exchange Rate:</b> </label>
            </div>

            <div style={{ position: "fixed", bottom: "135px", right: "65px" }}>
              <input
                type="text"
                id="exchangeRate"
                name="exchangeRate"
                value={`1 AUD = ${exchangeRate} ${currencyCode}`}
                readonly
              />
            </div>

            <div style={{ position: "fixed", bottom: "100px", right: "65px" }}>
              <input
                type="number"
                id="currencyInput"
                name="currencyInput"
                size="4"
                value={currencyInput}
                placeholder = "Enter a Value (AUD)"
                min = "0"
                onChange={handleCurrencyInputChange}
              />
            </div>

            <div style={{ position: "fixed", bottom: "65px", right: "65px" }}>
              <input
                type="number"
                id="currencyOutput"
                name="currencyOutput"
                size="4"
                value={currencyOutput}
                placeholder = {`Output Value (${currencyCode})`}
                readOnly
              />
            </div>   
          </Grid>
        </Grid>
      </Background>

      <Box display="flex" justifyContent="stretch" width="100%">
        <Dialog open={open} onClose={handleClose} maxWidth="xs">
          <DialogTitle>Add New Itinerary Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                onChange={(newDate) => setStartDate(newDate)} // Pass the new Date object to setDate
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="End Date"
                onChange={(newDate) => setEndDate(newDate)} // Pass the new Date object to setDate
              />
            </LocalizationProvider>
            <TextField
              autoFocus
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              // error={Boolean(errors.name)}
              // helperText={errors.name}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // error={Boolean(errors.name)}
              // helperText={errors.name}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Cost"
              type="number"
              fullWidth
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              // error={Boolean(errors.name)}
              // helperText={errors.name}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
