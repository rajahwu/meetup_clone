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
    <div>
      <div>
        <NavLink
          style={(isActive) => ({
            color: isActive ? "teal" : "grey",
            textDecoration: isActive ? "underline" : "none"
          })}
          className="btn btn-ghost normal-case text-xl"
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
          className="btn btn-ghost normal-case text-xl"
          exact
          to="/groups"
        >
          Groups
        </NavLink>
        <hr />
      </div>
      <div>
        <div>{children}</div>
      </div>
    </div>
  );
}
