import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function EventGroupHeader({ children }) {
  const history = useHistory();
  const location = history.location;
  // const testText = "color: green; background: yellow; font-size: 10px";
  // console.log(
  //   "%cEventGroupPage Locaiton,",
  //   testText,
  //   location.pathname.includes("groups")
  // );
  return (
    <div>
      <div>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/groups">Groups</NavLink>
        <p>
          {location.pathname.includes("events")
            ? "Events in HIWDT"
            : "Groups in HIWDT"}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
