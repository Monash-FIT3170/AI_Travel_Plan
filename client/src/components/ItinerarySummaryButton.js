import React, { useState, useEffect } from "react";

// Template for the pop up button showing user's itinerary summary.
// TODO: Replace dummy data with actual data from database (Call the bridge between front-end and back-end here)
const ItineraryButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    // Hardcoded data for now
    const dummyItinerary = [
      { id: 1, activity: "Visit the Eiffel Tower" },
      { id: 2, activity: "Take a Louvre Museum tour" },
    ];

    setItinerary(dummyItinerary);
  }, []);

  return (
    <div>
      <button onClick={togglePopup}>Show Itinerary</button>
      {showPopup && (
        <div className="popup">
          <h2>User's Itinerary</h2>
          <ul>
            {itinerary.map((item) => (
              <li key={item.id}>{item.activity}</li>
            ))}
          </ul>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ItineraryButton;
