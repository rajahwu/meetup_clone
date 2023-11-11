import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModelButton from "./OpenModalButton";
import { SignupFormModal, LoginFormModal } from "../session";

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
      <ul className="p-2 bg-base-100">
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
      </ul>
    );
  }

  return (
    <ul className="menu menu-horizontal px-1">
      {isLoaded && sessionLinks}
    </ul>
  );
}
