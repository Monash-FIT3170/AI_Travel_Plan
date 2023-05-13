import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { EventCardView } from './EventCardView';

function timelineGenerator(dailyItinerary){
  return (
      <TimelineItem>
        <TimelineOppositeContent display='none'/> 
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          Day {dailyItinerary.day} {dailyItinerary.date.toString()}
          {dailyItinerary.events.map(event=> <EventCardView event={event}/>)}

        </TimelineContent>
      </TimelineItem>)
}

export  function ItineraryTimeLine({travelItinerary}) {
  // console.log(travelItinerary.schedule[0])
  return (
    <Timeline   sx={0.2}>
      {travelItinerary.schedule.map(dailyItinerary=> timelineGenerator(dailyItinerary))}
    </Timeline>
  );
}