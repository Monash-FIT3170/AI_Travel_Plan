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
    <AppBar
      position="fixed"
      style={{ backgroundColor: "transparent", zIndex: 2, boxShadow: "none" }}
    >
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <HomeIcon style={{ marginRight: "10px", color: "white" }} />
          <Typography variant="h6" style={{ color: "white" }}>
            Get Packing Traveller
          </Typography>
        </Box>
        <Button
          color="inherit"
          component={Link}
          to="/chat"
          style={{ color: "white" }}
        >
          Chat
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/itinerary"
          style={{ color: "white" }}
        >
          Itinerary
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/example"
          style={{ color: "white" }}
        >
          Example
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
