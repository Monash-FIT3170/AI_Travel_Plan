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

function timelineGenerator(dailyItinerary){
  const formattedMonth = new Date(dailyItinerary.date).toLocaleString("default", { month: "long" });
  const formattedDate = new Date(dailyItinerary.date).getUTCDate();
  const formattedYear = new Date(dailyItinerary.date).getUTCFullYear();
  const formattedStartTime = formatTimeToAMPM(new Date(dailyItinerary.events[0].startTime));

  return (
      <TimelineItem>
        <TimelineOppositeContent display='none'/> 
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: 'white' }}/>
          <TimelineConnector sx={{ bgcolor: 'white' }}/>
        </TimelineSeparator>
        <TimelineContent>
          <h5>
          Day {dailyItinerary.day} {formattedMonth} {formattedDate}, {formattedYear} - {formattedStartTime}
          </h5>
          {dailyItinerary.events.map(event=> <EventCardView event={event}/>)}
        </TimelineContent>
      </TimelineItem>)
}

export  function ItineraryTimeLine({travelItinerary}) {

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
        {dailyItinerary.events.map((event) => (
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

// Function to format time into AM or PM based on Given DateTime object
function formatTimeToAMPM(time) {
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}${ampm}`;
}
