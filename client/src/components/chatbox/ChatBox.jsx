import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import {TextField} from "@mui/material";
import {Box, Typography} from "@mui/material";
import MessageCard from "./MessageCard";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, {useState, useContext} from "react";
import {
  useTravelItinerary,
  useTravelItineraryDispatch,
} from "../../TravelItineraryContext";
/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns
 */
export default function Chatbox({chatHistory, setChatHistory}) {
  const travelItinerary = useTravelItinerary();
  const dispatch = useTravelItineraryDispatch();
  /**
   * State - inputValue: the value in the text box
   */
  const [inputValue, setInputValue] = useState("");

  /**
   * State - outboxValue: the output value from the server
   */
  const [loading, setLoading] = useState(false);

  /**
   * State - messges: list of messages in this chat
   */
  const [messages, setMessages] = useState(
    chatHistory.length > 0
      ? chatHistory.flatMap(({prompt, reply}) => [
          {text: prompt, sender: "user"},
          {text: reply, sender: "server"},
        ])
      : [
          {
            text: "Hello, I am your AI Travel Planner. How can I help you today?",
            sender: "server",
          },
        ]
  );

  /**
   * States - initial information about the travel itinerary
   */
  const [destination, setDestination] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [budget, setBudget] = useState();
  const [chatStarted, setChatStarted] = useState(
    chatHistory.length > 0 ? true : false
  );
  const [showForm, setShowForm] = useState(false); // to track if form should be shown
  const handleConfirm = () => {
    // Check if the end date is before or the same as the start date
    if (endDate && startDate && (endDate.isBefore(startDate) || endDate.isSame(startDate))) {
      setDateError("End date must be after start date.");
      return; // Stop the function here
    }

    // Reset the error
    setDateError(null);

    setShowForm(false); // Hide the form after confirmation
    setChatStarted(true); // Start the chat
    setDestination(destination);
    setStartDate(startDate);
    setEndDate(endDate);
    setBudget(budget);
    const message = `I want to go to ${destination} from ${dayjs(
      startDate
    ).format("YYYY-MM-DD")} to ${dayjs(endDate).format(
      "YYYY-MM-DD"
    )} with a budget of ${budget}`;
    setMessages([...messages, {text: message, sender: "user"}]);
    addMessage(message);
    dispatch({
      type: "updateTravelItinerary",
      payload: {
        country: destination,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
      },
    });
  };

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      handleButtonClick(event);
    }
  };

  /**
   * Method call when the button is clicked
   * TODO: need to add openai api routing here.
   * TODO: create new message and add it to the message list
   */
  const handleButtonClick = (event) => {
    if (inputValue.length > 0) {
      addMessage(inputValue);

      const updatedMessages = [...messages, {text: inputValue, sender: "user"}];
      setMessages(updatedMessages);

      // Clear the input field
      setInputValue("");

      event.preventDefault();

      // Placeholder message while fetching
    }
  };

  /**
   * Allows the TextField to add more characters whenever there's an input
   * @param {*} event => event.target.value contains the input when a new character is added.
   */
  const handleInputEnter = (event) => {
    setInputValue(event.target.value);
  };

  /**
   * adds a new message to the list of messages
   * @param {String} newMessage new message to add to the message list
   */

  const addMessage = async (newMessage) => {
    try {
      setLoading(true);
      //HGet Mock data for testing
      // const response = await axios.get(
      //   "http://localhost:4000/api/chatMessage/confirmEvent"
      // );
      // dispatch({
      //   type: "insertNewEvent",
      //   payload: response.data,
      // });

      const response = await axios.post(
        "http://localhost:4000/api/chatMessage",
        {
          prompt: newMessage,
          travelItinerary: travelItinerary,
          chatHistory: chatHistory,
        }
      );

      console.log(response.data);
      setLoading(false);
      const reply = response.data.chatResponse
        ? response.data.chatResponse
        : "Sorry, I don't understand that.";

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {prompt: newMessage, reply: reply},
      ]);

      const updatedMessages = [
        ...messages,
        {text: inputValue, sender: "user"},
        {
          text: response.data.chatResponse,
          needConfirmation: response.data.needConfirmation,
          sender: "server",
        },
      ];
      setMessages(updatedMessages);
    } catch (error) {
      console.error("API call error:", error);
      const updatedMessages = [
        ...messages,
        {text: inputValue, sender: "user"},
        {text: "please try again", sender: "server"},
      ];
      setMessages(updatedMessages);
    }
  };

  /**
   * jsx render
   */

  const handleKeyClick = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents a newline from being added
      handleButtonClick(event);
    }
  };
  const loadingMessageStyle = {
    width: "max-content", // the size is automatically set to the size of the message inside
    minWidth: "0px", // minimum size is 0
    maxWidth: "60%", // maximum size is set based on box size
    marginRight: "auto",
    marginBottom: "1",
    overflowWrap: "break-word",
  };

  return (
    // Flexbox with 73% fixed height so messages don't overlap on the input text field
    <div style={{display: "flex", height: "73vh"}}>
      {/* Scrolling div for messages*/}
      <div
        style={{
          flex: "1",
          overflowY: "auto",
          overflowX: "none",
          paddingTop: "20px",
        }}
      >
        {/* Display each Message */}
        {messages.map((message, index, {length}) => (
          <div key={index} style={{display: "flex"}}>
            <div
              style={{
                marginBottom: "10px",
                marginLeft: "15px",
                marginRight: "15px",
                width: "98%",
              }}
            >
              <MessageCard
                message={message.text}
                sender={message.sender}
                needConfirmation={
                  message.needConfirmation && index === length - 1
                    ? true
                    : false
                }
                sendMessageFunction={addMessage}
              />
            </div>
          </div>
        ))}
        {loading ? (
          <Box style={loadingMessageStyle}>
            <Box padding={1} borderRadius={4} bgcolor="#ECEFF1">
              <Typography variant="body1">
                Waiting for response from travel planner
              </Typography>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          padding: "15px",
        }}
      >
        {/* Start the chat */}
        <Button
          variant="contained"
          onClick={() => setShowForm(true)} // on click, show the form
        >
          Chat now
        </Button>
        {/* Show the form and confirm button*/}
        {showForm && (
          <Box display="flex" justifyContent="stretch" width="100%">
            <Dialog open={setShowForm} maxWidth="xs">
              <DialogTitle>Get Started</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Welcome to our Travel Planner! Please fill in the form below
                  before starting the chat.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Destination"
                  type="text"
                  fullWidth
                  onChange={(e) => setDestination(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    onChange={(newDate) => setStartDate(newDate)} // Pass the new Date object to setDate
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    onChange={(newDate) => setEndDate(newDate)} // Pass the new Date object to setDate
                  />
                </LocalizationProvider>
                {dateError && <Typography color="error">{dateError}</Typography>}
                <TextField
                  autoFocus
                  margin="dense"
                  label="Budget"
                  type="number"
                  fullWidth
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleConfirm}>Start the chat</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </div>
      {/* Input message text field */}
      {chatStarted && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            padding: "15px",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            style={{
              backgroundColor: "rgb(23, 17, 50)",
              width: "51%",
              height: "100%",
              padding: "20px",
              marginLeft: "-20px",
              marginBottom: "-20px",
              borderTopRightRadius: "20px",
            }}
          >
            <TextField
              placeholder="Enter message here"
              value={inputValue}
              onChange={handleInputEnter}
              onKeyDown={keyPressed}
              multiline
              maxRows="1"
              minRows="1"
              style={{
                width: "70%",
                resize: "none",
                backgroundColor: "white",
                color: "black",
                marginLeft: "20px",
                borderRadius: "8px",
              }}
              variant="outlined"
              onKeyPress={handleKeyClick}
            />
            <IconButton
              onClick={handleButtonClick}
              edge="end"
              style={{
                color: "black",
                backgroundColor: "white",
                marginLeft: "30px",
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </div>
      )}
    </div>
  );
}
