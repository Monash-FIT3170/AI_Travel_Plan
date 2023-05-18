import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import MessageList from "./MessageList";
import MessageCard from "./MessageCard";

import { useLocalStorage } from "../LocalStorageGeneric";

import React, { useState, useEffect } from "react";
import axios from 'axios';

import { mockTravel_Itinerary1 } from "../../MockItinerary";

/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns
 */
export default function ChatBox() {
  /**
   * State - inputValue: the value in the text box
   */
  const [inputValue, setInputValue] = useState("");

  const [chatHistory, setChatHistory, updateValueInLocalStorage] =
    useLocalStorage("chatHistory", []);

  const [itinerary, setItinerary, updateValueInLocalStorage1] = useLocalStorage("travelItinerary", mockTravel_Itinerary1);

  /**
   * Method call when the button is clicked
   * TODO: need to add openai api routing here.
   * TODO: create new message and add it to the message list
   */
  const handleButtonClick = () => {
    addMessage(inputValue);
    setInputValue("");
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
      const response = await axios.post('http://localhost:4000/api/chatMessage', 
        {
          prompt: newMessage,
          travelItinerary: itinerary,
          chatHistory: chatHistory,
        }
      )
      console.log("message is"+response.data.message);
      const reply = response.data.message.chatResponse ? response.data.message.chatResponse : response.data.message;
      console.log("chatresponse is"+response.data.message.chatResponse);
      console.log("startDate is"+response.data.message.startDate);
      console.log("endate is"+response.data.message.endDate);
      console.log("schedule is"+response.data.message.schedule);
      const newTravelItinerary = {
        startDate: response.data.message.startDate ? response.data.message.startDate : "",
        endDate: response.data.message.endDate ? response.data.message.endDate : "",
        schedule: response.data.message.schedule ? response.data.message.schedule : [],
      }
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { prompt: newMessage, reply: reply },
      ]);
      setItinerary(() => [newTravelItinerary]);
    } catch (error) {
      console.error('API call error:',error);
    }
    
  };

  useEffect(() => {
    updateValueInLocalStorage(chatHistory);
  }, [chatHistory, updateValueInLocalStorage]);

  useEffect(() => {
    updateValueInLocalStorage1(itinerary);
  }, [itinerary, updateValueInLocalStorage1]);

  /**
   * jsx render
   */
  return (
    <div
      style={{
        position: "fixed",
        bottom: "50px",
        left: "10px",
        right: "150px",
      }}
    >
      <Box display="flex" alignItems="center">
        <MessageList />
      </Box>
      <Box display="flex" alignItems="center">
        <TextField
          multiline
          onChange={(value) => handleInputEnter(value)}
          value={inputValue}
          maxRows="4"
          minRows="1"
          label="Message"
          variant="outlined"
          id="fullWidth"
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleButtonClick} edge="end">
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </div>
  );
}
