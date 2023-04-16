import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GroupActionButtons as ActionButtons,
  GroupDetailCard,
} from "../../components";
import GroupDetailsPageCSS from "./GroupDetailsPage.module.css";

import { getGroup } from "../../store/groups";
import { getGroupEvents } from "../../store/events";

export default function GroupDetailsPage() {
  const css = GroupDetailsPageCSS;

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
    <div className={css.container} style={{ marginTop: "115px" }}>
      <GroupDetailCard group={group} styleSheet={css}>
        <ActionButtons groupId={groupId} />
      </GroupDetailCard>
    </div>
  );
}
