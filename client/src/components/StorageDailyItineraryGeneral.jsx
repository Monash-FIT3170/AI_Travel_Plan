import { useState } from "react";
import { useLocalStorage } from "./LocalStorageGeneric";
import { mockDaily_Itinerary1, mockTravel_Itinerary1 } from "../MockItinerary";
import { MyForm1 } from "./StorageEventGeneral";

export const MyForm2 = () => {
    
    
  const [itinerary, setItinerary, updateValueInLocalStorage] = useLocalStorage("dailyItinerary", mockDaily_Itinerary1);
  const [eventFormData, setEventFormData]  =useState({});

  updateValueInLocalStorage(mockTravel_Itinerary1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItinerary((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("event before formatting:", itinerary);
    const itineraryToStore = {
      ...itinerary,
      eventData: eventFormData
    };
    console.log("event after formatting:", itineraryToStore);
  };
  

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Enter day:
        <input
          type="number"
          name="day"
          value={itinerary.day}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Enter date:
        <input
          type="datetime-local"
          name="date"
          value={itinerary.date}
          onChange={handleChange}
        />
      </label>
      <button type="submit">SUBMIT</button>
    </form>
    <h3>EventForm</h3>
    <MyForm1 setEventFormData={setEventFormData} />
    </div>
  );

};

