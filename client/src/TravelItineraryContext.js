import {createContext, useContext, useReducer} from "react";
import dayjs from "dayjs";
import {all} from "axios";

const key = "travelItinerary";
const storedValue = localStorage.getItem(key);
console.log(storedValue);
const initialState = storedValue
  ? JSON.parse(storedValue)
  : {startDate: null, endDate: null, country: null, schedule: null};
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
  let newState;
  if (action.type == "updateTravelItinerary") {
    if (action.payload.schedule) {
      newState = sortEvents(action.payload);
    } else {
      newState = {...action.payload};
    }
  } else if (action.type == "insertNewEvent") {
    if (state.schedule) {
      newState = insertEvent(action.payload.activities[0], state);
    } else {
      newState = {...state, schedule: [action.payload]};
    }
  } else if (action.type == "clearItinerary") {
    newState = {startDate: null, endDate: null, country: null, schedule: null};
    localStorage.removeItem(key);
  } else {
    throw new Error(`Unknown action: ${action.type}`);
  }
  localStorage.setItem(key, JSON.stringify(newState));
  return newState;
}

// NOTE: Reconstructing because the timezone in the mock data is not the same as the timezone in the browser.
// TODO: When prompting gpt, provide user's timezone such that GPT returns event times in the user's timezone.
const sortEvents = (itinerary) => {
  console.log(itinerary);

  // Flatten all events
  const allEvents = itinerary.schedule
    ?.flatMap((day) => day.activities)
    .map((activity) => activity);

  const allActivitySorted = allEvents?.sort(
    (a, b) => new Date(a.startTime) - new Date(b.startTime)
  );
  console.log(allEvents);
  console.log(allActivitySorted);
  if (allActivitySorted.length === 0) return {...itinerary, schedule: null};
  const scheduleStart = [
    {
      day: 1,
      date: dayjs(allActivitySorted[0].startTime).format("YYYY-MM-DD"),
      activities: [],
    },
  ];

  const newSchedule = allEvents.reduce((acc, cur) => {
    const latestSchedule = acc[acc.length - 1];
    if (latestSchedule.date === dayjs(cur.startTime).format("YYYY-MM-DD")) {
      return [
        ...acc.slice(0, -1),
        {...latestSchedule, activities: [...latestSchedule.activities, cur]},
      ];
    } else {
      return [
        ...acc,
        {
          day: latestSchedule.day + 1,
          date: dayjs(cur.startTime).format("YYYY-MM-DD"),
          activities: [cur],
        },
      ];
    }
  }, scheduleStart);

  // Return a new itinerary object
  return {...itinerary, schedule: newSchedule};
};

function insertEvent(newEvent, itinerary) {
  const latestSchedule = itinerary.schedule[itinerary.schedule.length - 1];
  //insert into schedule if there is same event
  const updatedLatesetSchedule = latestSchedule.activities.concat(newEvent);
  console.log(updatedLatesetSchedule);
  return sortEvents({
    ...itinerary,
    schedule: [
      ...itinerary.schedule.slice(0, -1),
      {...latestSchedule, activities: updatedLatesetSchedule},
    ],
  });
}
