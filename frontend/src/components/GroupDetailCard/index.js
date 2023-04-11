import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CardImage from "../CardImage";
import GroupEventCard from "../GroupEventCard";
import { getGroupEvents } from "../../store/events";

export default function GroupDetailCard({ group, children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const events = useSelector((state) => state.events.currentGroupEvents);

  useEffect(() => {
    if (group.id) dispatch(getGroupEvents(group.id));
  }, [dispatch, group.id]);

  return (
    <>
      <NavLink to="/groups">Groups</NavLink>
      <div style={{ display: "flex" }}>
        <CardImage imageWidth="300px" imageHeight="250px" />
        <div>
          <h2>{group.name}</h2>
          <p>
            {group.city}, {group.state}
          </p>
          <div>
            <p>## events</p>
            <p>{group.private ? "Private" : "Public"}</p>
          </div>
          <p>
            Organized by {group.Organizer?.firstName} {group.Orginzer?.lastName}
          </p>
          {children}
        </div>
      </div>
      <div>
        <h2>What we're about</h2>
        <p>{group.about}</p>
      </div>
      {console.dir(events)}
      {Object.values(events).length > 0 &&
        Object.values(events).map((event) => (
          <div onClick={() => history.push(`/events/${event.id}`)}>
            <GroupEventCard
              key={event.id}
              name={event.name}
              description="Not in data"
              city={event.city}
              state={event.state}
              type={event.type}
            >
              <CardImage />
            </GroupEventCard>
          </div>
        ))}
    </>
  );
}
