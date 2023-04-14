import { useHistory } from "react-router-dom";
import { CardImage, GroupEventCard } from "../../components";
import { useGetAll } from "../../hooks";

export default function EventsListPage() {
  const events = useGetAll("events").allEvents;
  const history = useHistory()
  return (
    <div>
      {Object.values(events).map((event) => {
        return (
          <div key={event.id} onClick={() => history.push(`/events/${event.id}`) }>
            <GroupEventCard
              name={event.name}
              description={event.about}
              city={event.Venue?.city}
              state={event.Venue?.state}
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
