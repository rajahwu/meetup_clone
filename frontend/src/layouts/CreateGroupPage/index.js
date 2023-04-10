import { useState } from "react";

import CreateGroupCSS from "./CreateGroupPage.module.css";

export default function CreateGroupPage() {
  const [location, setLocation] = useState("");
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("");
  const [groupStatus, setGroupStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault()
      const [city, state] = location.split('.')
      const formData = {
         city,
         state,
         groupName,
         description,
         groupType,
         groupStatus,
         imageUrl
      }
      console.log(formData)
  }

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
            id="groupName"
            placeholder="What is your group name?"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
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
              id="groupStatusType"
              value={groupStatus}
              onChange={(e) => setGroupStatus(e.target.value)}
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
