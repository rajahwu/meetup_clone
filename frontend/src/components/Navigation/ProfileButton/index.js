import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";
import OpenModelButton from "../OpenModalButton";
import ProfileButtonCSS from "./ProfileButton.module.css";
import { useSetModalClass } from "../../../hooks";

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const UserIcon = () => <i className="fa-solid fa-user"></i>;

  const UserMenu = ({ user }) => {
    const { container, background, content } = ProfileButtonCSS;
    useSetModalClass({ container, background, content });
    return (
      <>
        <div>
          <UserIcon />
          <i className="fa-solid fa-caret-up"></i>
        </div>
        <div style={{ display: "flex" }}>
          <ul>
            <div>
              <li>Hello, {user.username}</li>
              <li>{user.firstname}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </div>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <OpenModelButton
        className={ProfileButton["modal"]}
        buttonText={<UserIcon />}
        modalComponent={<UserMenu user={user} />}
      />
      <div>
        <i className="fa-solid fa-caret-down"></i>
      </div>
    </div>
  );
}
