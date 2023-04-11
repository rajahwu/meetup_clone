import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getEvent } from "../../store/events";

export default function EventDetailsPage() {
    const {eventId} = useParams()
    const dispatch = useDispatch()
    const event = useSelector((state) => state.events.currentEvent)

    useEffect(() => {
        dispatch(getEvent(eventId))
    }, [dispatch, eventId])

    console.log("Event details", event)

}