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
}) => {
  const history = useHistory();

  const events = useSelector((state) => state.events.allEvents);

  const eventList = Object.values(events).filter(
    (event) => +event.groupId === +groupId
  );

  const numEvents = eventList.length;

  return (
    <div className="card-body">
      <div>{children}</div>
      <div>
        <div>
          <p>
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
          <h2 className="card-title">{name}</h2>
          <p>
            {city}, {state}
          </p>
        </div>

        <div>
          {history.location.pathname !== "/events" && (
            <CardDescription
              description={description}
            />
          )}
          
          {useParams().groupId === undefined &&
          history.location.pathname !== "/events" ? (
            <div className="flex">
              <p>
                {numEvents} event{numEvents === 1 ? "" : "s"}
              </p>
              <p>&#183;</p>
              <p>{visibility}</p>
            </div>
          ) : null}

          {history.location.pathname === "/events" && (
            <div>
              <CardDescription
                description={description}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupEventCard;
