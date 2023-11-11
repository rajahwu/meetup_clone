import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import OpenModelButton from "../OpenModalButton";

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
      >
          <i className="fa-solid fa-user"></i>
          <i className="fa-solid fa-caret-down"></i>
          {/* <i className="fa-solid fa-caret-up"></i> */}
      </div>
    );
  };

  const UserMenu = ({ user }) => {
    return (
      <>
        <div
          onClick={() => {
            setModalContent(null);
            setCaretDown(!caretDown);
          }}
        ></div>
        <div>
          <ul>
            <div className="">
              <li className="">Hello, {user.username}</li>
              <li className="">{user.firstname}</li>
              <li className="">{user.email}</li>
              <li className="">
                <NavLink className="" to="/groups" onClick={handleClick}>
                  View Groups
                </NavLink>
              </li>
              <li className="">
                <NavLink className="" to="/events" onClick={handleClick}>
                  View Events
                </NavLink>
              </li>
              <li>
                <button className="" onClick={logout}>Logout</button>
              </li>
            </div>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div>
      <OpenModelButton
        className=""
        buttonText={<UserIcon />}
        modalComponent={<UserMenu user={user} />}
      />
    </div>
  );
}
