import React, { useEffect } from "react";

import { mockTravel_Itinerary1 } from "../MockItinerary";
import { MyForm2 } from "../components/StorageDailyItineraryGeneral";
import EditButton from "../components/EditButton";
import AddButton from "../components/AddButton";
import DeleteButton from "../components/DeleteButton";
import DeleteAlert from "../components/DeleteAlert";
import NewDestination from "../components/NewDestination";
import ItinerarySumarryButton from "../components/ItinerarySummaryButton";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";

export function ItineraryPage() {
  useEffect(() => {
    // Store the mock data in local storage when the page is loaded
    const itineraryKey = "travelItinerary";
    const storedItinerary = localStorage.getItem(itineraryKey);

    if (!storedItinerary) {
      console.log(mockTravel_Itinerary1);
      localStorage.setItem(itineraryKey, JSON.stringify(mockTravel_Itinerary1));
    }
  }, []);
  return (
    <div>
      <BackgroundImage />
      <Background>
        <ItinerarySumarryButton />
        <AddButton />
        <EditButton />
        <NewDestination />
        <DeleteButton></DeleteButton>
        <DeleteAlert></DeleteAlert>
        <MyForm2 />
      </Background>
    </div>
  );
}
