import React from "react";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

/**
 * Component for a chat message
 * @param {JSON} props the properties passed to the component
 * @returns a chat message to be used in the chat area
 */
export default function MessageCard(props) {
  //determine the side of the screen to appear on
  const alignStyle = props.sender === "me" ? "flex-end" : "flex-start";

  //determine the background colour
  const backgroundStyle = props.sender === "me" ? "#DCF8C6" : "#ECEFF1";

  //the message to be displayed
  const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Curabitur finibus sed ante et ornare. Morbi vitae fringilla elit, a 
  scelerisque mauris. Aliquam sodales lacus urna, elementum `;

  return (
    <Box
      style={{
        width:"max-content", // the size is automatically set to the size of the message inside
        minWidth: "0px", // minimum size is 0
        maxWidth: "60%", // maximum size is set based on box size
        alignSelf: alignStyle, // to the left or the right? depends on props.sender for now
        marginBottom: "1",
      }}
    >
      <Box padding={1} borderRadius={4} bgcolor={backgroundStyle}>
        <Typography variant="body1">{message}</Typography>
      </Box>
    </Box>
  );
}
