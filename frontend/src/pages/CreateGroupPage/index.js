import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";


export default function CreateGroupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId } = useParams();

  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [groupType, setGroupType] = useState("");
  const [visibilityType, setVisibilityType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const group = useSelector((state) => state.groups.currentGroup);
  const userId = useSelector((state) => state.session.user.id);
  useEffect(() => {
    if (!Object.values(group).length) return;
    setLocation(`${group.city}, ${group.state}`);
    setName(group.name);
    setDescription(group.about);
    setGroupType(group.type);
    setVisibilityType(group.private ? "private" : "public");
    setImageUrl(group.imageUrl || "");
  }, [group]);

  useEffect(() => {
    setLocation("");
    setName("");
    setDescription("");
    setGroupType("");
    setGroupType("");
    setVisibilityType("");
    setImageUrl("");
    if (groupId) dispatch(groupActions.getGroup(groupId));
  }, [groupId, dispatch]);

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
        !imageUrl?.split(".").includes("unsplash") &&
        !["png", "jpg", "jpeg"].includes(
          imageUrl?.split(".")[imageUrl.split(".").length - 1].trim()
        )
      )
        errors.imageUrl = "Image URL must end in .png, .jpg, or .jpeg";
    }
    setErrors(errors);
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
      isPrivate: visibilityType.toLowerCase() === "private",
      city: city,
      state: state?.trim(),
      imageUrl,
    };

    if (groupId === undefined) {
      return dispatch(groupActions.createGroupThunk(formData))
        .then(async (res) => history.push(`/groups/${res.payload.id}`))
        .catch(async (res) => {
          const data = res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }

    if (groupId) {
      formData.id = groupId;
      return dispatch(groupActions.updateGroupThunk(formData))
        .then(async (res) => history.push(`/groups/${res.payload.id}`))
        .catch(async (res) => {
          const data = res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
  };

  if (groupId) {
    if (userId !== group?.Organizer?.id) {
      console.log("Update miss match");
      return history.push("/");
    }
  }

  return (
    <div className="w-full prose prose-p:leading-normal prose-p:my-2">
      <form className=" shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div>
            <h1 className="capitalize">
              {groupId
                ? "update your group's information"
                : "become an organizer"}
            </h1>
            <p>
              We'll walk you through a few steps to build your local community
            </p>
          </div>
          <div>
            <p className="text-accent text-lg">
              First, set your group's location.
            </p>
            <p>
              Meetup groups meet locally, in person and online. We'll connect
              you with people in your area, and more can join you online.
            </p>
            <input
              className={errors.location ? "border-rose-600" : ""}
              type="text"
              name="group-location"
              id="groupLocation"
              placeholder={"City, STATE"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && (
              <p className="text-rose-600">{errors.location}</p>
            )}
          </div>
        </section>
        <section>
          <div>
            <p className="text-accent text-lg">
              What will your group's name be?
            </p>
            <p>
              Choose a name that will give people a clear idea of what the group
              is about. Feel free to get creative! You can edit this later if
              you change your mind.
            </p>
            <input
              className={errors.name ? "border-rose-600" : ""}
              type="text"
              name="group-name"
              id="name"
              placeholder="What is your group name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-rose-600">{errors.name}</p>}
          </div>
        </section>
        <p className="text-accent text-lg">
          Now describe what your group will be about
        </p>
        <p>
          People will see this when we promote your group, but you'll be able to
          add to it later, too
        </p>
        <ol>
          <li>What's the purpose of the group?</li>
          <li>Who should join?</li>
          <li>What will you do at your events?</li>
        </ol>
        <section>
          <textarea
            className={errors.description ? "border-rose-600" : ""}
            name="group-description"
            id="groupDescription"
            cols="50"
            rows="10"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <p className="text-rose-600">{errors.description}</p>
          )}
          {errors.about && <p className="text-rose-600">{errors.about}</p>}
        </section>
        <section>
          <p>Final steps...</p>
          <div>
            <label htmlFor="group-type">
              <p className="text-accent text-lg">
                Is this an in person or online group?
              </p>
              <select
                className={errors.groupType ? "border-rose-600" : ""}
                name="group-type"
                id="groupType"
                value={groupType}
                onChange={(e) => setGroupType(e.target.value)}
              >
                <option value="">(Select one)</option>
                <option
                  value="In person"
                  defaultValue={groupType === "In person"}
                >
                  In Person
                </option>
                <option value="Online" defaultValue={groupType === "Online"}>
                  Online
                </option>
              </select>
            </label>
            {errors.groupType && (
              <p className="text-rose-600">{errors.groupType}</p>
            )}
          </div>
          <div>
            <label htmlFor="group-status-type">
              <p className="text-accent text-lg">
                Is this group private or public?
              </p>
              <select
                className={errors.visibilityType ? "border-rose-600" : ""}
                name="group-visibility-type"
                id="groupVisibilityType"
                value={visibilityType}
                onChange={(e) => setVisibilityType(e.target.value)}
              >
                <option value="">(Select one)</option>
                <option
                  value="private"
                  defaultValue={visibilityType === "private"}
                >
                  Private
                </option>
                <option
                  value="public"
                  defaultValue={visibilityType === "public"}
                >
                  Public
                </option>
              </select>
            </label>
            {errors.visibilityType && (
              <p className="text-rose-600">{errors.visibilityType}</p>
            )}
          </div>
          <div>
            <p className="text-accent text-lg">
              Please add an image url for your group below:
            </p>
            <input
              className={errors.imageUrl ? "border-rose-600" : ""}
              type="text"
              name="imageUrl"
              id="imageUrl"
              placeholder="Image Url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {errors.imageUrl && (
              <p className="text-rose-600">{errors.imageUrl}</p>
            )}
          </div>
        </section>
        <button
          className="mr-5 bg-primary hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {groupId ? "Update Group" : "Create Group"}
        </button>
      </form>
    </div>
  );
}
