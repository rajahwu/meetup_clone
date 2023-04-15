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
      <div style={{ marginTop: "100px" }}>
        <div
          style={{
            position: "fixed",
            top: 120,
            backgroundColor: "#ffffff",
            width: "100%",
          }}
        >
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/groups">Groups</NavLink>
          <p>
            {location.pathname.includes("events")
              ? "Events in HIWDT"
              : "Groups in HIWDT"}
          </p>
        </div>
      </div>
      <div style={{ marginTop: "200px" }}>
        <div>{children}</div>
      </div>
    </>
  );
}
