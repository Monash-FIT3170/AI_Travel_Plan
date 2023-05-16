import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Chatbox from "../components/Chatbox";
import { EventCardView } from "../components/EventCardView";
import { ItineraryTimeLine } from "../components/ItineraryTimeLine";
import Grid from "@mui/material/Grid";
import { mockTravel_Itinerary1 } from "../MockItinerary";
import { useLocalStorage } from "../components/LocalStorageGeneric";

export function ItineraryRight() {
  const [itinerary, setItinerary] = useLocalStorage(
    "dailyItinerary",
    mockTravel_Itinerary1,
  );

  if (itinerary) {
    itinerary.schedule.forEach((dailyItinerary) => {
      dailyItinerary.date = new Date(dailyItinerary.date);
      dailyItinerary.events.forEach((event) => {
        event.startTime = new Date(event.startTime);
        event.endTime = new Date(event.endTime);
      });
    });
  }

  return (
    <div>
      <BackgroundImage />
      <Background>
        <Grid container>
          <Grid item xs={6}>
            Follow figma for the components here
          </Grid>
          <Grid item xs={6} style={{ height: "100vh", overflowY: "auto" }}>
            <ItineraryTimeLine
              travelItinerary={itinerary}
              setItinerary={setItinerary}
            />
          </Grid>
        </Grid>
      </Background>
    </div>
  );
}
