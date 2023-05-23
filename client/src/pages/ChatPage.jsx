import ChatBox from "../components/chatbox/ChatBox";
import Background from "../components/Background";
import BackgroundImage2 from "../components/BackgroundImage2";
import Grid from "@mui/material/Grid";
import { ItineraryTimeLine } from "../components/ItineraryTimeLine";
import { useLocalStorage } from "../components/LocalStorageGeneric";

export function ChatPage() {
const [travelItinerary, setItinerary, updateTravelItineraryInLocalStorage] = useLocalStorage("travelItinerary", {startDate:null, endDate:null, schedule:[]});

  return (
    <>
      <BackgroundImage2 />
      <Background>
        <Grid container>
          <Grid item xs={6}>
            <ChatBox travelItinerary={travelItinerary} setItinerary = {setItinerary}  updateTravelItineraryInLocalStorage={updateTravelItineraryInLocalStorage}></ChatBox>
          </Grid>
          <Grid item xs={6} style={{ height: "93vh", overflowY: "auto" }}>
            <ItineraryTimeLine travelItinerary={travelItinerary} />
          </Grid>
        </Grid>
      </Background>
    </>
  );
}