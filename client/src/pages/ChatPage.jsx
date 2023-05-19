import ChatBox1 from "../components/chatbox/ChatBox1";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Grid from "@mui/material/Grid";
import { ItineraryTimeLine } from "../components/ItineraryTimeLine";
import { useLocalStorage } from "../components/LocalStorageGeneric";

export function ChatPage() {
const [travelItinerary, setItinerary, updateTravelItineraryInLocalStorage] = useLocalStorage("travelItinerary", {startDate:null, endDate:null, schedule:[]});

  return (
    <>
      <BackgroundImage />
      <Background>
        <Grid container>
          <Grid item xs={6}>
            <ChatBox1 travelItinerary={travelItinerary} setItinerary = {setItinerary}  updateTravelItineraryInLocalStorage={updateTravelItineraryInLocalStorage}></ChatBox1>
          </Grid>
          <Grid item xs={6} style={{ height: "93vh", overflowY: "auto" }}>
            <ItineraryTimeLine travelItinerary={travelItinerary} />
          </Grid>
        </Grid>
      </Background>
    </>
  );
}
