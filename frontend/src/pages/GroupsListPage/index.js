import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetAll } from "../../hooks";
import { CardImage, GroupEventCard } from "../../components";
import GroupsListPageCSS from "./GroupsListPage.module.css"

import { checkForImage } from "../../utils/checkForImage";
import { defaultImages } from "../../utils/defaultImages";
import { getGroup } from "../../store/groups";

export default function GroupsListPage() {
  const groups = useGetAll("groups").allGroups;
  const history = useHistory();
  const dispatch = useDispatch()

  return (
    <div style={{display: "flex", flexDirection: "column", margin: "auto"}}>
      {Object.values(groups).map((group) => {
        return (
          <div
            key={group.id}
            onClick={() => {
              dispatch(getGroup(group.id))
              history.push(`/groups/${group.id}`)
              }}
          >
            <GroupEventCard
              groupId={group.id}
              name={group.name}
              description={group.about}
              city={group.city}
              state={group.state}
              visibility={group.private ? "Private" : "Public"}
              styleSheet={GroupsListPageCSS}
            >
              <CardImage
                imageWidth="350px"
                imageHeight="200px"
                imageUrl={checkForImage(
                  [group.previewImage],
                  defaultImages.groups,
                  "previewImage"
                )}
                styleSheet={GroupsListPageCSS}
              />
            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
