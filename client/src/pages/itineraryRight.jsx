import Background from "../components/Background";
import BackgroundImage from "../components/BackgroundImage";
import Chatbox from "../components/Chatbox";
import { EventCardView } from "../components/EventCardView";
import { ItineraryTimeLine } from "../components/ItineraryTimeLine";
import Grid from "@mui/material/Grid";
import { mockTravel_Itinerary1 } from "../MockItinerary";
import { useLocalStorage } from "../components/LocalStorageGeneric";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import React, { useEffect } from "react";
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export function ItineraryRight() {
  const [itinerary, setItinerary] = useLocalStorage(
    "dailyItinerary",
    mockTravel_Itinerary1,
  );

  // NOTE: Reconstructing because the timezone in the mock data is not the same as the timezone in the browser.
  // TODO: When prompting gpt, provide user's timezone such that GPT returns event times in the user's timezone.
  const reformItinerary = (itinerary) => {
    // Flatten all events
    const allEvents = itinerary.schedule.flatMap(
      (dailyItinerary) => dailyItinerary.events,
    );

    // Sort all events by startTime
    allEvents.sort((a, b) => a.startTime - b.startTime);

    // Create a map of dates to events
    const dateToEventsMap = allEvents.reduce((map, event) => {
      const eventDate = dayjs(event.startTime).format("YYYY-MM-DD");
      if (!map[eventDate]) {
        map[eventDate] = [];
      }
      map[eventDate].push(event);
      return map;
    }, {});

    // Reconstruct the schedule array
    const newSchedule = Object.entries(dateToEventsMap).map(
      ([date, events], index) => ({
        day: index + 1,
        date: new Date(date),
        events,
      }),
    );

    // Return a new itinerary object
    return { ...itinerary, schedule: newSchedule };
  };

  // Currently being used to change the time in the mock data to the user's timezone.
  // NOTE: Not good practice to directly alter the state of itinerary.
  useEffect(() => {
    const format = "YYYY-MM-DDTHH:mm:ss.SSSZ";

    if (itinerary.schedule.length > 0) {
      const newItinerary = reformItinerary(itinerary);

      newItinerary.schedule.forEach((dailyItinerary) => {
        dailyItinerary.date = dayjs(dailyItinerary.date).format(format);
        dailyItinerary.events.forEach((event) => {
          event.startTime = dayjs(event.startTime).format(format);
          event.endTime = dayjs(event.endTime).format(format);
        });
      });

      setItinerary(newItinerary);
    }
  }, []);

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

