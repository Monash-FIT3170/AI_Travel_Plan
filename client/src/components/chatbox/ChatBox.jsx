import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import MessageList from "./MessageList";
import MessageCard from "./MessageCard";
import { Form, FormControl } from "react-bootstrap";
import axios from "axios";

import React, { useState } from "react";
import { json } from "react-router-dom";

/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns
 */
export default function Chatbox({travelItinerary, setItinerary}) {
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
 

  /**
   * Method call when the button is clicked
   * TODO: need to add openai api routing here.
   * TODO: create new message and add it to the message list
   */
  const handleButtonClick = (event) => {
     const conversation =[]

  for (let i = 1; i < messages.length; i+=2) {
      
      const tempConversation = {prompt: messages[i].text, reply: messages[i+1].text}
      conversation.push(tempConversation)
  }

    if (inputValue.length > 0) {
      addMessage(inputValue);
      const requestMessage ={
        prompt: inputValue,
        travelItinerary: travelItinerary,
        chatHistory: conversation

      }
      axios.post('http://localhost:4000/api/chatMessage', requestMessage).then((response) => {
        console.log(response)
        if (response.data.travelItinerary){
          const jsonTravelItinerary = JSON.parse(response.data.travelItinerary)
          console.log(jsonTravelItinerary)
          setItinerary(jsonTravelItinerary)
        }
        //to do update itinerary page 
        const updatedMessages = [
          ...messages,
          { text: inputValue, sender: "user" },

          { text: response.data.chatResponse, sender: "server" },
        ];
        setMessages(updatedMessages);

        // Clear the input field
        setInputValue("");
      })

      console.log(messages)

      
      event.preventDefault();

      // Placeholder message while fetching
      setOutboxValue("Loading...");
      

      // // Simulating API call, replace with actual server's response
      // setTimeout(() => {
      //   const response = "testing";

      //   // Add user's input message and server's response to the messages state
       
      // });
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
  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  /**
   * jsx render
   */
  return (
    // Flexbox with 73% fixed height so messages don't overlap on the input text field
    <div style={{ display: "flex", height: "73vh" }}>
      {/* Scrolling div for messages*/}
      <div style={{ flex: "1", overflowY: "auto", overflowX: "none", paddingTop: "20px" }}>
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
        <Box display="flex" alignItems="center">
          <TextField
            placeholder="Type in your message"
            value={inputValue}
            onChange={handleInputEnter}
            multiline
            maxRows="4"
            minRows="1"
            style={{ width: "50%", resize: "none" }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={handleButtonClick}
                  edge="end"
                  style={{ color: "white", backgroundColor: "black" }}
                >
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </div>
    </div>
  );
}
