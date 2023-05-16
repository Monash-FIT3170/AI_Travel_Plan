import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export function EventCardView({ event, itinerary, setItinerary }) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [cost, setCost] = useState(event.cost);
  const [location, setLocation] = useState(event.location);
  const [chatResponse, setResponse] = useState(event.chatResponse);
  const [date, setDate] = useState(dayjs(event.startTime));
  const [time, setTime] = useState(dayjs(event.startTime));
  const [errors, setErrors] = useState({ name: "", date: "", time: "" });
  let specificTimezone = "America/New_York";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({ name: "", date: "", time: "" });
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
        events: day.events.filter((e) => e.name !== event.name),
      })),
    };

    // Update the itinerary
    setItinerary(updatedItinerary);

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
    if (!date.isValid()) {
      dateError = "Date is not valid";
    }
    if (!time.isValid()) {
      timeError = "Time is not valid";
    }

    setErrors({ name: nameError, date: dateError, time: timeError });
  }, [name, date, time]);

  const handleSave = () => {
    if (errors.name || errors.date || errors.time) {
      alert("Please enter valid inputs before saving.");
      return;
    }

    const updatedItinerary = {
      ...itinerary,
      schedule: itinerary.schedule.map((day) => {
        // Filter out the event with a matching name from the original events array
        const updatedEvents = day.events.filter((e) => e.name !== event.name);

        // Check if the current day's date matches the selected date
        if (dayjs(day.date).isSame(date, "day")) {
          // Create a new event object with updated values
          const newEvent = {
            chatResponse,
            cost,
            description,
            endTime: date
              .add(
                dayjs(event.endTime).diff(dayjs(event.startTime), "hour"),
                "hour",
              )
              .toDate(),
            location,
            name,
            startTime: date.toDate(),
          };

          // Add the new event to the end of the array
          updatedEvents.push(newEvent);
        }

        return {
          ...day,
          events: updatedEvents,
        };
      }),
    };

    setItinerary(updatedItinerary);
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="stretch" width="100%">
      <Card variant="outlined" style={{ width: "100%" }}>
        <CardHeader
          avatar={<PlaceIcon />}
          title={event.name}
          subheader={
            "DURATION: " +
            Math.floor((event.endTime - event.startTime) / (1000 * 60 * 60)) +
            " HRS"
          }
        />
        <CardContent>{event.description}</CardContent>
        <CardActions>
          <Button size="small" onClick={handleDeleteOpen}>
            Delete
          </Button>
          <Button size="small" onClick={handleClickOpen}>
            Edit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle>This action cannot be undon</DialogTitle>
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
                // Removing localisation for now.
                value={date.tz(specificTimezone)}
                onChange={(newDate) => setDate(newDate)}
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
