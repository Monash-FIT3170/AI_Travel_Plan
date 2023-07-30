import { Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import Map from "react-map-gl";
// require("dotenv").config();

const ACCESS_TOKEN = "";

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
        style={{ width: "100%", height: "calc(100vh - 200px)" }} //reponsive map
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false} // Remove default attribution
      />
    </div>
  );
}
