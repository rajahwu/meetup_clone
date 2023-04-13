import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../../store/events";

export default function EventActionButtons() {
  const dispatch = useDispatch();
  const history = useHistory();

  const groupId = useSelector((state) => state.events.currentEvent.Group?.id);
  const { eventId } = useParams();

  const handleClick = () => {
    dispatch(eventActions.deleteEventThunk(eventId)).then(
      history.push(`/groups/${groupId}`)
    );
  };
  return (
    <div>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
}
