import React, { useEffect } from "react";
import EditButton from "./components/EditButton";
import AddButton from "./components/AddButton";
import ItineraryButton from "./components/ItinerarySummaryButton";
import { mockTravel_Itinerary1 } from "./MockItinerary.js";

function App() {
  // useEffect below is to store mock data in local storage temorarily until we are able to get real data.
  useEffect(() => {
    // Store the mock data in local storage when the page is loaded
    const itineraryKey = "travelItinerary";
    const storedItinerary = localStorage.getItem(itineraryKey);

    if (!storedItinerary) {
      localStorage.setItem(itineraryKey, JSON.stringify(mockTravel_Itinerary1));
    }
  }, []);

  return (
    <div>
      <EditButton />
      <AddButton />
      <ItineraryButton />
    </div>
  );
}

export default App;
