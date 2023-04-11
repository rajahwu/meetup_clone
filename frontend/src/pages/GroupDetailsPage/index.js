import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GroupActionButtons as ActionButtons, GroupDetailCard } from "../../components";


export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const group = useSelector((state) => state.groups.allGroups)[groupId];
  return (
    <div>
      <GroupDetailCard group={group}>
        <ActionButtons groupId={groupId} />
      </GroupDetailCard>
    </div>
  );
}
