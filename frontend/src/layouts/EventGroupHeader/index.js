import { NavLink } from "react-router-dom";

export default function EventGroupHeader({ children }) {
  return (
    <div>
      <div>
        <NavLink to="/Events">Events</NavLink>
        <NavLink to="/Groups">Groups</NavLink>
      </div>
      <div>{children}</div>
    </div>
  );
}
