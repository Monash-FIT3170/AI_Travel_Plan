import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {fetchWeatherForLocation, getWeatherIconUrl} from "../api/weatherAPI.js";
import {PlaceSearch} from "../api/imageAPI.jsx";
import {
  useTravelItineraryDispatch,
  useTravelItinerary,
} from "../../TravelItineraryContext.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export function EventCardView({event}) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [cost, setCost] = useState(event.cost);
  const [location, setLocation] = useState(event.city);
  const [chatResponse, setResponse] = useState(event.chatResponse);
  const [date, setDate] = useState(dayjs(event.startTime).toDate());
  const [time, setTime] = useState(dayjs(event.startTime).toDate());
  const [errors, setErrors] = useState({name: "", date: "", time: ""});
  const [weatherData, setWeatherData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const fetchImage = async () => {
    const data = await PlaceSearch(event.location);
    setImageUrl(data);
  };
  const itinerary = useTravelItinerary();
  const itineraryDispatch = useTravelItineraryDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({name: "", date: "", time: ""});
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Remove the event from the itinerary
    const updatedItinerary = {
      ...itinerary,
      schedule: itinerary.schedule.map((day) => ({
        ...day,
        activities: day.activities.filter((e) => e.name !== event.name),
      })),
    };

    // Update the itinerary
    itineraryDispatch({
      type: "updateTravelItinerary",
      payload: updatedItinerary,
    });

    // Close the delete confirmation dialog
    setDeleteOpen(false);
  };

  useEffect(() => {
    let nameError = "";
    let dateError = "";
    let timeError = "";

    if (!name.trim()) {
      nameError = "Name is required";
    }
    if (isNaN(date)) {
      dateError = "Date is not valid";
    }
    if (isNaN(time)) {
      timeError = "Time is not valid";
    }

    setErrors({name: nameError, date: dateError, time: timeError});
  }, [name, date, time]);

  const handleSave = () => {
    if (errors.name || errors.date || errors.time) {
      alert("Please enter valid inputs before saving.");
      return;
    }

    // Create a new event object with updated values
    const newEvent = {
      chatResponse,
      cost,
      description,
      endTime: dayjs(date)
        .add(dayjs(event.endTime).diff(dayjs(event.startTime), "hour"), "hour")
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      startTime: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      name,
      location,
    };

    itineraryDispatch({type: "insertNewEvent", payload: newEvent});
    setOpen(false);
  };

  const fetchWeather = async () => {
    const weatherData = await fetchWeatherForLocation(location);
    setWeatherData(weatherData);
  };

  // Do not delete, this is to call the api on load.
  useEffect(() => {
    fetchImage();
    fetchWeather();
  }, []);
  return (
    <Box display="flex" justifyContent="stretch" width="100%">
      <Card variant="outlined" style={{width: "100%"}}>
        <CardHeader
          avatar={<PlaceIcon />}
          title={event.name}
          subheader={
            "DURATION: " +
            (new Date(event.endTime) - new Date(event.startTime)) /
              (1000 * 60 * 60) +
            " HRS"
          }
          action={
            <Box display="flex" alignItems="center">
              {weatherData && (
                <img
                  src={getWeatherIconUrl(weatherData.weather[0].icon)}
                  alt="Weather Icon"
                  style={{marginRight: "10px"}}
                />
              )}
              <Typography>
                {weatherData
                  ? `Current temperature: ${weatherData.main.temp}℃`
                  : "Fetching weather..."}
              </Typography>
            </Box>
          }
        />
        <CardMedia sx={{height: 200}} image={imageUrl} />
        <CardContent>{event.description}</CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={handleDeleteOpen}
            data-html2canvas-ignore="true"
          >
            Delete
          </Button>
          <Button
            size="small"
            onClick={handleClickOpen}
            data-html2canvas-ignore="true"
          >
            Edit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>This action cannot be undone</DialogTitle>
        <DialogContent>
          Deleting this item will remove it from the itinerary and cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Edit Event</DialogTitle>
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
            <Box width={"100%"} mt={2}>
              <DatePicker
                label="Date"
                value={dayjs(date)}
                onChange={(newDate) => setDate(newDate.toDate())}
                error={Boolean(errors.date)}
                helperText={errors.date}
              />
            </Box>
            {/* <Box width={"100%"} mt={2}>
              <TimePicker
                label="Time"
                // Removing localisation for now.
                value={time.tz(specificTimezone)}
                onChange={(newTime) => setTime(newTime)}
                error={Boolean(errors.time)}
                helperText={errors.time}
              />
            </Box> */}
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
