import {createContext, useContext, useReducer} from "react";
import dayjs from "dayjs";

const key = "travelItinerary";
const storedValue = localStorage.getItem(key);
const initialState = storedValue
  ? JSON.parse(storedValue)
  : {startDate: null, endDate: null, country: null, schedule: []};
const TravelItineraryContext = createContext(initialState);
const TravelItineraryDispatchContext = createContext();

export function TravelItineraryProvider({children}) {
  const [itinerary, dispatch] = useReducer(reducer, initialState);

  return (
    <TravelItineraryContext.Provider value={itinerary}>
      <TravelItineraryDispatchContext.Provider value={dispatch}>
        {children}
      </TravelItineraryDispatchContext.Provider>
    </TravelItineraryContext.Provider>
  );
}

export function useTravelItinerary() {
  return useContext(TravelItineraryContext);
}

export function useTravelItineraryDispatch() {
  return useContext(TravelItineraryDispatchContext);
}

function reducer(state, action) {
  localStorage.setItem(key, JSON.stringify(state));
  console.log(action);
  switch (action.type) {
    case "updateTravelItinerary":
      return action.payload.schedule
        ? sortEvents(action.payload)
        : action.payload;
    case "insertNewEvent":
      console.log(action.payload.activities[0]);
      console.log(state);
      if (state.schedule) {
        return insertEvent(action.payload.activities[0], state);
      } else {
        return {...state, schedule: [action.payload]};
      }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// NOTE: Reconstructing because the timezone in the mock data is not the same as the timezone in the browser.
// TODO: When prompting gpt, provide user's timezone such that GPT returns event times in the user's timezone.
const sortEvents = (itinerary) => {
  // Flatten all events
  const allEvents = itinerary.schedule.flatMap(
    (dailyItinerary) => dailyItinerary.activities
  );

  // Sort all events by startTime
  allEvents.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

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
    ([date, activities], index) => ({
      day: index + 1,
      date: new Date(date),
      activities,
    })
  );

  // Return a new itinerary object
  return {...itinerary, schedule: newSchedule};
};

function insertEvent(newEvent, itinerary) {
  //insert into schedule if there is same event

  const allEvents = itinerary.schedule.flatMap((day) => {
    return day.activities.map((e) => (e.name === newEvent.name ? newEvent : e));
  });
  console.log(allEvents);
  return sortEvents({...itinerary, schedule: allEvents});
}
