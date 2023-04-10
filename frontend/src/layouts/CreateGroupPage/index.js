import { useState } from "react";

import CreateGroupCSS from "./CreateGroupPage.module.css";

export default function CreateGroupPage() {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("");
  const [visibilityType, setVisibilityType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!location.length) {
      errors.location = "Location is required";
    } else if (location.split(",").length !== 2) {
      errors.location = "Please enter comma seperate city and state";
    } else if (location.split(",")[1].trim().length !== 2) {
      errors.location = "Please use two letter state abbreviation";
    }

    if (!name.length) errors.name = "Name is required";

    if (description.length < 30)
      errors.description = "Description must be at least 30 characters long";

    if (!groupType) errors.groupType = "Group Type is require";

    if (!visibilityType) errors.visibilityType = "Visibility Type is required";

    if (imageUrl) {
      if (
        !["png", "jpg", "jpeg"].includes(
          imageUrl?.split(".")[imageUrl.split(".").length - 1].trim()
        )
      )
        errors.imageUrl = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setErrors(errors);
    console.log("Validate Form Errors", errors);
    return Object.values(errors).length > 0 ? false : true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;
    const [city, state] = location.split(",");

    const formData = {
      name,
      about: description,
      type: groupType,
      privite: visibilityType.toLocaleLowerCase() === "private",
      city: city,
      state: state?.trim(),
      imageUrl,
    };

    const testText = [
      "background: blue",
      "font-size: 16px",
      "color: white",
    ].join(";");

    console.log("%ccreate a group", testText, formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section>
          <input
            className={CreateGroupCSS["input"]}
            type="text"
            name="group-location"
            id="groupLocation"
            placeholder="City, STATE"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </section>
        <section>
          <input
            className={CreateGroupCSS["input"]}
            type="text"
            name="group-name"
            id="name"
            placeholder="What is your group name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>
        <section>
          <textarea
            name="group-description"
            id="groupDescription"
            cols="30"
            rows="10"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </section>
        <section>
          <label htmlFor="group-type">
            Online or In Person
            <select
              name="group-type"
              id="groupType"
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
            >
              <option value="">(Select one)</option>
              <option value="inPerson">In Person</option>
              <option value="online">Online</option>
            </select>
          </label>
          <br />
          <label htmlFor="group-status-type">
            Public or Privite
            <select
              name="group-status-type"
              id="visibilityTypeType"
              value={visibilityType}
              onChange={(e) => setVisibilityType(e.target.value)}
            >
              <option value="">(Select one)</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </label>
          <input
            className={CreateGroupCSS["input"]}
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="Image Url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </section>
        <button type="submit">Create a Group</button>
      </form>
    </div>
  );
}
