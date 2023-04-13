import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeGroupThunk } from "../../store/groups";

import GroupActionButtonsCSS from "./GroupActionButtons.module.css"

export default function GroupActionButtons({ groupId }) {
  const css = GroupActionButtonsCSS

  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user?.id)
  const ownerId = useSelector(state => state.groups.currentGroup.organizerId)
  const isOwner = (userId === ownerId)
  return (
    isOwner ? (
    <div>
      <button  className={css.btn} onClick={() => history.push(`/groups/${groupId}/events/new`)}>Create event</button>
      <button  className={css.btn} onClick={() => history.push(`/groups/update/${groupId}`)}>Update</button>
      <button className={css.btn} 
        onClick={() => {
          history.push("/groups");
          dispatch(removeGroupThunk(groupId));
        }}
      >
        Delete
      </button>
    </div>
    ) : (
      userId && <button style={{background: "red"}} onClick={() => alert("Feature comming soon")}>Join this Group</button>
    )
  );
}
