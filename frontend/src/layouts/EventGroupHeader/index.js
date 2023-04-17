import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllGroups } from "../../store/groups";
import { getAllEvents } from "../../store/events";
import EventGroupHeaderCSS from "./EventGroupHeader.module.css";

export default function EventGroupHeader({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = history.location;

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getAllEvents());
  }, [dispatch]);

  const css = EventGroupHeaderCSS;

  return (
    <>
      <div className={css["container"]}>
        <NavLink
          style={(isActive) => ({
            color: isActive ? "teal" : "grey",
            textDecoration: isActive ? "underline" : "none"
          })}
          className={css["nav-link"]}
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
          className={css["nav-link"]}
          exact
          to="/groups"
        >
          Groups
        </NavLink>
        <p className={css["title"]}>
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
