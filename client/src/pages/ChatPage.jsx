import ChatBox from "../components/chatbox/ChatBox";
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Grid from "@mui/material/Grid";
import { ItineraryTimeLine } from "../components/ItineraryTimeLine";
import { useLocalStorage } from "../components/LocalStorageGeneric";

export function ChatPage() {
const [travelItinerary, setItinerary, updateValueInLocalStorage] = useLocalStorage("travelItinerary", {startDate:null, endDate:null, schedule:[]});

  return (
    <>
      <BackgroundImage />
      <Background>
        <Grid container>
          <Grid item xs={6}>
            <ChatBox travelItinerary={travelItinerary} setItinerary = {setItinerary} updateValueInLocalStorage={updateValueInLocalStorage}></ChatBox>
          </Grid>
          <Grid item xs={6} style={{ height: "93vh", overflowY: "auto" }}>
            <ItineraryTimeLine travelItinerary={travelItinerary} />
          </Grid>
        </Grid>
      </Background>
    </>
  );
}
