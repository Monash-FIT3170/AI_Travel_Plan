import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { EventCardView } from "./EventCardView";
import "./ItineraryTimeLine.css";

function timelineGenerator(itinerary, dailyItinerary, setItinerary) {
  // to fix date time
  // - {dailyItinerary.events[0].startTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
  const date = new Date(dailyItinerary.date);

  return (
    <TimelineItem>
      <TimelineOppositeContent display="none" />
      <TimelineSeparator>
        <TimelineDot sx={{ bgcolor: "white" }} />
        <TimelineConnector sx={{ bgcolor: "white" }} />
      </TimelineSeparator>
      <TimelineContent>
        <h5>
          Day {dailyItinerary.day}{" "}
          {date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h5>
        {dailyItinerary.activities.map((event) => (
          <EventCardView
            // Using a name identifier for the key so react doesn't re-use the same component
            key={event.name}
            event={event}
            itinerary={itinerary}
            setItinerary={setItinerary}
          />
        ))}
      </TimelineContent>
    </TimelineItem>
  );
}

export function ItineraryTimeLine({ travelItinerary, setItinerary }) {
  return (
    <Timeline sx={0.2}>
      {travelItinerary.schedule.map((dailyItinerary) =>
        timelineGenerator(travelItinerary, dailyItinerary, setItinerary),
      )}
    </Timeline>
  );
}
