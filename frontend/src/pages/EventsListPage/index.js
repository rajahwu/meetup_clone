import { useHistory } from "react-router-dom";
import { CardImage, GroupEventCard } from "../../components";
import {Link} from "react-router-dom"
import { useGetAll } from "../../hooks";

export default function EventsListPage() {
  const events = useGetAll("events").allEvents;
  const history = useHistory();
  return (
    <div>
      {Object.values(events).map((event) => {
        return (
          <div
            key={event.id}
            onClick={() => history.push(`/events/${event.id}`)}
          >
            <GroupEventCard
              startDate={event.startDate}
              name={event.name}
              description={event.about}
              city={event.Venue ? event.Venue.city : "Online"}
              state={event.Venue ? event.Venue.state : <Link to={`/events/${event.id}`}>Location</Link>}
              type={event.type}
            >
              <CardImage imageWidth={100} imageHeight={100} />
            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
