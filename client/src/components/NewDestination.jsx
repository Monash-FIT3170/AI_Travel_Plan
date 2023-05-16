import "../style.css";
import React, {useState} from "react";
import { useLocalStorage } from "./LocalStorageGeneric";

function NewDestination() { 
    // Initialise with invisible popup and empty values
    const [isPopupVisible, setPopupVisibility] = useState(false);

    // Initialise the daily itinerary
	const [itinerary, setItinerary, updateValueInLocalStorage] = useLocalStorage(
		"dailyItinerary",
		""
	);

    // Initialise the event name, schedule index, and events index as states
	const [eventName, setEventName] = useState();
	const [scheduleIndex, setScheduleIndex] = useState();

    let ARRAY_FRONT_FLAG = -1;

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
			Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds)
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
	const findEventFromDate = (date) => {
        //NOTE: there is no protection/validation for empty dates, descriptions or times

        //case where we are before the first one (need to insert a day first)
        let earliestDate = parseDateFromISO(itinerary.schedule[0].date);
        if (earliestDate > date) {
            setScheduleIndex(ARRAY_FRONT_FLAG);
        }

        //case where we are after the final day (need to insert a day at the end on its own)
        let latestDate = parseDateFromISO(itinerary.schedule[itinerary.schedule.length-1].date);
        if (latestDate < date) {
            setScheduleIndex(itinerary.schedule.length);
        }

		for (let i = 0; i < Object.keys(itinerary.schedule).length; i++) {
				let currentDate = parseDateFromISO(itinerary.schedule[i].date);
				if (currentDate.getDate() == date.getDate() & currentDate.getFullYear() == date.getFullYear() & currentDate.getMonth() == date.getMonth()) {
                    
                    // case where the date is in the middle
					setScheduleIndex(i);
				}
		}
	};


    // Pass existing information into useState
    const [destNameVal, setDestinationName] = useState(eventName);
    const [destDescVal, setDestDescription] = useState(eventName);
    const [dateVal, setDate] = useState();
    const [timeVal, setTime] = useState();

    // Updating the value when the input is changed
    const handleUpdate = (event, inputNum) => {
        const value = event.target.value;
        const fields = {
            0: setDestinationName,
            1: setDestDescription,
            2: (val) => {
                if (val) {
                    const date = parseDateFromISO(val);
                    setDate(date);
                    findEventFromDate(date);
                } else {
                    setDate(null);
                }
            },
            3: setTime
        };
        const setInput = fields[inputNum];
        setInput(value);
    };

    // Save the values once user clicks save
    const handleSave = () => { 
        // Use destinationVal, dateVal, timeVal to store where needed

        // Adding the new event in the itinerary in the desired location
        // Note: TIME is not used to order the events in the events array
        let newEventObject = {
            address: null, //no address data for manual events 
            chatResponse: "", 
            cost: 0, 
            description: destDescVal,
            endTime: parseDateToISO(dateVal), //no duration is considered in this implementation. Future version should ask for start and finish to calculate length of stay
            startTime: parseDateToISO(dateVal),
            name: destNameVal
        }

        // Initiate schedule for addition at before or after existing dates
        let newScheduleObject = {
            date: parseDateToISO(dateVal),
            day: 1,
            events: []
        }

        if (scheduleIndex == ARRAY_FRONT_FLAG) {
            // add new schedule object to the front
            newScheduleObject.events[0] = newEventObject;
            itinerary.schedule.unshift(newScheduleObject);

            // update the event numbers for all of the remaining days
            for (let i = 0; i < Object.keys(itinerary.schedule).length; i++) {
                itinerary.schedule[i].day = itinerary.schedule[i].day++;
            }

        } else if (scheduleIndex >= itinerary.schedule.length) {
            // add new schedule object to the end
            newScheduleObject.events[0] = newEventObject;
            itinerary.schedule.push(newScheduleObject);

        } else {
            var numOfEvents = Object.keys(itinerary.schedule[scheduleIndex].events).length;
		    itinerary.schedule[scheduleIndex].events[numOfEvents] = newEventObject;
        }

		// Update local storage and close popup
		updateValueInLocalStorage(itinerary);

        setPopupVisibility(false);
    };

    // Showing the popup with input fields and save button
    return (
        <div>
            <button onClick={
                () => {
                    setPopupVisibility(!isPopupVisible);
                }
            }>Add New Destination</button>
            {
            isPopupVisible && (
                <div className="overlay">
                    <div className="popup">
                        <h2>Add New Destination</h2>
                        <label htmlFor="inputDestName">Destination Name:</label>
                        <input id="inputDestName" type="text"
                             
                            onChange={
                                (e) => handleUpdate(e, 0)
                            }/>
                        <br></br>
                        <label htmlFor="inputDestination">Destination Description:</label>
                        <input id="inputDestination" type="text"
    
                            onChange={
                                (e) => handleUpdate(e, 1)
                            }/>
                        <br></br>
                        <label htmlFor="inputDate">Date:</label>
                        <input id="inputDate" type="date"
                            // value={dateVal.toISOString().slice(0, 10)}
                            onChange={
                                (e) => handleUpdate(e, 2)
                            }/>
                        <br></br>
                        <label htmlFor="inputTime">Time:</label>
                        <input id="inputTime" type="time"
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

export default NewDestination;
