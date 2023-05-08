import "../style.css";
import React, {useState} from "react";

function DeleteButton() {
    const [isPopupVisible, setPopupVisibility] = useState(false);

    // Pass existing information into useState
    const [destinationVal] = useState("Test");
    const [dateVal] = useState();
    const [timeVal] = useState();

    // Delete the event from history once confirmed
    const handleDelete = () => {
        setPopupVisibility(false);
        var x = document.getElementById("deletedAlert");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        
    };
    
    // Delete the event from history once confirmed
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
                        <button id="cancelButton" onClick={
                            () => setPopupVisibility(false)
                        }>Cancel</button>
                        <button id="deleteButton" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )
        } </div>
    );
}

export default DeleteButton;
