import { useHistory } from "react-router-dom";
import { CardImage, GroupEventCard } from "../../components";
import {Link} from "react-router-dom"
import { useGetAll } from "../../hooks";
import { checkForImage } from "../../utils/checkForImage";
const defaultImages = ["https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"]

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
              <CardImage imageWidth={100} imageHeight={100} imageUrl={checkForImage(event, defaultImages)}/>
            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
