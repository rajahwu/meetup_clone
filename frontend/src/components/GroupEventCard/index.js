import { useSelector } from "react-redux";

const GroupEventCard = ({ name, description, city, state, groupId, visibility, children }) => {
  const events = useSelector(state => state.events.allEvents)
  const numEvents = Object.values(events).filter((event) => event.id === groupId ).length

  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      {children}
      <div>
        <h2>{name}</h2>
        <p>
          {city}, {state}
        </p>
        <p>{description}</p>
        <div style={{ display: "flex" }}>
          <p>{numEvents} events</p>
          <p>&#183;</p>
          <p>{visibility}</p>
        </div>
      </div>
    </div>
  );
};

export default GroupEventCard;
