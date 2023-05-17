import React from "react";
import MessageCard from "./MessageCard";
import Stack from "@mui/material/Stack";
import { Box, Typography } from "@mui/material";

export default function MessageList() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflowY: "auto",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack display="flex" spacing={2} width="100%">
        <MessageCard sender="me"/>
        <MessageCard sender="bot"/>
        <MessageCard sender="me"/>
        <MessageCard sender="bot"/>
        <MessageCard sender="me"/>
        <MessageCard sender="bot"/>
        <MessageCard sender="me"/>
        <MessageCard sender="me"/>
        <MessageCard sender="bot"/>
        <MessageCard sender="me"/>
        <MessageCard sender="bot"/>
        <MessageCard sender="me"/>
        <MessageCard sender="bot"/>
        <MessageCard sender="me"/>
      </Stack>
    </div>
  );
}
