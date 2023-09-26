import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const Card = ({ titleText, linkTo, textContent, children }) => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="">
      {children}
      {linkTo === "/groups/new" && !sessionUser ? (
        <p className="">Start a group</p>
      ) : (
        <NavLink className="" exact to={linkTo || "/"}>
          {titleText}
        </NavLink>
      )}
      <p className="">{textContent}</p>
    </div>
  );
};

export default Card;
