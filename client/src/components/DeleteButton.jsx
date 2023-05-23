import "../style.css";
import React, {useState} from "react";
import { useLocalStorage } from "./LocalStorageGeneric";
import { mockDaily_Itinerary1, mockEvent1 } from "../MockItinerary";

function DeleteButton() {
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [itinerary, setItinerary, updateValueInLocalStorage] = useLocalStorage("dailyItinerary", mockDaily_Itinerary1);

    // Delete the event from history once confirmed
    const handleDelete = (eventName) => {
        console.log(eventName);
        // get the itinerary item, find the matching event to delete, edit it, then set the itinerary again
        const updatedEvents = itinerary.schedule[0].events.filter((event) => event.name !== eventName);
        console.log(updatedEvents);
        const updatedItinerary = itinerary;
        updatedItinerary.schedule[0].events = updatedEvents;
        console.log(updatedItinerary);
        updateValueInLocalStorage(updatedItinerary);

        setPopupVisibility(false);
        var x = document.getElementById("deletedAlert");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
    };
    
    // Cancel deleting pop up
    const handleCancel = () => {
        setPopupVisibility(false);
    };

    // Showing the confirmation popup
    return (
        <div>
            <button onClick={
                () => setPopupVisibility(true)
            }>Delete destination</button>
            {
            isPopupVisible && (
                <div className="overlay">
                    <div className="popup">
                        <h2>Delete destination</h2>
                        <button id="cancelButton" onClick={handleCancel}>Cancel</button>
                        <button id="deleteButton" onClick={() => handleDelete(mockEvent1.name)}>Delete</button>
                    </div>
                </div>
            )
        } </div>
    );
}

export default DeleteButton;
