import ChatBox from '../components/chatbox/ChatBox';
import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Grid from '@mui/material/Grid';
import { ItineraryTimeLine } from "../components/ItineraryTimeLine"
import { mockTravel_Itinerary1 } from "../MockItinerary";

export function ChatPage() {
  return (
    <>
      <BackgroundImage />
      <Background>
      <Grid container>
                  <Grid item xs={6}>
                  <ChatBox></ChatBox>
                </Grid>
                <Grid item xs={6} style={{ height: '100vh', overflowY: 'auto' }}>
    <ItineraryTimeLine travelItinerary={mockTravel_Itinerary1}/>
                </Grid>
        
            </Grid>
        
      </Background>
    </>
  );
}
