import ChatBox from "../components/chatbox/ChatBox";
import Background from "../components/background/Background";
import BackgroundImage from "../components/background/BackgroundImage";
import Grid from "@mui/material/Grid";
import { ItineraryTimeLine } from "../components/itinerary/ItineraryTimeLine";
import { useLocalStorage } from "../components/LocalStorageGeneric";
import Button from "@mui/material/Button";

export function ChatPage() {
  const [travelItinerary, setItinerary, updateTravelItineraryInLocalStorage] =
    useLocalStorage("travelItinerary", {
      startDate: null,
      endDate: null,
      schedule: [],
    });

  const clearChat = () => {
      // Remove chat history from local storage
      localStorage.removeItem("chatHistory");
  }

  return (
    <>
        <BackgroundImage />
        <Background>
            <Grid container>
                <Grid item xs={6}>
                    <ChatBox
                        travelItinerary={travelItinerary}
                        setItinerary={setItinerary}
                        updateTravelItineraryInLocalStorage={updateTravelItineraryInLocalStorage}
                    ></ChatBox>
                    <Button onClick={clearChat} variant="contained" color="primary" style={{ marginTop: "10px" }}>
                        Clear
                    </Button>
                </Grid>
                <Grid item xs={6} style={{ height: "93vh", overflowY: "auto" }}>
                    <ItineraryTimeLine travelItinerary={travelItinerary} />
                </Grid>
            </Grid>
        </Background>
    </>
);
}
