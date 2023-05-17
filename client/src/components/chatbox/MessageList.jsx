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
        <Box style={{
        width:"max-content",
        minWidth: "0px",
        maxWidth: "500px",
        alignSelf: "flex-end",
        marginBottom: "1",
      }}>
          <Box padding={1} borderRadius={4} bgcolor="#AAAAAA">
            <Typography variant="body1">{"find me in MessageList.jsx"}</Typography>
          </Box>
        </Box>
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
      </Stack>
    </div>
  );
}
