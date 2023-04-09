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
    <NavLink to={linkTo || "/"} disabled={isLoggedIn}>{titleText}</NavLink>
    <p>{textContent}</p>
  </div>
);

export default Card;
