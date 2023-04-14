import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import GroupEventCardCSS from "./GroupEventCard.module.css";

const GroupEventCard = ({
  name,
  description,
  city,
  state,
  groupId,
  startDate,
  visibility,
  children,
}) => {
  const css = GroupEventCardCSS;
  const history = useHistory();

  const events = useSelector((state) => state.events.allEvents);

  const numEvents = Object.values(events).filter(
    (event) => +event.groupId === +groupId
  ).length;
  return (
    <div className={css.container}>
      {children}
      <div>
      <p>{startDate}</p>
        <h2>{name}</h2>
        <p>
          {city}, {state}
        </p>
        <p>{description}</p>
        <div style={{ display: "flex" }}>
          {useParams().groupId === undefined &&
          history.location.pathname !== "/events" ? (
            <>
              <p>
                {numEvents} event{numEvents === 1 ? "" : "s"}
              </p>
              <p>&#183;</p>
              <p>{visibility}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupEventCard;
