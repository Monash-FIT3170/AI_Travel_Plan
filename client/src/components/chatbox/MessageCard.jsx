import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * Component for a chat message
 * @param {JSON} props the properties passed to the component
 * @returns a chat message to be used in the chat area
 */
export default function MessageCard(props) {
  //determine the side of the screen to appear on
  //const alignStyle = props.sender === "user" ? "flex-end" : "flex-start";

  //determine the background colour
  const backgroundStyle = props.sender === "user" ? "#DCF8C6" : "#ECEFF1";

  let messageStyle = null
  if (props.sender==="user") {
    messageStyle = {        
    width:"max-content", // the size is automatically set to the size of the message inside
    minWidth: "0px", // minimum size is 0
    maxWidth: "60%", // maximum size is set based on box size
    marginLeft: "auto",
    marginBottom: "1",
    overflowWrap: "break-word",
  }
  } else if (props.sender==="server") {
    messageStyle = {        
      width:"max-content", // the size is automatically set to the size of the message inside
      minWidth: "0px", // minimum size is 0
      maxWidth: "60%", // maximum size is set based on box size
      marginRight: "auto",
      marginBottom: "1",
      overflowWrap: "break-word",
    }
  }
  

  //the message to be displayed
  // const message = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  // Curabitur finibus sed ante et ornare. Morbi vitae fringilla elit, a 
  // scelerisque mauris. Aliquam sodales lacus urna, elementum `;

  return (
    <Box
      style={messageStyle}
    >
      <Box padding={1} borderRadius={4} bgcolor={backgroundStyle}>
        <Typography variant="body1">{props.message}</Typography>
      </Box>
    </Box>
  );
}
