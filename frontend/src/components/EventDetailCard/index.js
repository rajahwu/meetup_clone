import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { CardImage } from "../../components";
import { checkForImage } from "../../utils/checkForImage";
// import { defaultImages } from "../../utils";
const defaultImages = [
  "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
];

export default function EventDetailCard({ event, children }) {
  const group = useSelector((state) => state.groups.currentGroup);
  if (!event.id) return null;
  return (
    <>
      <NavLink to="/events">Events</NavLink>
      <div className="container" style={{ display: "flex" }}>
        <div>
          <div className="title-div">
            <h2>{event.name}</h2>
            <p>Hosted By</p>
            <br />
          </div>

          <div
            className="main-div"
            style={{ display: "flex", border: "3px solid pink" }}
          >
            <CardImage
              imageHeight="200px"
              imageWidth="300px"
              imageUrl={checkForImage([event.previwImage], defaultImages)}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link to={`/groups/${event.Group?.id}`}>
                <div style={{ display: "flex" }}>
                  <div>
                    <CardImage
                      imageWidth="50px"
                      imageHeight="50px"
                      imageUrl={checkForImage(
                        [group?.GroupImages],
                        defaultImages
                      )}
                    />
                  </div>
                  <div>
                    <p> {event.Group?.name}</p>
                    <p>{event.Group?.private ? "Private" : "Public"}</p>
                  </div>
                </div>
              </Link>
              <hr />

              <div>
                <p>START {event.startDate}</p>
                <p>END {event.endDate}</p>
              </div>
              <p>{event.price}</p>
              <p>{event.type}</p>
            </div>
          </div>

          <div className="details-div">
            <h3>Details</h3>
            <p>{event.description}</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
