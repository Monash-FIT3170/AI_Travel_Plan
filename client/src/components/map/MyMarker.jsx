import React, { useState } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

/**
 * Marker component to be displayed on the map
 * @param {float} props.long: the longitude of the marker
 * @param {float} props.lat: the latitude of the marker
 * @param {string} props.children: text to be displayed in the marker
 * @returns a marker component at the coordinates specified with the text in a popup.
 */
export default function MyMarker(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  console.log(isPopupOpen); // check if component re-renders
  return (
    <div>
      {/* Add the marker with label here */}
      <Marker
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
        longitude={props.long}
        latitude={props.lat}
        offsetLeft={-20}
        offsetTop={-10}
        onClick={togglePopup}
        style={{ cursor: "pointer" }}
      ></Marker>
      <div>
        {isPopupOpen ? (
          <Popup
            longitude={props.long}
            latitude={props.lat}
            offset={30}
            closeButton={false}
            closeOnClick={false}
            dynamicPosition={false}
          >
            {props.children}
          </Popup>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
