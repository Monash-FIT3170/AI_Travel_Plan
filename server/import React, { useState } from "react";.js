import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I am your AI Travel Planner. How can I help you today?", sender: "server" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [outboxValue, setOutboxValue] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();

    // Store the user's message in the outbox
    setOutboxValue("Loading..."); // Placeholder message while fetching

    // Simulate API call (replace with your fetch request)
    setTimeout(() => {
      const response = "Sample response"; // Replace with actual response from server

      // Add user's message and server response to the messages state
      const updatedMessages = [
        ...messages,
        { text: inputValue, sender: "user" },
        { text: response, sender: "server" },
      ];
      setMessages(updatedMessages);

      // Clear the input field and outbox value
      setInputValue("");
      setOutboxValue("");
    }, 1000); // Simulating API delay
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "50px",
        left: "10px",
        right: "150px",
      }}
    >
      <div>
        {messages.reverse().map((message, index) => (
          <div key={index} style={{ display: "flex" }}>
            {message.sender === "server" && (
              <div style={{ marginRight: "auto", marginBottom: "10px", width: "70%" }}>
                <FormControl
                  as="textarea" 
                  rows={3}
                  value={message.text}
                  readOnly
                  style={{ resize: "none" }}
                />
              </div>
            )}
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
      <form onSubmit={handleMessageSubmit}>
        <Box display="flex" alignItems="center">
          <TextField
            multiline
            onChange={(e) => handleInputChange(e)}
            value={inputValue}
            maxRows="4"
            minRows="1"
            label="Type in your message"
            variant="outlined"
            id="fullWidth"
            style={{ width: "70%", marginRight: "10px" }}
          />
          <IconButton onClick={handleMessageSubmit} edge="end">
            <SendIcon />
          </IconButton>
        </Box>
      </form>
    </div>
  );
};

export default Chatbox;
