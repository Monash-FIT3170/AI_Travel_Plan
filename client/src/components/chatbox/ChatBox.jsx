import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import MessageList from "./MessageList";
import MessageCard from "./MessageCard";
import { Form, FormControl } from "react-bootstrap";

import React, { useState } from "react";

/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns
 */
export default function Chatbox () {
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
    { text: "Hello, I am your AI Travel Planner. How can I help you today?", sender: "server" },
  ]);

  /**
   * Method call when the button is clicked
   * TODO: need to add openai api routing here.
   * TODO: create new message and add it to the message list
   */
  const handleButtonClick = (event) => {
    addMessage(inputValue);
    event.preventDefault();

   // Placeholder message while fetching
    setOutboxValue("Loading..."); 

    // Simulating API call, replace with actual server's response
    setTimeout(() => {
      const response = "testing";

      // Add user's input message and server's response to the messages state
      const updatedMessages = [
        ...messages,
        { text: inputValue, sender: "user" },
        { text: response, sender: "server" },
      ];
      setMessages(updatedMessages);

      // Clear the input field
      setInputValue("");
    }); 
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
    //just for testing vv
    //TODO: the messages printed are delayed by 1 message. Why is that?
    console.log("\nhere is the array contents:");
    for (let i = 0; i < messages.length; i++) {
      console.log(messages[i]);
    }
    console.log("end of contents\n");
  };

  /** 
   * jsx render
   */
  return (
    // Flexbox with 73% fixed height so messages don't overlap on the input text field
    <div style={{ display: "flex", height: "73vh" }}> 
      {/* Scrolling div for messages*/}
      <div style={{ flex: "1", overflowY: "auto", paddingTop: "20px"}}>
        {/* Display each Message */}
        {messages.map((message, index) => (
          <div key={index} style={{ display: "flex" }}>
            {/* Message from Server */}
            {message.sender === "server" && (
              <div style={{ marginRight: "auto", marginBottom: "10px", marginLeft: "15px", width: "70%" }}>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={message.text}
                  readOnly
                  style={{ resize: "none" }}
                />
              </div>
            )}
            {/* Message from User */}
            {message.sender === "user" && (
              <div style={{ marginLeft: "auto", marginBottom: "10px", width: "70%" }}>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={message.text}
                  readOnly
                  style={{ resize: "none" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Input message text field */}
      <div style={{ position: "fixed", bottom: "0", left: "0", width: "100%", padding: "10px" }}>
        <Form onSubmit={handleButtonClick}>
          <Form.Group style={{ margin: "0", padding: "5px" }}>
            <Box display="flex" alignItems="center">
              <TextField
                type="text"
                placeholder="Type in your message"
                value={inputValue}
                onChange={handleInputEnter}
                multiline
                rows={1}
                style={{ width: "50%", resize: "none" }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      type="submit"
                      edge="end"
                      style={{ color: "white", backgroundColor: "black" }}
                    >
                      <SendIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
