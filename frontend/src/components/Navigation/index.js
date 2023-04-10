import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModelButton from "./OpenModalButton";
import { SignupFormModal, LoginFormModal } from "../session";
import NavigationCSS from "./Navigation.module.css";

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li style={{marginBottom: "10px", marginRight: "5px"}}>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModelButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModelButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <nav className={NavigationCSS["nav-bar"]}>
      <ul className={NavigationCSS["nav-links"]}>{isLoaded && sessionLinks}</ul>
    </nav>
  );
}
