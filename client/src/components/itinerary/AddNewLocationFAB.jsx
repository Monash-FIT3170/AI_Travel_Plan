import React, {useState, useEffect} from "react";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  useTravelItinerary,
  useTravelItineraryDispatch,
} from "../../TravelItineraryContext";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
export function AddNewLocationFAB() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [cost, setCost] = useState();
  const [location, setLocation] = useState();
  const [city, setCity] = useState();
  const [chatResponse, setResponse] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
  const itinerary = useTravelItinerary();
  const itineraryDispatch = useTravelItineraryDispatch();

  const handleSave = () => {
    validateFields();
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
      city,
    };

    // Add the new event to the itinerary without sorting
    itinerary.schedule[0].activities.push(newEvent);

    // Reform itinerary
    itineraryDispatch({type: "updateTravelItinerary", payload: itinerary});
    setOpen(false);
  };

  const validateFields = () => {
    let nameError = "";
    let startDateError = "";
    let endDateError = "";

    if (!name || !name.trim()) {
      nameError = "Name is required";
    }

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
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        onClick={handleClickOpen}
        data-html2canvas-ignore="true"
      >
        ADD NEW LOCATION
      </Button>

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
              label="City"
              type="text"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              // error={Boolean(errors.name)}
              // helperText={errors.name}
            />
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
