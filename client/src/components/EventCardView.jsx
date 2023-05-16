import React, { useState } from "react";
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
import { useLocalStorage } from "./LocalStorageGeneric";

export function EventCardView({ event }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(dayjs(event.startTime));
  const [time, setTime] = useState(dayjs(event.startTime));
  const [itinerary, setItinerary] = useLocalStorage("dailyItinerary");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedItinerary = {
      ...itinerary,
      schedule: itinerary.schedule.map((day) => ({
        ...day,
        events: day.events.map((e) => {
          if (e.name === event.name) {
            return {
              ...e,
              name,
              startTime: date.toDate(),
              endTime: date
                .add(dayjs(e.endTime).diff(dayjs(e.startTime), "hour"), "hour")
                .toDate(),
            };
          }
          return e;
        }),
      })),
    };

    setItinerary(updatedItinerary);
    setOpen(false);
    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="stretch">
      <Card variant="outlined">
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
          <Button size="small">Delete</Button>
          <Button size="small" onClick={handleClickOpen}>
            Edit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
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
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Controlled picker"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
            <TimePicker
              label="Controlled Time Picker"
              value={time}
              onChange={(newTime) => setTime(newTime)}
            />
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
