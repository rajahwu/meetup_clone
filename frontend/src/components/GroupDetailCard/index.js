import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CardImage from "../CardImage";
import GroupEventCard from "../GroupEventCard";
import { getGroupEvents } from "../../store/events";
import { checkForImage } from "../../utils/checkForImage";
import { defaultImages } from "../../utils/defaultImages";
import { sortDate } from "../../utils";

export default function GroupDetailCard({ group, children }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const events = useSelector((state) => state.events.currentGroupEvents);
  const allCurrentEvents = useSelector(
    (state) => state.events.allCurrentEvents
  );
  const eventList = Object.values(events);
  sortDate(eventList, "startDate");

  const groupImages = useMemo(
    () => group.GroupImages || [],
    [group.GroupImages]
  );
  const [imageUrl, setImageUrl] = useState(
    checkForImage(groupImages, defaultImages.groups)
  );

  useEffect(() => {
    if (group.id) dispatch(getGroupEvents(group.id));
  }, [dispatch, group.id]);

  useEffect(() => {
    setImageUrl(checkForImage(groupImages, defaultImages.groups));
  }, [imageUrl, groupImages]);

  return (
    <>
      <div className="">
        <NavLink className="" to="/groups">
          Groups
        </NavLink>
        <div className="">
          <CardImage
            imageWidth="300px"
            imageHeight="250px"
            imageUrl={imageUrl}
          />
          <div className="">
            <h2 className="">{group.name}</h2>
            <p className="">
              {group.city}, {group.state}
            </p>
            <div style={{ display: "flex" }}>
              <p className="">
                {eventList.length} event
                {eventList.length === 1 ? "" : "s"}
              </p>
              <p className="">&#183;</p>
              <p>{group.private ? "Private" : "Public"}</p>
            </div>
            <p className="">
              Organized by {group.Organizer?.firstName}{" "}
              {group.Organizer?.lastName}
            </p>
            {children}
          </div>
        </div>
        <div>
          <h2>Organizer</h2>
          <p>
            {group.Organizer?.firstName} {group.Organizer?.lastName}
          </p>
          <h2>What we're about</h2>
          <p>{group.about}</p>
        </div>
      </div>

      <div className="">
      <h2 style={{fontSize: "1.3rem", margin: "10px 0"}}>Events ({eventList.length})</h2>
        {eventList.length > 0 &&
          eventList.map((event) => (
            <div
              key={event.id}
              onClick={() => history.push(`/events/${event.id}`)}
            >
              <GroupEventCard
                key={event.id}
                name={event.name}
                description={allCurrentEvents[event.id]?.description}
                city={event.Venue.city}
                state={event.Venue.state}
                type={event.type}
                startDate={event.startDate}
              >
                <CardImage
                  imageWidth={100}
                  imageHeight={100}
                  imageUrl={checkForImage(
                    event.previewImage,
                    defaultImages.events
                  )}
                />
              </GroupEventCard>
            </div>
          ))}
      </div>
    </>
  );
}
