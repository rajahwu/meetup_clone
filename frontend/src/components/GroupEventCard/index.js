import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { parseDate } from "../../utils";

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
  styleSheet,
}) => {
  const css = GroupEventCardCSS;
  const history = useHistory();

  const events = useSelector((state) => state.events.allEvents);
  
  const eventList = Object.values(events).filter(
    (event) => +event.groupId === +groupId
  );

  const numEvents = eventList.length;

  return (
    <div className={css.container}>
      {children}
      <div>
        <div className={styleSheet?.["text-container"]}>
          <p>
            {startDate
              ? `${parseDate(startDate)[0]} ${parseDate(startDate)[1]}`
              : startDate}
          </p>
          <h2 className={styleSheet?.["card-title"]}>{name}</h2>
          <p className={styleSheet?.["card-location"]}>
            {city}, {state}
          </p>
          <p className={styleSheet?.["card-description"]}>{description}</p>

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
    </div>
  );
};

export default GroupEventCard;
