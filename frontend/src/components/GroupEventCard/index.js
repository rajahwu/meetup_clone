import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { parseDate } from "../../utils";

import GroupEventCardCSS from "./GroupEventCard.module.css";

const GroupListCard = () => {};
const EventListCard = () => {};
const GroupDetailEventCard = () => {};

const CardDescription = ({ description, styleSheet }) => {
  return (
    description && (
      <div style={{}}>
        <p className={styleSheet?.["card-description"]}>{description}</p>
      </div>
    )
  );
};

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
      <div>{children}</div>
      <div>
        <div className={styleSheet?.["text-container"]}>
          <p className={css[".start-date"]}>
            {startDate ? (
              <span>
                {parseDate(startDate)[0]}
                &#183;
                {parseDate(startDate)[1]}
              </span>
            ) : (
              startDate
            )}
          </p>
          <h2>{name}</h2>
          <p className={styleSheet?.["card-location"]}>
            {city}, {state}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {history.location.pathname !== "/events" && (
            <CardDescription
              description={description}
              styleSheet={styleSheet}
            />
          )}

          {useParams().groupId === undefined &&
          history.location.pathname !== "/events" ? (
            <div style={{ display: "flex" }}>
              <p>
                {numEvents} event{numEvents === 1 ? "" : "s"}
              </p>
              <p>&#183;</p>
              <p>{visibility}</p>
            </div>
          ) : null}

          {history.location.pathname === "/events" && (
            <div style={{display: "flex", justifyContent: "center"}}>
              <CardDescription
                description={description}
                styleSheet={StyleSheet}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupEventCard;
