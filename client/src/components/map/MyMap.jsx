import { Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import Map from "react-map-gl";
// require("dotenv").config();

const ACCESS_TOKEN = "insert token here"

/**
 * React component for the map on itinerary page
 * requires a mapbox access token. Can be generated here: https://docs.mapbox.com/help/getting-started/access-tokens/
 * @returns jsx for the map 
 */
export default function MyMap() {
  return (
    <div>
      <Map
        mapboxAccessToken={ACCESS_TOKEN}
        initialViewState={{
          longitude: 144.946457,
          latitude: -37.840935,
          zoom: 10,
        }}
        style={{ width: "100%", height: "400px" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
      <Typography>Map has hardcoded height. needs fix...</Typography>
      <Typography>Also idk how to get rid of the button and text under the map</Typography>
    </div>
  );
}