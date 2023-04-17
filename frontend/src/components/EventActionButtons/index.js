import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import OpenModelButton from "../Navigation/OpenModalButton";
import { useModal } from "../../context/Modal";
import EventActionButtonsCSS from "./EventActionButtons.module.css";

export default function EventActionButtons() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent } = useModal();

  const groupId = useSelector((state) => state.events.currentEvent.Group?.id);
  const { eventId } = useParams();

  const handleClick = () => {
    dispatch(eventActions.deleteEventThunk(eventId)).then(
      history.push(`/groups/${groupId}`)
    );
  };

  const ConfirmDelete = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          padding: "5rem",
        }}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this event?</p>
        <button
          style={{ padding: "1rem", color: "white", backgroundColor: "red" }}
          onClick={() => {
            history.push("/groups");
            dispatch(eventActions.deleteEventThunk(eventId))
              .then(history.push(`/groups/${groupId}`))
              .then(() => setModalContent(null));
          }}
        >
          Yes (Delete Event)
        </button>
        <button
          style={{ padding: "1rem", color: "white", backgroundColor: "gray" }}
          onClick={() => setModalContent(null)}
        >
          No (Keep Event)
        </button>
      </div>
    );
  };

  const css = EventActionButtonsCSS;
  return (
    <div>
      <OpenModelButton
        styleClassNames={"btn"}
        styleSheet={css}
        buttonText="Delete"
        modalComponent={<ConfirmDelete />}
      />
    </div>
  );
}
