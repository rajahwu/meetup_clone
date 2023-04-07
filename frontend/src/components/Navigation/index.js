import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      <ul>
        {sessionUser ? (
          <li>
            <NavLink to="/">Logout</NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
