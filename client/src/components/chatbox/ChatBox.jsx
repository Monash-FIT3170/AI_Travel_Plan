import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import MessageCard from "./MessageCard";
import axios from "axios";
import {useLocalStorage} from "../LocalStorageGeneric";
import React, {useState, useContext, useEffect} from "react";
import {
  useTravelItinerary,
  useTravelItineraryDispatch,
} from "../../TravelItineraryContext";
/**
 * Contains the entire code for a chat box area, including text field, message display.
 * @returns
 */
export default function Chatbox() {
  
  const DEFAULT_MESSAGE = [
    {
      text: "Hello, I am your AI Travel Planner. How can I help you today?",
      sender: "server",
    },
];

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
  const [messages, setMessages] = useState(DEFAULT_MESSAGE);

    const [persistedMsgs, setPersistedMsgs] = useLocalStorage('chatMessages', []);

    useEffect(() => {
      setMessages(persistedMsgs);
    }, []);

    useEffect(() => {
      setPersistedMsgs(messages);
    }, [messages]);

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

      const Messages =  {text: inputValue, sender: "user"};
      setMessages(prevMessages => [...prevMessages, Messages]);

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

  const travelItinerary = useTravelItinerary();
  const dispatch = useTravelItineraryDispatch();

  /**
   * adds a new message to the list of messages
   * @param {String} newMessage new message to add to the message list
   */

  const addMessage = async (newMessage) => {
    try {
      setOutboxValue("Loading...");
      //HGet Mock data for testing
      // const response = await axios.get("http://localhost:4000/api/chatMessage");
      // dispatch({
      //   type: "updateTravelItinerary",
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
      const reply = response.data.chatResponse
        ? response.data.chatResponse
        : "Sorry, I don't understand that.";

      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {prompt: newMessage, reply: reply},
      ]);

      const serverMessages = {
        text: response.data.chatResponse,
        needConfirmation: response.data.needConfirmation,
        sender: "server",
      };

      setMessages(prevMessages => [...prevMessages, serverMessages]);

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
              />
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
    </div>
  );
}
