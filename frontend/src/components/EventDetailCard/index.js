import { NavLink } from "react-router-dom";
import { CardImage } from "../../components";

export default function EventDetailCard({ event, children }) {
  console.log("event detail card, " ,event)
    if(!event.id) return null
  return (
    <>
      <NavLink to="/events">Events</NavLink>
    <div className="container" style={{display: "flex"}}>
      <div>
        <div className="title-div">
          <h2>{event.name}</h2>
          <p>Hosted By</p>
          <br />
        </div>

        <div className="main-div" style={{display: "flex", border: "3px solid pink"}}>
          <CardImage imageHeight="200px" imageWidth="300px" />
            
          <div>
            <CardImage imageWidth="50px" imageHeight="50px" />
            <p> {event.Group?.name}</p>
            <p>{event.Group?.type}</p>
          </div>

          <div>
            <p>{event.startDate}</p>
            <p>{event.endDate}</p>
            <p>{event.price}</p>
            <p>{event.type}</p>
          </div>
        </div>

        <div className="details-div">
          <h3>Details</h3>
          <p>{event.discription}</p>
        </div>
        {children}
      </div>
    </div>
    </>
  );
}
