import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const MyAppBar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#123456" }}>
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <HomeIcon style={{ marginRight: "10px" }} />
          <Typography variant="h6">Get Packing Traveller</Typography>
        </Box>
        <Button color="inherit" component={Link} to="/chat">
          Chat
        </Button>
        <Button color="inherit" component={Link} to="/itinerary">
          Itinerary
        </Button>
        <Button color="inherit" component={Link} to="/example">
          Example
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
