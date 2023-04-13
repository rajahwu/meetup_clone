import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeGroupThunk } from "../../store/groups";

export default function GroupActionButtons({ groupId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user.id)
  const ownerId = useSelector(state => state.groups.currentGroup.organizerId)
  const isOwner = (userId === ownerId)
  return (
    isOwner ? (
    <div>
      <button onClick={() => history.push(`/groups/${groupId}/events/new`)}>Create event</button>
      <button onClick={() => history.push(`/groups/update/${groupId}`)}>Update</button>
      <button
        onClick={() => {
          history.push("/groups");
          dispatch(removeGroupThunk(groupId));
        }}
      >
        Delete
      </button>
    </div>
    ) : (
      <button>Join the Group</button>
    )
  );
}
