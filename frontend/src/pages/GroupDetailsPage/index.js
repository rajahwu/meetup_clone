import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GroupActionButtons as ActionButtons,
  GroupDetailCard,
} from "../../components";

import { getGroup } from "../../store/groups";
import { getGroupEvents } from "../../store/events";

export default function GroupDetailsPage() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGroupEvents(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    dispatch(getGroup(groupId));
  }, [dispatch, groupId]);


  const group = useSelector((state) => state.groups.currentGroup);

  return (
    <div className="">
      <GroupDetailCard group={group}>
        <ActionButtons groupId={groupId} />
      </GroupDetailCard>
    </div>
  );
}
