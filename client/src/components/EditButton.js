import "../style.css";
import React, {useState} from "react";

function EditButton() { // Initialise with invisible popup and empty values
    const [isPopupVisible, setPopupVisibility] = useState(false);

    // Pass existing information into useState
    const [destinationVal, setDestination] = useState("Test");
    const [dateVal, setDate] = useState();
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


        setPopupVisibility(false);
    };

    // Showing the popup with input fields and save button
    return (
        <div>
            <button onClick={
                () => setPopupVisibility(true)
            }>Edit destination</button>
            {
            isPopupVisible && (
                <div className="edit-overlay">
                    <div className="edit-popup">
                        <h2>Edit destination</h2>
                        <label htmlFor="inputDestination">Destination:</label>
                        <input id="inputDestination" type="text"
                            value={destinationVal}
                            onChange={
                                (e) => handleUpdate(e, 1)
                            }/>
                        <label htmlFor="inputDate">Date:</label>
                        <input id="inputDate" type="date"
                            value={dateVal}
                            onChange={
                                (e) => handleUpdate(e, 2)
                            }/>
                        <label htmlFor="inputTime">Time:</label>
                        <input id="inputTime" type="time"
                            value={timeVal}
                            onChange={
                                (e) => handleUpdate(e, 3)
                            }/>
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            )
        } </div>
    );
}

export default EditButton;
