import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeGroupThunk } from "../../store/groups";
import OpenModelButton from "../Navigation/OpenModalButton";
import { useModal } from "../../context/Modal";

import GroupActionButtonsCSS from "./GroupActionButtons.module.css";

export default function GroupActionButtons({ groupId }) {
  const css = GroupActionButtonsCSS;
  const {setModalContent} = useModal()

  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.session.user?.id);
  const ownerId = useSelector((state) => state.groups.currentGroup.organizerId);
  const isOwner = userId === ownerId;

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
        <p>Are you sure you want to remove this group?</p>
        <button
          style={{ padding: "1rem", color: "white", backgroundColor: "red" }}
          onClick={() => {
          history.push("/groups");
          dispatch(removeGroupThunk(groupId))
          .then(() => setModalContent(null))
        }}
        >
          Yes (Delete Group)
        </button>
        <button
          style={{ padding: "1rem", color: "white", backgroundColor: "gray" }}
          onClick={() => setModalContent(null)}
        >
          No (Keep Group)
        </button>
      </div>
    );
  };

  return isOwner ? (
    <div>
      <button
        className={css.btn}
        onClick={() => history.push(`/groups/${groupId}/events/new`)}
      >
        Create event
      </button>
      <button
        className={css.btn}
        onClick={() => history.push(`/groups/update/${groupId}`)}
      >
        Update
      </button>
      <OpenModelButton
        styleClassNames={"btn"}
        styleSheet={css}
        buttonText="Delete"
        modalComponent={<ConfirmDelete />}
      />
    </div>
  ) : (
    userId && (
      <button
        className={css["join-btn"]}
        onClick={() => alert("Feature comming soon")}
      >
        Join this Group
      </button>
    )
  );
}
