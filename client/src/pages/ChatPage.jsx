import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import {ItineraryTimeLine} from "../components/itinerary/ItineraryTimeLine";
import Grid from "@mui/material/Grid";
import ChatBox from "../components/chatbox/ChatBox";
import React, {useState} from "react";
import Button from "@mui/material/Button";

import {AddNewLocationFAB} from "../components/itinerary/AddNewLocationFAB";
import {TravelItineraryProvider} from "../TravelItineraryContext";

export function ChatPage() {
  const [chatBoxKey, setChatBoxKey] = useState(1); // Add a state for key

  const clearChat = () => {
    // Remove chat history from local storage
    localStorage.removeItem("chatHistory");
    setChatBoxKey((prevKey) => prevKey + 1); // Increment the key to force remount
  };

  return (
    <div style={{position: "relative"}}>
      <BackgroundImage />
      <Background>
        <TravelItineraryProvider>
          <Grid container>
            <Grid item xs={6}>
              <Button
                onClick={clearChat}
                variant="contained"
                color="primary"
                style={{marginBottom: "10px"}}
              >
                Clear
              </Button>
              <ChatBox></ChatBox>
            </Grid>
            <Grid item xs={6} style={{height: "100vh", overflowY: "auto"}}>
              <ItineraryTimeLine />
              <div style={{position: "fixed", bottom: "20px", right: "50px"}}>
                <AddNewLocationFAB></AddNewLocationFAB>
              </div>
            </Grid>
          </Grid>
        </TravelItineraryProvider>
      </Background>
    </div>
  );
}
