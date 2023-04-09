import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../store/events";
import { CardImage, GroupEventCard } from "../../components";

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
            <GroupEventCard
              name={event.name}
              description={event.about}
              city={event.city}
              state={event.state}
              type={event.type}
            >
              <CardImage />
            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
