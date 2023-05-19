import "../style.css";
import React, { useState } from "react";
import { useLocalStorage } from "../LocalStorageGeneric";

function EditButton() {
  // Initialise with invisible popup and empty values
  const [isPopupVisible, setPopupVisibility] = useState(false);

  // Initialise the daily itinerary
  const [itinerary, setItinerary, updateValueInLocalStorage] = useLocalStorage(
    "dailyItinerary",
    "",
  );

  // Initialise the event name, schedule index, and events index as states
  const [eventName, setEventName] = useState();
  const [scheduleIndex, setScheduleIndex] = useState();
  const [eventsIndex, setEventsIndex] = useState();

  // Test input for editing an event
  // Update this to automatically take the input for a specific event
  const exampleEventName = "Meiji Jingu Shrine, Tokyo";

  // Function to parse the date from ISO string to Date object
  function parseDateFromISO(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    const hours = dateString.slice(11, 13);
    const minutes = dateString.slice(14, 16);
    const seconds = dateString.slice(17, 19);
    const milliseconds = dateString.slice(20, 23);

    return new Date(
      Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds),
    );
  }

  // Function to parse the date from Date object to ISO string
  function parseDateToISO(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  // Function to find an event in the itinerary that matches the event name
  const findEvent = (itinerary) => {
    for (let i = 0; i < Object.keys(itinerary.schedule).length; i++) {
      for (
        let j = 0;
        j < Object.keys(itinerary.schedule[i].events).length;
        j++
      ) {
        let currentName = itinerary.schedule[i].events[j].name;
        if (currentName == exampleEventName) {
          let currentEvent = itinerary.schedule[i].events[j];
          let eventName = currentEvent.name;

          // Setting values based on event and location
          setDestination(eventName);
          setDate(parseDateFromISO(currentEvent.startTime));
          setEventName(eventName);
          setScheduleIndex(i);
          setEventsIndex(j);
        }
      }
    }
  };

  // Pass existing information into useState
  const [destinationVal, setDestination] = useState(eventName);
  const [dateVal, setDate] = useState(null);
  const [timeVal, setTime] = useState();

  // Updating the value when the input is changed
  const handleUpdate = (event, inputNum) => {
    const value = event.target.value;
    const fields = {
      1: setDestination,
      2: (val) => {
        if (val) {
          const date = parseDateFromISO(val);
          setDate(date);
        } else {
          setDate(null);
        }
      },
      3: setTime,
    };
    const setInput = fields[inputNum];
    setInput(value);
  };

  // Save the values once user clicks save
  const handleSave = () => {
    // Rebuilding itinerary in respective location
    itinerary.schedule[scheduleIndex].events[eventsIndex].name = destinationVal;
    itinerary.schedule[scheduleIndex].events[eventsIndex].startTime =
      parseDateToISO(dateVal);

    // Update local storage and close popup
    updateValueInLocalStorage(itinerary);
    setPopupVisibility(false);
  };

  // Showing the popup with input fields and save button
  return (
    <div>
      <button
        onClick={() => {
          setPopupVisibility(true);
          findEvent(itinerary);
        }}
      >
        Edit destination
      </button>
      {isPopupVisible && (
        <div className="overlay">
          <div className="popup">
            <h2>Edit destination</h2>
            <label htmlFor="inputDestination">Destination:</label>
            <input
              id="inputDestination"
              type="text"
              value={destinationVal}
              onChange={(e) => handleUpdate(e, 1)}
            />
            <br></br>
            <label htmlFor="inputDate">Date:</label>
            <input
              id="inputDate"
              type="date"
              value={dateVal.toISOString().slice(0, 10)}
              onChange={(e) => handleUpdate(e, 2)}
            />
            <br></br>
            <label htmlFor="inputTime">Time:</label>
            <input
              id="inputTime"
              type="time"
              value={timeVal}
              onChange={(e) => handleUpdate(e, 3)}
            />
            <br></br>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default EditButton;
