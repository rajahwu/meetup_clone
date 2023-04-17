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
      <div>
        <div
          style={{
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
      <div>
        <div>{children}</div>
      </div>
    </>
  );
}
