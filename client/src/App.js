import React, { useEffect } from "react";
import AddButton from "./components/AddButton";
import ItineraryButton from "./components/ItinerarySummaryButton";
import { mockTravel_Itinerary1 } from "./MockItinerary.js";
import DeleteAlert from "./components/DeleteAlert";
import DeleteButton from "./components/DeleteButton";
import Template from "./components/Template";
import EditButton from "./components/EditButton";
import NewDestination from "./components/NewDestination";
import { MyForm2 } from "./components/StorageDailyItineraryGeneral";
// import { MyForm1 } from "./components/StorageEventGeneral";
import Chatbox from "./components/chatbox";

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
      // ART3
      <h1> HELLO </h1>
      <Template></Template>
      <EditButton />
      <NewDestination />
      {/* <AddButton /> */}
       
      <DeleteButton></DeleteButton>
      <DeleteAlert></DeleteAlert>
      <MyForm2 />
      // End of ART3

      <Chatbox />
    </div>
  );
}

export default App;
