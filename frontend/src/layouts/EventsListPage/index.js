import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../store/events";
import { CardImage } from "../../components";

const EventCard = ({ name, description, city, state, type }) => (
  <div style={{ display: "flex" }}>
    <CardImage />
    <div>
      <h2>{name}</h2>
      <p>
        {city}, {state}
      </p>
      <p>{description}</p>
      <div style={{ display: "flex" }}>
        <p>## events</p>
        <p>&#183;</p>
        <p>public or privite, {type}</p>
      </div>
    </div>
  </div>
);

export default function EventsListPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state?.events);
  console.log(events["1"]);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div>
      {Object.values(events).map((event) => {
        return (
          <div key={event.id}>
            <EventCard
              name={event.name}
              description={event.about}
              city={event.city}
              state={event.state}
              type={event.type}
            />
            <hr />
          </div>
        );
      })}
    </div>
  );
}
