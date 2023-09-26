import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { CardImage } from "../../components";
import { checkForImage, parseDate } from "../../utils";
// import { defaultImages } from "../../utils";
import { getGroup } from "../../store/groups";
const defaultImages = [
  "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
];

export default function EventDetailCard({ event, children }) {
  const dispatch = useDispatch();
  const group = useSelector((state) => state.groups.currentGroup);

  useEffect(() => {
    dispatch(getGroup(event.groupId));
  }, [dispatch, event.groupId]);

  if (!event.id) return null;
  return (
    <>
      <NavLink to="/events">Events</NavLink>
      <div className="">
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

          <div className="">
            <div className="">
              <CardImage
                imageHeight="250px"
                imageWidth="400px"
                imageUrl={checkForImage([event.previwImage], defaultImages)}
              />
            </div>

            <div className="">
              <Link to={`/groups/${event.Group?.id}`}>
                <div className="">
                  <div className="">
                    <CardImage
                      imageWidth="150px"
                      imageHeight="150px"
                      imageUrl={checkForImage(
                        [group?.GroupImages],
                        defaultImages
                      )}
                    />
                  </div>
                  <div className="">
                    <p> {event.Group?.name}</p>
                    <p>{event.Group?.private ? "Private" : "Public"}</p>
                  </div>
                </div>
              </Link>

              <div className="">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i class="fa-regular fa-clock"></i>
                  <div>
                    <p style={{ marginLeft: "5px" }}>
                      START {parseDate(event.startDate)[0]} &#183;{" "}
                      {parseDate(event.startDate[1]).slice(1)}
                    </p>
                    <p style={{ marginLeft: "5px" }}>
                      END {parseDate(event.endDate)[0]} &#183;{" "}
                      {parseDate(event.endDate[1]).slice(1)}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                {event.price ? (
                  <>
                  <i class="fa-solid fa-dollar-sign"></i>
                  <p style={{ marginLeft: "5px" }}>{event.price}</p>
                  </>
                ) : "FREE" }
                </div>
                <div style={{ display: "flex" }}>
                  <i class="fa-solid fa-location-pin"></i>
                  <p style={{ marginLeft: "5px" }}>{event.type}</p>
                </div>
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
