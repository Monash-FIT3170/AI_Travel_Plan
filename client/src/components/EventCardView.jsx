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
  const [date, setDate] = useState(dayjs(event.startTime).toDate());
  const [time, setTime] = useState(dayjs(event.startTime).toDate());
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
        activities: day.activities.filter((e) => e.name !== event.name),
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
    if (isNaN(date)) {
      dateError = "Date is not valid";
    }
    if (isNaN(time)) {
      timeError = "Time is not valid";
    }

    setErrors({ name: nameError, date: dateError, time: timeError });
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

    // Flatten all events and replace the old event with the new event
    const allEvents = itinerary.schedule.flatMap((day) => {
      return day.activities.map((e) => (e.name === event.name ? newEvent : e));
    });

    // Sort all events by startTime
    allEvents.sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

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
        date: dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        activities,
      }),
    );

    setItinerary({ ...itinerary, schedule: newSchedule });
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
            dayjs(event.endTime).diff(dayjs(event.startTime), "hour") +
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
