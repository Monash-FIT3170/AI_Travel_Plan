import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { EventCardView } from './EventCardView';
import "./ItineraryTimeLine.css";

function timelineGenerator(dailyItinerary){
  // to fix date time
  // - {dailyItinerary.events[0].startTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
  return (
      <TimelineItem>
        <TimelineOppositeContent display='none'/> 
        <TimelineSeparator>
          <TimelineDot sx={{ bgcolor: 'white' }}/>
          <TimelineConnector sx={{ bgcolor: 'white' }}/>
        </TimelineSeparator>
        <TimelineContent>
          <h5>
          Day {dailyItinerary.day} {dailyItinerary.date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})} 
          </h5>
          {dailyItinerary.events.map(event=> <EventCardView event={event}/>)}
        </TimelineContent>
      </TimelineItem>)
}

export  function ItineraryTimeLine({travelItinerary}) {
  return (
    <Timeline   sx={0.2}>
      {travelItinerary.schedule.map(dailyItinerary=> timelineGenerator(dailyItinerary))}
    </Timeline>
  );
}