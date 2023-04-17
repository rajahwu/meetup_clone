import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { CardImage } from "../../components";
import { checkForImage, parseDate } from "../../utils";
// import { defaultImages } from "../../utils";
import EventDetailCardCSS from "./EventDetailCard.module.css";
import { getGroup } from "../../store/groups";
const defaultImages = [
  "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
];

export default function EventDetailCard({ event, children }) {
  const dispatch = useDispatch();
  const css = EventDetailCardCSS;
  const group = useSelector((state) => state.groups.currentGroup);

  useEffect(() => {
    dispatch(getGroup(event.groupId));
  }, [dispatch, event.groupId]);

  if (!event.id) return null;
  return (
    <>
      <NavLink to="/events">Events</NavLink>
      <div className={css["container"]}>
        <div>
          <div className="title-div">
            <h2>{event.name}</h2>
            <div style={{ display: "flex" }}>
              <p style={{ marginRight: "5px" }}>Hosted By</p>
              <p>
                {group.Organizer?.firstName} {group.Organizer?.lastName}
              </p>
            </div>
            <br />
          </div>

          <div className={css["main-container"]}>
            <div className={css["image-container"]}>
              <CardImage
                imageHeight="250px"
                imageWidth="400px"
                imageUrl={checkForImage([event.previwImage], defaultImages)}
              />
            </div>

            <div className={css["content-container"]}>
              <Link to={`/groups/${event.Group?.id}`}>
                <div className={css["group-container"]}>
                  <div className={css["group-image-container"]}>
                    <CardImage
                      imageWidth="50px"
                      imageHeight="50px"
                      imageUrl={checkForImage(
                        [group?.GroupImages],
                        defaultImages
                      )}
                    />
                  </div>
                  <div className={css["group-content-container"]}>
                    <p> {event.Group?.name}</p>
                    <p>{event.Group?.private ? "Private" : "Public"}</p>
                  </div>
                </div>
              </Link>

              <div className={css["event-details-container"]}>
                <div>
                  <p>START {parseDate(event.startDate)}</p>
                  <p>END {parseDate(event.endDate)}</p>
                </div>
                <p>{event.price}</p>
                <p>{event.type}</p>
              </div>
            </div>
          </div>

          <div>
            <h3>Details</h3>
            <p>{event.description}</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
