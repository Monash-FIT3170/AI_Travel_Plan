import { Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

/**
 * React component for the map on itinerary page
 * requires a mapbox access token. Can be generated here: https://docs.mapbox.com/help/getting-started/access-tokens/
 *  create a .env file in the client folder and add your mapbox token there in the form: 
 *  REACT_APP_MAPBOX_API_KEY="your api key"
 * @returns jsx for the map
 */
const markerIconUrl = "../assets/marker_blue.png";

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
        style={{ width: "100%", height: "calc(100vh - 200px)" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      >
        {/* Add the marker with label here */}
        <Marker
          longitude={144.946457}
          latitude={-37.840935}
          offsetLeft={-20}
          offsetTop={-10}
        >
          {/* for marker customization*/}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundImage: `url(${markerIconUrl})`,
              backgroundSize: "cover",
            }}
          >
            {/* <img src="../../assets/marker_blue.png" /> */}
          </div>
          {/* Add the label */}
          <Typography
            variant="caption"
            style={{
              position: "relative",
              top: "-20px",
              left: "-10px",
              background: "white",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            Marker
          </Typography>
        </Marker>
      </Map>
    </div>
  );
}
