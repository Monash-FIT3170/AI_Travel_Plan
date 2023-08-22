import { Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";
import Marker from "./MyMarker";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

/**
 * React component for the map on itinerary page
 * remember to do an npm install in the client folder to download all map packages.
 * requires a mapbox access token. Can be generated here: https://docs.mapbox.com/help/getting-started/access-tokens/
 *  create a .env file in the client folder and add your mapbox token there in the form:
 *  REACT_APP_MAPBOX_API_KEY="your api key"
 * @returns jsx for the map
 */

export default function MyMap() {
  // safeguard in case there is no mapbox api token
  if (!ACCESS_TOKEN) {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container width="100%">
          <Box sx={{ bgcolor: "#cfe8fc", height: "calc(100vh - 200px)" }}>
            <Typography>
              No Mapbox API key was detected. Follow instructions in
              components/map/MyMap.jsx comments to load map.
            </Typography>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
  return (
    <div>
      <Map
        mapboxAccessToken={ACCESS_TOKEN}
        initialViewState={{
          longitude: 144.946457,
          latitude: -37.840935,
          zoom: 10,
        }}
        style={{ width: "100%", height: "calc(100vh - 200px)" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      >
        {/* usage of a marker component */}
        <Marker long={144.946457} lat={-37.840935}>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Marker>
      </Map>
    </div>
  );
}
