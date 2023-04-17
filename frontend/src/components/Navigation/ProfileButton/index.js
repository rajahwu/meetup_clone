import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { useSetModalClass } from "../../../hooks";
import OpenModelButton from "../OpenModalButton";
import ProfileButtonCSS from "./ProfileButton.module.css";

import * as sessionActions from "../../../store/session";
import { useState } from "react";

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setModalContent(null);
    history.push("/");
  };

  const handleClick = () => {
    setModalContent(null);
    setCaretDown(!caretDown);
  };
  const [caretDown, setCaretDown] = useState(true);

  const UserIcon = () => {
    return (
      <div
        onClick={() => {
          setCaretDown(!caretDown);
          setModalContent(null);
        }}
        style={{ backgroundColor: "red", padding: "15px", borderRadius: "50%" }}
      >
        <i className="fa-solid fa-user"></i>
        {caretDown ? (
          <i className="fa-solid fa-caret-down"></i>
        ) : (
          <i className="fa-solid fa-caret-up"></i>
        )}
      </div>
    );
  };

  const UserMenu = ({ user }) => {
    const { container, background, content } = ProfileButtonCSS;
    useSetModalClass({ container, background, content });
    return (
      <>
        <div
          onClick={() => {
            setModalContent(null);
            setCaretDown(!caretDown);
          }}
        ></div>
        <div style={{ display: "flex" }}>
          <ul>
            <div>
              <li>Hello, {user.username}</li>
              <li>{user.firstname}</li>
              <li>{user.email}</li>
              <li>
                <NavLink to="/groups" onClick={handleClick}>
                  View Groups
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" onClick={handleClick}>
                  View Events
                </NavLink>
              </li>
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
    </div>
  );
}
