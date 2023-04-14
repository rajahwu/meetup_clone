import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const Card = ({ titleText, linkTo, textContent, children, styleSheet }) => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className={styleSheet["card"]}>
      {children}
      {linkTo === "/groups/new" && !sessionUser ? (
        <p>Start a group</p>
      ) : (
        <NavLink className={styleSheet["card-link"]} exact to={linkTo || "/"}>
          {titleText}
        </NavLink>
      )}
      <p className={styleSheet["card-text"]}>{textContent}</p>
    </div>
  );
};

export default Card;
