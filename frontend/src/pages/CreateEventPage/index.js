import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getGroup } from "../../store/groups";
import * as eventActions from "../../store/events";
import CreateEventPageCSS from "./CreateEventPageCSS.module.css";

export default function CreateEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const currentDate = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [visibilityType, setVisibilityType] = useState("");
  const [price, setPrice] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const { groupId } = useParams();

  useEffect(() => {
    dispatch(getGroup(groupId));
  }, [dispatch, groupId]);

  const group = useSelector((state) => state.groups.currentGroup);

  const validateForm = (formData) => {
    const errors = {};

    const {
      name,
      type,
      visibilityType,
      price,
      description,
      startDate,
      endDate,
      imageUrl,
    } = formData;

    if (!name["length"]) errors.name = "name is required";
    if (!type) errors["type"] = "Event Type is required";
    if (!visibilityType) errors["visibilityType"] = "Visibility is requried";
    if (!String(price).length) errors["price"] = "Price is requried";
    if (!startDate) errors["startDate"] = "Event start is required";
    if (!endDate) errors["endDate"] = "Event end is required";
    if (description.length < 30)
      errors["description"] = "Description must be at least 30 characters long";
    if (imageUrl) {
      if (
        !imageUrl?.split(".").includes("unsplash") &&
        !["png", "jpg", "jpeg"].includes(
          imageUrl?.split(".")[imageUrl.split(".").length - 1].trim()
        )
      )
        errors.imageUrl = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setErrors(errors);
    return Object.values(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const formData = {
      venueId: group.Venues[0].id,
      name,
      type: eventType,
      visibilityType,
      price: +price,
      description,
      startDate,
      endDate,
      capacity: [10, 20, 30, 40, 50][Math.floor(Math.random() * 5)],
      imageUrl,
    };

    if (!validateForm(formData)) return;
    formData.groupId = groupId;
    return dispatch(eventActions.createEventThunk(formData))
      .then(async (res) => history.push(`/events/${String(res.id)}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const css = CreateEventPageCSS;

  return (
    <div className={css["container"]}>
      <h3 className={css["title"]}>Create an event for {group.name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <p className={css["label-text"]}>What is the name of your event</p>
          <input
            className={css["input"]}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p>{errors.name}</p>}
        </label>
        <hr />
        <label htmlFor="event-type">
          <p className={css["label-text"]}>Is this in person or online</p>

          <select
            name="event-type"
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">(select one)</option>
            <option value="Online" defaultValue={eventType === "online"}>
              Online
            </option>
            <option value="In person" defaultValue={eventType === "in person"}>
              In persion
            </option>
          </select>
          {errors.type && <p>{errors.type}</p>}
        </label>

        <label htmlFor="event-visibility-type">
          <p className={css["label-text"]}>Is this event private or public</p>
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
          {errors.visibilityType && <p>{errors.visibilityType}</p>}
        </label>

        <label htmlFor="price">
          <p className={css["label-text"]}>What is the price for your event?</p>
          <input
            className={css["input"]}
            type="number"
            placeholder="$"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <p>{errors.price}</p>}
        </label>
        <hr />
        <label htmlFor="start-date">
          <p className={css["label-text"]}>When does your event start</p>
          <input
            className={css["input"]}
            name="start-date"
            type="date"
            placeholder="MM/DD/YYYY HH:mm:AM"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {errors.startDate && <p>{errors.startDate}</p>}
        </label>

        <label htmlFor="end-date">
          <p className={css["label-text"]}>When does your event end</p>
          <input
            className={css["input"]}
            name="start-date"
            type="date"
            placeholder="MM/DD/YYYY HH:mm:AM"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {errors.endDate && <p>{errors.endDate}</p>}
        </label>
        <hr />
        <label htmlFor="imageUrl">
          Please add in image url for your event
          <input
            className={css["input"]}
            type="text"
            placeholder="imageURL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {errors.imageUrl && <p>{errors.imageUrl}</p>}
        </label>
        <hr />

        <label htmlFor="description">
          Please describe your event
          <textarea
            className={css["textarea"]}
            placeholder="Please include at least 30 characters"
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <p>{errors.description}</p>}
        </label>
        <button className={css["submit-btn"]} type="submit">Create Event</button>
      </form>
    </div>
  );
}
