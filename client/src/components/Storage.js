import { useState, useEffect } from "react";

const mockEvent = {
    name: "Melbourne",
    address: "Clayton",
    description: "Nothing",
    startTime: new Date(),
    endTime: new Date(),
    cost: 100,
    chatResponse: "something",
};

export const MyForm = () => {
    
  const [event, setEvent] = useState(() => {
    const storedEvent = localStorage.getItem("event");
    return storedEvent ? JSON.parse(storedEvent) : mockEvent;
});

useEffect(() => {
    const storedEvent = JSON.parse(localStorage.getItem("event"));
    if (storedEvent) {
      setEvent({
        ...storedEvent,
        startTime: new Date(storedEvent.startTime),
        endTime: new Date(storedEvent.endTime),
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventToStore = {
      ...event,
      startTime: event.startTime.toISOString(),
      endTime: event.endTime.toISOString(),
    };
    localStorage.setItem("event", JSON.stringify(eventToStore));
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

