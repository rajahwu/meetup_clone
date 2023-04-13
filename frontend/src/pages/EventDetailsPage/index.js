import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { EventActionButtons, EventDetailCard } from "../../components";
import * as eventAction from "../../store/events";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.currentEvent);
  console.log("Event details state event", )

  useEffect(() => {
    dispatch(eventAction.getEvent(eventId));
  }, [dispatch, eventId]);

  console.log("Event details", event);
  return (
    <div>
      <EventDetailCard event={event}> 
      <EventActionButtons eventId={eventId} />
      </EventDetailCard>
    </div>
  );
}
