import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function Header({ children }) {
  const sessionUser = useSelector((state) => state.session.user);

  const Logo = () => {
    const history = useHistory();
    const handleClick = () => history.push("/");
    return (
      <div className="flex-1">
        <img
          className=""
          src="../../../assets/hiwdt-logo.png"
          alt="logo"
          width="75"
          height="75"
          onClick={handleClick}
        />
      </div>
    );
  };

  return (
    <div id="header" className="navbar bg-base-100">
      <Logo />
      <div className="">
        {sessionUser && (
          <NavLink
            className=""
            to="/groups/new"
          >
            Start a new Group
          </NavLink>
        )}
        <div className="flex-none">{children}</div>
      </div>
    </div>
  );
}
