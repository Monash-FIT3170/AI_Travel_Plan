import ChatBox from "../components/chatbox/ChatBox";
import Background from "../components/Background";
import BackgroundImage2 from "../components/BackgroundImage2";
import Grid from "@mui/material/Grid";
import { ItineraryTimeLine } from "../components/ItineraryTimeLine";
import { mockTravel_Itinerary1 } from "../MockItinerary";

export function ChatPage() {
  return (
    <>
      <BackgroundImage2 />
      <Background>
        <Grid container>
          <Grid item xs={6}>
            <ChatBox></ChatBox>
          </Grid>
          <Grid item xs={6} style={{ height: "93vh", overflowY: "auto" }}>
            <ItineraryTimeLine travelItinerary={mockTravel_Itinerary1} />
          </Grid>
        </Grid>
      </Background>
    </>
  );
}
