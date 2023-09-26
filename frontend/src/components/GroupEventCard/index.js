import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { parseDate } from "../../utils";


const CardDescription = ({ description}) => {
  return (
    description && (
      <div style={{}}>
        <p className="">{description}</p>
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
  const history = useHistory();

  const events = useSelector((state) => state.events.allEvents);

  const eventList = Object.values(events).filter(
    (event) => +event.groupId === +groupId
  );

  const numEvents = eventList.length;

  return (
    <div className="">
      <div>{children}</div>
      <div>
        <div className={styleSheet?.["text-container"]}>
          <p className="">
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
          <p className={styleSheet?.["card-location"]} style={{color: "gray", marginTop: "15px"}}>
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
            <div style={{ display: "flex", color: "grey", letterSpacing: "0.07rem" }}>
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
