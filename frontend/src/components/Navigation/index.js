import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModelButton from "../OpenModalButton";
import {SignupFormModal, LoginFormModal } from "../session"

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
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
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}
