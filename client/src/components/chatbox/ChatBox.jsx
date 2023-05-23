import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import MessageList from "./MessageList";
import MessageCard from "./MessageCard";
import axios from "axios";
import { useLocalStorage } from "../LocalStorageGeneric";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns
 */
export default function Chatbox({
  travelItinerary,
  setItinerary,
  updateTravelItineraryInLocalStorage,
}) {
  /**
   * State - inputValue: the value in the text box
   */
  const [inputValue, setInputValue] = useState("");

  /**
   * State - outboxValue: the output value from the server
   */
  const [outboxValue, setOutboxValue] = useState("");

  /**
   * State - messges: list of messages in this chat
   */
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am your AI Travel Planner. How can I help you today?",
      sender: "server",
    },
  ]);

  const [chatHistory, setChatHistory, updateChatMessageInLocalStorage] =
    useLocalStorage("chatHistory", []);

  /**
   * Method call when the button is clicked
   * TODO: need to add openai api routing here.
   * TODO: create new message and add it to the message list
   */
  const handleButtonClick = (event) => {
    if (inputValue.length > 0) {
      addMessage(inputValue);

      const updatedMessages = [
        ...messages,
        { text: inputValue, sender: "user" },
      ];
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

  const reformItinerary = (itinerary) => {
    // Flatten all events
    const allEvents = itinerary.schedule.flatMap(
      (dailyItinerary) => dailyItinerary.activities,
    );

    // Sort all events by startTime
    allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    // Create a map of dates to events
    const dateToEventsMap = allEvents.reduce((map, event) => {
      const eventDate = dayjs(event.startTime).format("YYYY-MM-DD");
      if (!map[eventDate]) {
        map[eventDate] = [];
      }
      map[eventDate].push(event);
      return map;
    }, {});

    // Reconstruct the schedule array
    const newSchedule = Object.entries(dateToEventsMap).map(
      ([date, activities], index) => ({
        day: index + 1,
        date: new Date(date),
        activities,
      }),
    );

    // Return a new itinerary object
    return { ...itinerary, schedule: newSchedule };
  };

  const refactorItinerary = (itinerary) => {
    const format = "YYYY-MM-DDTHH:mm:ss.SSSZ";

    if (itinerary.schedule.length > 0) {
      const newItinerary = reformItinerary(itinerary);

      newItinerary.schedule.forEach((dailyItinerary) => {
        console.log(dailyItinerary);
        dailyItinerary.date = dayjs(dailyItinerary.date).format(format);
        dailyItinerary.activities.forEach((event) => {
          event.startTime = dayjs(event.startTime).format(format);
          event.endTime = dayjs(event.endTime).format(format);
        });
      });

      setItinerary(newItinerary);
    }
  };
  /**
   * adds a new message to the list of messages
   * @param {String} newMessage new message to add to the message list
   */

  const addMessage = async (newMessage) => {
    try {
      setOutboxValue("Loading...");
      // const response = await axios.get('http://localhost:4000/api/chatMessage',
      // )
      const response = await axios.get(
        "http://localhost:4000/api/chatMessage",
        {
          prompt: newMessage,
          travelItinerary: travelItinerary,
          chatHistory: chatHistory,
        },
      );
      console.log(response.data);
      const reply = response.data.chatResponse
        ? response.data.chatResponse
        : "Sorry, I don't understand that.";
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { prompt: newMessage, reply: reply },
      ]);

      if (response.data.travelItinerary) {
        const jsonVal = JSON.parse(
          JSON.stringify(response.data.travelItinerary),
        );
        console.log(jsonVal);
        refactorItinerary(jsonVal);
      }

      const updatedMessages = [
        ...messages,
        { text: inputValue, sender: "user" },
        { text: response.data.chatResponse, sender: "server" },
      ];
      setMessages(updatedMessages);
    } catch (error) {
      console.error("API call error:", error);
      const updatedMessages = [
        ...messages,
        { text: inputValue, sender: "user" },
        { text: "please try again", sender: "server" },
      ];
      setMessages(updatedMessages);
    }
  };

  // useEffect(() => {
  //   updateChatMessageInLocalStorage(chatHistory);
  // }, [chatHistory, updateChatMessageInLocalStorage]);

  // useEffect(() => {
  //   updateTravelItineraryInLocalStorage(travelItinerary);
  // }, [travelItinerary, updateTravelItineraryInLocalStorage]);

  /**
   * jsx render
   */
  return (
    // Flexbox with 73% fixed height so messages don't overlap on the input text field
    <div style={{ display: "flex", height: "73vh" }}>
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
        {messages.map((message, index) => (
          <div key={index} style={{ display: "flex" }}>
            <div
              style={{
                marginBottom: "10px",
                marginLeft: "15px",
                marginRight: "15px",
                width: "98%",
              }}
            >
              <MessageCard message={message.text} sender={message.sender} />
            </div>
          </div>
        ))}
      </div>
      {/* Input message text field */}
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
              style={{ backgroundColor: "rgb(23, 17, 50)", width: "51%", height: "100%", padding: "20px",marginLeft: "-20px", marginBottom: "-20px" , borderTopRightRadius: "20px",}}
            >
              <TextField
                placeholder="Enter message here"
                value={inputValue}
                onChange={handleInputEnter}
                multiline
                maxRows="4"
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
              />
              <IconButton
                onClick={handleButtonClick}
                edge="end"
                style={{ color: "black", backgroundColor: "white", marginLeft: "30px", }}
              >
    <SendIcon />
  </IconButton>
</Box>

      </div>
    </div>
  );
}
