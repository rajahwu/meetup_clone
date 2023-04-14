import { NavLink } from "react-router-dom";

const Card = ({
  titleText,
  linkTo,
  textContent,
  isLoggedIn,
  children,
  styleSheet
}) => (
  <div className={styleSheet["card"]}>
    {children}
    <NavLink className={styleSheet["card-link"]} exact to={linkTo || "/"} disabled={isLoggedIn}>{titleText}</NavLink>
    <p className={styleSheet["card-text"]}>{textContent}</p>
  </div>
);

export default Card;
