import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import { ItineraryTimeLine } from "../components/itinerary/ItineraryTimeLine";
import Grid from "@mui/material/Grid";
import ChatBox from "../components/chatbox/ChatBox";
import React, { useState } from "react";
import Button from "@mui/material/Button";

import {motion} from "framer-motion";
import {useLocation} from "react-router-dom";
import {useLocalStorage} from "../components/LocalStorageGeneric";
import {AddNewLocationFAB} from "../components/itinerary/AddNewLocationFAB";
import {useTravelItinerary,useTravelItineraryDispatch} from "../TravelItineraryContext";


export function ChatPage() {
  const travelItinerary = useTravelItinerary;
  const itineraryDispatch = useTravelItineraryDispatch();

  const [chatBoxKey, setChatBoxKey] = useState(1); // Add a state for key
  const locationHistory = useLocation();
  const fromHomePage = locationHistory.state?.fromHomePage;

  // clear chat history and local storage
  const [chatHistory, setChatHistory, updateChatMessageInLocalStorage] =
    useLocalStorage("chatHistory", []);
  console.log(chatHistory);
  const clearChat = () => {
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("chatHistory");
    localStorage.removeItem("travelItinerary");
    setChatHistory([]);
    localStorage.setItem(
      "chatMessages",
      JSON.stringify([
        {
          text: "Hello, I am your AI Travel Planner. How can I help you today?",
          sender: "server",
        },
      ])
    );

    // clear the text showing current dates and destination
    travelItinerary.startDate = "";
    travelItinerary.endDate = "";
    travelItinerary.country = "";
    travelItinerary.schedule = "";
    setChatBoxKey((prevKey) => prevKey + 1); // Increment the key to force remount
    itineraryDispatch({ type: 'clearItinerary' });
    
  };
  return (
    <motion.div
      initial={{ y: fromHomePage ? "100vh" : 0 }}
      animate={{ y: 0 }}
      exit={{ y: "100vh" }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ position: "relative" }}>
        <BackgroundImage />
        <Background scrollable={false}>
          <Grid container>
            <Grid item xs={6}>
              <Button
                onClick={clearChat}
                variant="contained"
                color="primary"
                style={{ marginBottom: "10px" }}
              >
                Clear
              </Button>
              <ChatBox
                key={chatBoxKey}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
              ></ChatBox>
            </Grid>
            <Grid item xs={6} style={{ height: "100vh", overflowY: "auto" }}>
              <ItineraryTimeLine />
              <div style={{ position: "fixed", bottom: "20px", right: "50px" }}>
                <AddNewLocationFAB></AddNewLocationFAB>
              </div>
            </Grid>
          </Grid>
        </Background>
      </div>
    </motion.div>
  );
}
