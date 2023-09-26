import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllGroups } from "../../store/groups";
import { getAllEvents } from "../../store/events";

export default function EventGroupHeader({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location;

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllEvents());
  }, [dispatch]);


  return (
    <>
      <div className="">
        <NavLink
          style={(isActive) => ({
            color: isActive ? "teal" : "grey",
            textDecoration: isActive ? "underline" : "none"
          })}
          className=""
          exact
          to="/events"
        >
          Events
        </NavLink>
        <NavLink
          style={(isActive) => ({
            color: isActive ? "teal" : "grey",
            textDecoration: isActive ? "underline" : "none"
          })}
          className=""
          exact
          to="/groups"
        >
          Groups
        </NavLink>
        <p className="">
          {location.pathname.includes("events")
            ? "Events in HIWDT"
            : "Groups in HIWDT"}
        </p>
        <hr />
      </div>
      <div>
        <div>{children}</div>
      </div>
    </>
  );
}
