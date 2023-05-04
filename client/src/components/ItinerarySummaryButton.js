import React, { useState, useEffect } from "react";
import "./ItinerarySummaryButton.css";

const ItinerarySummaryButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
  }, []);

  return (
    <div>
      <button onClick={togglePopup}>Show Itinerary</button>
      {showPopup && (
        <div className="popup">
          <h2>User's Itinerary</h2>
          {itinerary.map((dailyItinerary, index) => (
            <div key={index}>
              <h3 className="day-header">Day {dailyItinerary.day}:</h3>
              <ul>
                {dailyItinerary.events.map((event, eventIndex) => (
                  <li key={eventIndex}>
                    <p className="event-title">{event.name}</p>
                    <p className="event-detail">Address: {event.address}</p>
                    <p className="event-detail">
                      Description: {event.description}
                    </p>
                    <p className="event-detail">
                      Estimated Cost: ${event.cost}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ItinerarySummaryButton;
