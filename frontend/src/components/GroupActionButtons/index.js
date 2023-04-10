import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeGroupThunk } from "../../store/groups";

export default function GroupActionButtons({ groupId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <button>One</button>
      <button>Update</button>
      <button
        onClick={() => {
          history.push("/groups");
          dispatch(removeGroupThunk(groupId));
        }}
      >
        Delete
      </button>
    </div>
  );
}
