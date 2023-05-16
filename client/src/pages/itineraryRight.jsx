import Background from "../components/Background"
import BackgroundImage from "../components/BackgroundImage"
import Chatbox from "../components/Chatbox";
import { EventCardView } from "../components/EventCardView"
import { ItineraryTimeLine } from "../components/ItineraryTimeLine"
import Grid from '@mui/material/Grid';
import { mockTravel_Itinerary1 } from "../MockItinerary";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export function ItineraryRight() {
    return (
      <div style={{ position: 'relative' }}>
        <BackgroundImage />
        <Background>
          <Grid container>
            <Grid item xs={6}>
              Follow figma for the components here
            </Grid>
            <Grid item xs={6} style={{ height: '100vh', overflowY: 'auto' }}>
              <ItineraryTimeLine travelItinerary={mockTravel_Itinerary1} />
              <div style={{ position: 'fixed', bottom: '20px', right: '50px' }}>
                <Button variant="contained" endIcon={<AddIcon />}>
                  ADD NEW LOCATION
                </Button>
              </div>
            </Grid>
          </Grid>
        </Background>
      </div>
    );
  }