import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputValue }),
    }).then((response) => response.json());

    setMessages((prevMessages) => [...prevMessages, response.text]);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <Form onSubmit={handleMessageSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter your question"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Chatbox;
