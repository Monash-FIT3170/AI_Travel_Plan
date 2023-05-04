import React, { useState, useEffect } from "react";

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
          <ul>
            {itinerary.map((dailyItinerary, index) => (
              <li key={index}>
                Day {dailyItinerary.day}:{" "}
                {dailyItinerary.events.map((event) => event.name).join(", ")}
              </li>
            ))}
          </ul>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ItinerarySummaryButton;
