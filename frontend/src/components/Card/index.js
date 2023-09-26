import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const Card = ({ titleText, linkTo, textContent, children }) => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="card w-64 bg-base-100 shadow-xl mx-auto text-center">
    <figure>{children}</figure>
      {linkTo === "/groups/new" && !sessionUser ? (
        <p className="btn btn-primary disabled">Start a group</p>
      ) : (
        <NavLink className="" exact to={linkTo || "/"}>
          {titleText}
        </NavLink>
      )}
      <p className="btn btn-primary ">{textContent}</p>
    </div>
  );
};

export default Card;
