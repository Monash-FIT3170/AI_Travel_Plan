import Background from "../components/Background"
import BackgroundImage2 from "../components/BackgroundImage2"
import Chatbox from "../components/Chatbox";
import { EventCardView } from "../components/EventCardView"
import { ItineraryTimeLine } from "../components/ItineraryTimeLine"
import Grid from '@mui/material/Grid';
import { mockTravel_Itinerary1 } from "../MockItinerary";

export function ItineraryRight(){
    return (
        <div>
            <BackgroundImage2/>
            <Background>
            <Grid container>
                  <Grid item xs={6}>
                Follow figma for the components here
                </Grid>
                <Grid item xs={6} style={{ height: '100vh', overflowY: 'auto' }}>
    <ItineraryTimeLine travelItinerary={mockTravel_Itinerary1}/>
                </Grid>
        
            </Grid>
            
            </Background>
        </div>

    )
}