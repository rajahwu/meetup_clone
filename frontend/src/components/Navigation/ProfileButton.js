import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const UserIcon = () => <i className="fa-solid fa-user"></i>;

  return (
    <>
      <button>
        <UserIcon />
      </button>
      <ul className="profile-dropdown">
        <li>{user.username}</li>
        <li>{user.firstname}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </>
  );
}
