import Background from "../components/Background"
import BackgroundImage from "../components/BackgroundImage"
import Chatbox from "../components/Chatbox";
import { EventCardView } from "../components/EventCardView"
import { ItineraryTimeLine } from "../components/ItineraryTimeLine"
import Grid from '@mui/material/Grid';
import { mockTravel_Itinerary1 } from "../MockItinerary";
import { useLocalStorage } from "../components/LocalStorageGeneric";

export function ItineraryRight(){

    // For testing purpose, to add data into local storage beforehand
    // updateValueInLocalStorage(mockTravel_Itinerary1);
    
    // To retrieve data from local storage
    const [event, setEvent, updateValueInLocalStorage] = useLocalStorage("travelItinerary", "");
   
    // console.log(event);

    // Assign the retrieved data to the travelItinerary variable
    const travelItinerary = event; 
 
    return (
        <div>
            <BackgroundImage/>
            <Background>
            <Grid container>
                  <Grid item xs={6}>
                Follow figma for the components here
                </Grid>
                <Grid item xs={6} style={{ height: '100vh', overflowY: 'auto' }}>
    <ItineraryTimeLine travelItinerary={travelItinerary}/>
                </Grid>
        
            </Grid>
            
            </Background>
        </div>

    )
}