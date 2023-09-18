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

export default function ClickMapMarkerIcon(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //TODO: shold centre map to valid coord.
  if (props.coords.longitude && props.coords.latitude) {
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
              : "coordinates to this location could not be found"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.coords.latitude && props.coords.longitude
                ? props.coords.latitude
                : "Latitude could not be found"}
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
  }
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
              : "coordinates to this location could not be found"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.coords.latitude && props.coords.longitude
                ? props.coords.latitude
                : "Latitude could not be found"}
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
