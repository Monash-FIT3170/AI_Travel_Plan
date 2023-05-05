import React, { useState, useEffect } from "react";
import "./ItinerarySummaryButton.css";

const ItinerarySummaryButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const editEvent = (dayIndex, eventIndex) => {
    setEditingEvent({ dayIndex, eventIndex });
  };

  const validateInput = (name, address, description, cost) => {
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      description.trim() === ""
    ) {
      alert("Name, address, and description are required.");
      return false;
    }
    if (isNaN(cost) || cost < 0) {
      alert("Please enter a valid estimated cost.");
      return false;
    }
    return true;
  };

  const updateEvent = (event, dayIndex, eventIndex) => {
    event.preventDefault();
    const name = event.target.name.value;
    const address = event.target.address.value;
    const description = event.target.description.value;
    const cost = event.target.cost.value;

    if (validateInput(name, address, description, cost)) {
      const updatedEvent = { name, address, description, cost };
      const updatedItinerary = [...itinerary];
      updatedItinerary[dayIndex].events[eventIndex] = updatedEvent;
      setItinerary(updatedItinerary);
      setEditingEvent(null);
    }
  };

  const cancelEdit = () => {
    setEditingEvent(null);
  };

  // The below is used to load mock data from local storage.
  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("itinerary");
    if (storedData) {
      setItinerary(JSON.parse(storedData).schedule);
    } else {
      console.log("No data found in local storage.");
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  // The useEffect below is used to load mock data from the backend.
  /*
  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch("http://localhost:4000/mockItinerary");
        const data = await response.json();
        setItinerary(data.schedule);
      } catch (error) {
        console.error("Error fetching mock itinerary:", error);
      }
    };

    fetchItinerary();
  }, []); */

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div>
      <button onClick={togglePopup}>Show Itinerary</button>
      {showPopup && (
        <div className="popup">
          <h2>Your Itinerary</h2>
          {itinerary.map((dailyItinerary, dayIndex) => (
            <div key={dayIndex}>
              <h3 className="day-header">
                Day {dailyItinerary.day} ({formatDate(dailyItinerary.date)}):
              </h3>
              <ul>
                {dailyItinerary.events.map((event, eventIndex) => (
                  <li key={eventIndex}>
                    {editingEvent &&
                    editingEvent.dayIndex === dayIndex &&
                    editingEvent.eventIndex === eventIndex ? (
                      <form
                        onSubmit={(e) => updateEvent(e, dayIndex, eventIndex)}
                      >
                        <label>
                          Name:
                          <input
                            type="text"
                            name="name"
                            defaultValue={event.name}
                          />
                        </label>
                        <label>
                          Address:
                          <input
                            type="text"
                            name="address"
                            defaultValue={event.address}
                          />
                        </label>
                        <label>
                          Description:
                          <textarea
                            name="description"
                            defaultValue={event.description}
                          />
                        </label>
                        <label>
                          Estimated Cost:
                          <input
                            type="number"
                            name="cost"
                            defaultValue={event.cost}
                          />
                        </label>
                        <button type="submit">Update</button>
                        <button type="button" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <p className="event-title">{event.name}</p>
                        <p className="event-detail">
                          Description: {event.description}
                        </p>
                        <p className="event-detail">
                          Estimated Cost: ${event.cost}
                        </p>
                        <button
                          onClick={() => editEvent(dayIndex, eventIndex)}
                          className="event-edit-button"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={togglePopup} className="close-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ItinerarySummaryButton;
