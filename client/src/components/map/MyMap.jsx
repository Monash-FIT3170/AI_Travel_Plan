import { Typography } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map from "react-map-gl";
import Marker from "./MyMarker";
import { useTravelItinerary } from "../../TravelItineraryContext";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useMapContext, useMapContextUpdate } from "./MapContext"; // Import useMapContextUpdate

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
  const travelItinerary = useTravelItinerary();
  const centerCoordinatesFromContext = useMapContext();
  const toggleCoords = useMapContextUpdate(); // Get the function to update coordinates

  const [viewport, setViewport] = useState({
    longitude: centerCoordinatesFromContext.longitude,
    latitude: centerCoordinatesFromContext.latitude,
    zoom: 10,
  });
  const [centerCoordinates, setCenterCoordinates] = useState(
    centerCoordinatesFromContext
  );

  useEffect(() => {
    setViewport({
      longitude: centerCoordinatesFromContext.longitude,
      latitude: centerCoordinatesFromContext.latitude,
      zoom: 10,
    });
  }, [centerCoordinatesFromContext]);

  if (
    centerCoordinates.default &&
    travelItinerary &&
    travelItinerary.schedule
  ) {
    loop1: for (const schedule of travelItinerary.schedule) {
      if (schedule.activities && schedule.activities.length > 0) {
        for (const activity of schedule.activities) {
          const parsedLong = parseFloat(activity.longitude);
          const parsedLat = parseFloat(activity.latitude);
          if (!isNaN(parsedLong) && !isNaN(parsedLat)) {
            setCenterCoordinates({
              longitude: parsedLong,
              latitude: parsedLat,
              default: false,
            });

            // Use the function to update coordinates here
            toggleCoords({
              longitude: parsedLong,
              latitude: parsedLat,
              default: false,
            });

            break loop1;
          }
        }
      }
    }
  }

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
    <div style={{ paddingLeft: "20px" }}>
      <Map
        mapboxAccessToken={ACCESS_TOKEN}
        {...viewport}
        style={{ width: "100%", height: "calc(100vh - 200px)" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {travelItinerary.schedule &&
          travelItinerary.schedule.map((schedule, scheduleIndex) =>
            schedule.activities.map((activity, index) => {
              const parsedLong = parseFloat(activity.longitude);
              const parsedLat = parseFloat(activity.latitude);

              if (!isNaN(parsedLong) && !isNaN(parsedLat)) {
                return (
                  <Marker
                    key={`${scheduleIndex}-${index}`}
                    long={parsedLong}
                    lat={parsedLat}
                  >
                    {activity.name}
                  </Marker>
                );
              }

              return null;
            })
          )}
      </Map>
    </div>
  );
}
