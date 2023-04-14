import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CardImage from "../CardImage";
import GroupEventCard from "../GroupEventCard";
import { getGroupEvents } from "../../store/events";
import { checkForImage } from "../../utils/checkForImage";
import GroupEventCardCSS from "./GroupDetailCard.module.css";

export default function GroupDetailCard({ group, children, styleSheet }) {
const css = GroupEventCardCSS

  const dispatch = useDispatch();
  const history = useHistory();
  const events = useSelector((state) => state.events.currentGroupEvents);

  const groupImages = group.GroupImages || [];
  const defaultImages = ["../../../assets/no-image.jpg"];

  useEffect(() => {
    if (group.id) dispatch(getGroupEvents(group.id));
  }, [dispatch, group.id]);

  return (
    <>
      <NavLink to="/groups">Groups</NavLink>
      <div className={styleSheet.card}>
        <CardImage
          imageWidth="300px"
          imageHeight="250px"
          imageUrl={checkForImage(groupImages, defaultImages)}
        />
        <div>
          <h2>{group.name}</h2>
          <p>
            {group.city}, {group.state}
          </p>
          <div style={{ display: "flex" }}>
            <p>
              {Object.values(events).length} event
              {Object.values(events).length === 1 ? "" : "s"}
            </p>
            <p>&#183;</p>
            <p>{group.private ? "Private" : "Public"}</p>
          </div>
          <p>
            Organized by {group.Organizer?.firstName}{" "}
            {group.Organizer?.lastName}
          </p>
          {children}
        </div>
      </div>
      <div>
        <h2>What we're about</h2>
        <p>{group.about}</p>
      </div>
      {Object.values(events).length > 0 &&
        Object.values(events).map((event) => (
          <div
            key={event.id}
            onClick={() => history.push(`/events/${event.id}`)}
          >
          {console.log("Group details card event:", event)}
            <GroupEventCard
              key={event.id}
              name={event.name}
              description="Not in data"
              city={event.Venue.city}
              state={event.Venue.state}
              type={event.type}
              startDate={event.startDate}
            >
              <CardImage 
              imageWidth={100}
              imageHeight={100}
               />
            </GroupEventCard>
          </div>
        ))}
    </>
  );
}
