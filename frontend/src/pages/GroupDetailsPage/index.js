import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GroupActionButtons as ActionButtons, GroupDetailCard } from "../../components";
import { useEffect } from "react";
import { getGroup } from "../../store/groups";

export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const dispatch = useDispatch()

  const group = useSelector((state) => state.groups.currentGroup);

  useEffect(() => {
    dispatch(getGroup(groupId))

  }, [dispatch, groupId])

  return (
    <div>
      <GroupDetailCard  group={group}>
        <ActionButtons groupId={groupId} />
      </GroupDetailCard>
    </div>
  );
}
