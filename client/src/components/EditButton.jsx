import "../style.css";
import React, {useState} from "react";
import { useLocalStorage } from "./LocalStorageGeneric";

function EditButton() { // Initialise with invisible popup and empty values
    const [isPopupVisible, setPopupVisibility] = useState(false);
    
    const [itinerary, setItinerary, updateValueInLocalStorage] = useLocalStorage("dailyItinerary", "");

    const [eventName, setEventName] = useState();
    const [scheduleIndex, setScheduleIndex] = useState();
    const [eventsIndex, setEventsIndex] = useState();

    const exampleEventName = 'Meiji Jingu Shrine, Tokyo';


    const findEvent = (itinerary) => {
        for (let i = 0; i < Object.keys(itinerary.schedule).length; i++) {
            for (let j = 0; j < Object.keys(itinerary.schedule[i].events).length; j++) {
                let currentName = itinerary.schedule[i].events[j].name;
                if (currentName == exampleEventName) {
                    let currentEvent = itinerary.schedule[i].events[j];
                    
                    // console.log("in schedule location: " + i + " and events location: " + j);
                    let eventName = currentEvent.name;
                    setDestination(eventName);
                    setEventName(eventName);
                    setScheduleIndex(i);
                    setEventsIndex(j);
                }
            }
        }
    }

    console.log(itinerary.schedule[1].events);
    // Pass existing information into useState
    const [destinationVal, setDestination] = useState(eventName);
    const [dateVal, setDate] = useState(new Date('2023-05-27'));
    const [timeVal, setTime] = useState();


    // Updating the value when the input is changed
    const handleUpdate = (event, inputNum) => {
        const value = event.target.value;
        const fields = {
            1: setDestination,
            2: setDate,
            3: setTime
        };
        const setInput = fields[inputNum];
        setInput(value);
    };

    // Save the values once user clicks save
    const handleSave = () => { // Use destinationVal, dateVal, timeVal to store where needed
        itinerary.schedule[scheduleIndex].events[eventsIndex].name = destinationVal;
        console.log(itinerary);
        setPopupVisibility(false);
    };

    // Showing the popup with input fields and save button
    return (
        <div>
            <button onClick={
                () => {
                    setPopupVisibility(true);
                    findEvent(itinerary);}
            }>Edit destination</button>
            {
            isPopupVisible && (
                <div className="overlay">
                    <div className="popup">
                        <h2>Edit destination</h2>
                        <label htmlFor="inputDestination">Destination:</label>
                        <input id="inputDestination" type="text"
                            value={destinationVal}
                            onChange={
                                (e) => handleUpdate(e, 1)
                            }/>
                        <br></br>
                        <label htmlFor="inputDate">Date:</label>
                        <input id="inputDate" type="date"
                            value={dateVal.toISOString().slice(0, 10)}
                            onChange={
                                (e) => handleUpdate(e, 2)
                            }/>
                        <br></br>
                        <label htmlFor="inputTime">Time:</label>
                        <input id="inputTime" type="time"
                            value={timeVal}
                            onChange={
                                (e) => handleUpdate(e, 3)
                            }/>
                        <br></br>
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            )
        } </div>
    );
}

export default EditButton;
