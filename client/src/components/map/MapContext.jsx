import React, { useContext, useState, useEffect } from "react";
const MapContext = React.createContext();
const MapUpdateContext = React.createContext();

export function useMapContext() {
  return useContext(MapContext);
}
export function useMapContextUpdate() {
  return useContext(MapUpdateContext);
}

export function MapContextProvider({ children }) {
  const defaultCoords = {
    longitude: 144.946457,
    latitude: -37.840935,
    default: true,
  };

  const [coords, setCoords] = useState(defaultCoords);

  /**
   * function to change the coordinates of the centred map location
   * @param {{longitude: int, latitude: int, default: boolean}} newCoords new set of coordinates to center at
   */
  function changeCoords(newCoords) {
    setCoords(newCoords);
  }

  useEffect(() => {
    }, []);

  return (
    <MapContext.Provider value={coords}>
      <MapUpdateContext.Provider value={changeCoords}>
        {children}
      </MapUpdateContext.Provider>
    </MapContext.Provider>
  );
}
