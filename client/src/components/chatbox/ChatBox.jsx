import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import MessageList from "./MessageList";

import React, { useState } from "react";

/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns
 */
export default function ChatBox() {
  /**
   * State - inputValue: the value in the text box
   */
  const [inputValue, setInputValue] = useState("");

  /**
   * State - messges: list of messages in this chat
   */
  const [messages, setMessages] = useState([]);

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
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        width: "49%",
      }}
    >
      <Box height="84vh" width="100%">
        <MessageList />
      </Box>
      <Box display="flex" alignItems="center" padding="10px">
        <TextField
          style={{ width: "100%" }}
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
