import { useLocalStorage } from "./LocalStorageGeneric";
import { mockEvent1 } from "./MockData";

export const MyForm1 = () => {
    
  const [event, setEvent, updateValueInLocalStorage] = useLocalStorage("event", mockEvent1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("event before formatting:", event);
    const eventToStore = {
      ...event,
      startTime: new Date(event.startTime.includes("Z") ? event.startTime : event.startTime + "Z").toISOString(),
      endTime: new Date(event.endTime.includes("Z") ? event.endTime : event.endTime + "Z").toISOString(),
    };
    console.log("event after formatting:", eventToStore);
    // setEvent(eventToStore);
    // setEventFormData(eventToStore);
    updateValueInLocalStorage(eventToStore);
  };

  // const formattedStartTime = event.startTime.includes("Z") ? event.startTime : event.startTime + "Z";
  // const formattedEndTime = event.endTime.includes("Z") ? event.endTime : event.endTime + "Z";
  // const formattedStartTime = new Date(event.startTime).toLocaleString();
  // const formattedEndTime = new Date(event.endTime).toLocaleString();
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter destination name:
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Enter address:
        <input
          type="text"
          name="address"
          value={event.address}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Enter description:
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Enter start time:
        <input
          type="datetime-local"
          name="startTime"
          // value={event.startTime ? new Date(event.startTime+"Z").toISOString().slice(0, -8) : ''}
          value={event.startTime}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Enter end time:
        <input
          type="datetime-local"
          name="endTime"
          // value={event.endTime ? new Date(event.endTime+"Z").toISOString().slice(0,-8) : ''}
          value={event.endTime}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Enter cost:
        <input
          type="number"
          name="cost"
          value={event.cost}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Enter chat response:
        <input
          type="text"
          name="chatResponse"
          value={event.chatResponse}
          onChange={handleChange}
        />
      </label>
      <button type="submit">SUBMIT</button>
    </form>
  );

};

