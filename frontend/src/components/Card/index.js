import { NavLink } from "react-router-dom";

const Card = ({
  titleText,
  linkTo,
  textContent,
  isLoggedIn,
  children
}) => (
  <div>
    {children}
    <NavLink exact to={linkTo || "/"} disabled={isLoggedIn}>{titleText}</NavLink>
    <p>{textContent}</p>
  </div>
);

export default Card;
