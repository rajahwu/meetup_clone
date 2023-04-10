import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CardImage from "../CardImage";
import GroupEventCard from "../GroupEventCard";
import { getGroupEvents } from "../../store/events";

export default function GroupDetailCard({ group, children }) {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  console.log(events);
  useEffect(() => {
    dispatch(getGroupEvents(group?.id));
  }, [dispatch]);

  if (group)
    return (
      <>
        <NavLink to="/group">Groups</NavLink>
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
              Organized by {group.Organizer?.firstName}{" "}
              {group.Orginzer?.lastName}
            </p>
            {children}
          </div>
        </div>
        <div>
          <h2>What we're about</h2>
          <p>{group.about}</p>
        </div>
        {events && Object.values(events).map(event => (
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
        ))}
      </>
    );
}
