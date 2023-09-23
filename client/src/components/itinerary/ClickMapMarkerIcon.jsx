import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import "./ClickMapMarkerIcon.css";
import { useMapContextUpdate } from "../map/MapContext";

export default function ClickMapMarkerIcon(props) {
  const [open, setOpen] = React.useState(false);
  const toggleCoords = useMapContextUpdate()

  // recentres map to valid coords
  const handleValidCoordClick = () => {
    // do something to recentre map
    let coords = {latitude: props.coords.latitude, longitude: props.coords.longitude, default: false}
    console.log("Updated coords:", coords);
    toggleCoords(coords)
  }

  // opens popup when invalid coords and clicked
  const handleClickOpen = () => {
    setOpen(true);
  };

  // closes popup
  const handleClose = () => {
    setOpen(false);
  };

  //if has valid coords for this location, centre to there
  if (props.coords.longitude && props.coords.latitude) {
    return (
      <div>
        <IconButton
          className="click-map-marker-icon"
          onClick={handleValidCoordClick}
          edge="start"
        >
          <PlaceIcon />
        </IconButton>
      </div>
    );
  }
  // if coords invalid, show popup instead
  return (
    <div>
      <IconButton
        className="click-map-marker-icon"
        onClick={handleClickOpen}
        edge="start"
      >
        <PlaceIcon onClick={handleClickOpen} />
      </IconButton>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {props.coords.latitude && props.coords.longitude
              ? "this should not exist"
              : "Location Error"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.coords.latitude && props.coords.longitude
                ? props.coords.latitude
                : "The coordinates to this location could not be found on the map."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
