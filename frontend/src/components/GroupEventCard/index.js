import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import GroupEventCardCSS from "./GroupEventCard.module.css";

const GroupEventCard = ({
  name,
  description,
  city,
  state,
  groupId,
  visibility,
  children,
}) => {
  const css = GroupEventCardCSS;
  const isGroupList = !Boolean(useParams().groupId);
  
  const events = useSelector((state) => state.events.currentGroupEvents);

  const numEvents = Object.values(events).length

  return (
    <div className={css.container}>
      {children}
      <div>
        <h2>{name}</h2>
        <p>
          {city}, {state}
        </p>
        <p>{description}</p>
        <div style={{ display: "flex" }}>
          {isGroupList ? (
            <>
              <p>{numEvents} events</p>
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
