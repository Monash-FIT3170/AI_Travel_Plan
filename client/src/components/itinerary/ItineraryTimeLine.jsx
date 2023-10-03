import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {EventCardView} from "./EventCardView";
import {useTravelItinerary} from "../../TravelItineraryContext";
import dayjs from "dayjs";
import "./ItineraryTimeLine.css";

function timelineGenerator(dailyItinerary) {
  const formattedMonth = new Date(dailyItinerary.date).toLocaleString(
    "default",
    {month: "long"}
  );
  const formattedDate = new Date(dailyItinerary.date).getDate();
  const formattedYear = new Date(dailyItinerary.date).getFullYear();
  // console.log(dailyItinerary.activities[0].startTime);
  const formattedStartTime = formatTimeToAMPM(
    new Date(dailyItinerary.activities[0].startTime)
  );
  return (
    <TimelineItem>
      <TimelineOppositeContent display="none" />
      <TimelineSeparator>
        <TimelineDot sx={{bgcolor: "white"}} />
        <TimelineConnector sx={{bgcolor: "white"}} />
      </TimelineSeparator>
      <TimelineContent>
        <h5>
          Day {dailyItinerary.day} {formattedMonth} {formattedDate},{" "}
          {formattedYear} - {formattedStartTime}
        </h5>
        {dailyItinerary.activities.map((event) => (
          <EventCardView
            // Using a name identifier for the key so react doesn't re-use the same component
            key={event.name}
            event={event}
          />
        ))}
      </TimelineContent>
    </TimelineItem>
  );
}

export function ItineraryTimeLine() {
  const travelItinerary = useTravelItinerary();

  return (
    <div>
      {/* Destination information display */}
      {/* <h5>
				{travelItinerary.startDate
					? "Start date :" +
					  dayjs(travelItinerary.startDate).format("YYYY-MM-DD")
					: ""}{" "}
				{travelItinerary.endDate
					? "End Date: " + dayjs(travelItinerary.endDate).format("YYYY-MM-DD")
					: ""}{" "}
				{travelItinerary.country ? "Country: " + travelItinerary.country : ""}
			</h5> */}
      {travelItinerary ? (
        <Timeline sx={0.2}>
          {travelItinerary.schedule
            ? travelItinerary.schedule.map((dailyItinerary) =>
                timelineGenerator(dailyItinerary)
              )
            : ""}
        </Timeline>
      ) : (
        ""
      )}
    </div>
  );
}

// Function to format time into AM or PM based on Given DateTime object
function formatTimeToAMPM(time) {
  const hours = time.getUTCHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}${ampm}`;
}
