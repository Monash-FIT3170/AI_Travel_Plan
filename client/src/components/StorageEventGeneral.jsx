import { useLocalStorage } from "./LocalStorageGeneric";
import { mockEvent1 } from "./MockData";

export const MyForm1 = () => {
    
  const [event, setEvent] = useLocalStorage("event", mockEvent1);

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
      startTime: new Date(event.startTime).toISOString().slice(0,16),
      endTime: new Date(event.endTime).toISOString().slice(0,16),
    };
    console.log("event after formatting:", eventToStore);
    setEvent(eventToStore)
  };
  

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

