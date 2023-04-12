import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [visibilityType, setVisibilityType] = useState("");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const group = useSelector((state) => state.groups.currentGroup);

  return (
    <div>
      <h3>Create an event for {group.name}</h3>
      <form>
        <label htmlFor="name">What is the name of your event</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <hr />
        <label htmlFor="event-type">
          Is this in person or online
          <select
            name="event-type"
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">(select one)</option>
            <option value="online" defaultValue={eventType === "online"}>
              Online
            </option>
            <option value="in person" defaultValue={eventType === "in person"}>
              In persion
            </option>
          </select>
        </label>

        <label htmlFor="event-visibility-type">
          Is this event private or public
          <select
            name="event-visibility-type"
            id="eventVisibilityType"
            value={visibilityType}
            onChange={(e) => setVisibilityType(e.target.value)}
          >
            <option value="">(Select one)</option>
            <option value="private" defaultValue={visibilityType === "private"}>
              Private
            </option>
            <option value="public" defaultValue={visibilityType === "public"}>
              Public
            </option>
          </select>
        </label>

        <label htmlFor="price">
          <input
            type="text"
            value={`$ ${price}`}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <hr />
        <label htmlFor="start-date">
          When does your event start
          <input
            name="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label htmlFor="end-date">
          When does your event end
          <input
            name="start-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <hr />
        <label htmlFor="imageUrl">
          Please add in image url for your event
          <input
            type="text"
            placeholder="imageURL"
            value={imageUrl}
            onChange={(e) => e.target.value}
          />
        </label>
        <hr />

        <label htmlFor="description">
          Please describe your event
          <textarea
            placeholder="Please include at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
