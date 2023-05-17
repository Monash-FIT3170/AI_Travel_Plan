import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

export default function MessageCard(props) {
  const sender = "no"; // if this is set to "me", text turns green and alignment should be to the right. Currently doesn't align right though.
  const alignStyle = sender === "me" ? "flex-end" : "flex-start";
  const backgroundStyle = sender === "me" ? "#DCF8C6" : "#ECEFF1";
  const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus sed ante et ornare. Morbi vitae fringilla elit, a scelerisque mauris. Aliquam sodales lacus urna, elementum ";

  return (
    <Box
      style={{
        width:"max-content",
        minWidth: "0px",
        maxWidth: "500px",
        alignSelf: { alignStyle },
        marginBottom: "1",
      }}
    >
      <Box padding={1} borderRadius={4} bgcolor={backgroundStyle}>
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
}
