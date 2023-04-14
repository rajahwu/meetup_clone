import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import HeaderCSS from "./Header.module.css";

export default function Header({ children }) {
  const sessionUser = useSelector((state) => state.session.user);

  const Logo = () => {
    const history = useHistory();
    const handleClick = (e) => {
      history.push("/");
    };
    return (
      <div className={HeaderCSS["logo-container"]}>
        <img
          className={HeaderCSS["logo"]}
          src="../../../assets/hiwdt-logo.png"
          alt="logo"
          width="100"
          height="100"
          onClick={handleClick}
        />
      </div>
    );
  };

  return (
    <div id="header" className={HeaderCSS["container"]}>
      <Logo />
      <div style={{ display: "flex", alignItems: "center" }}>
        {sessionUser && (
          <NavLink
            className={HeaderCSS["nav-link"]}
            style={{ margin: "0 2.5px 25px 0" }}
            to="/groups/new"
          >
            Start a new Group
          </NavLink>
        )}
        {children}
      </div>
    </div>
  );
}
