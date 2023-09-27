import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { CardImage, GroupEventCard } from "../../components";
import { Link } from "react-router-dom";
import { useGetAll } from "../../hooks";

import { checkForImage } from "../../utils/checkForImage";
import { defaultImages } from "../../utils/defaultImages";

export default function EventsListPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const events = useGetAll("events").allEvents;
  const allCurrentEvents = useSelector(state => state.events.allCurrentEvents)
  const history = useHistory();
  return (
    <div>
      {Object.values(events).map((event) => {
        return (
          <div
            className="card card-side bg-base-100 shadow-xl my-5"
            key={event.id}
            onClick={() => sessionUser && history.push(`/events/${event.id}`)}
          >
          <figure>
              <CardImage
                imageWidth={200}
                imageHeight={200}
                imageUrl={checkForImage([event.previewImgage], defaultImages.events)}
              />
          </figure>
            <GroupEventCard
              startDate={event.startDate}
              name={event.name}
              description={allCurrentEvents[event.id]?.description}
              city={event.Venue ? event.Venue.city : "Online"}
              state={
                event.Venue ? (
                  event.Venue.state
                ) : (
                  <Link to={`/events/${event.id}`}>Location</Link>
                )
              }
              type={event.type}
            >
            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
