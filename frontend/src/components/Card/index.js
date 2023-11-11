import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const Card = ({ titleText, linkTo, textContent, children }) => {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div className="card w-64 bg-base-100 shadow-xl mx-auto text-center justify-between">
    <figure>{children}</figure>
      <p className="my-5">{textContent}</p>
      {linkTo === "/groups/new" && !sessionUser ? (
        <p className="btn btn-disabled disabled">Start a group</p>
      ) : (
        <NavLink className="btn btn-primary" exact to={linkTo || "/"}>
          {titleText}
        </NavLink>
      )}
    </div>
  );
};

export default Card;
