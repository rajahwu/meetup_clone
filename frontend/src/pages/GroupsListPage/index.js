import { useHistory } from "react-router-dom";
import { useGetAll } from "../../hooks";
import { CardImage, GroupEventCard } from "../../components";

import { checkForImage } from "../../utils/checkForImage";
import { defaultImages } from "../../utils/defaultImages";

export default function GroupsListPage() {
  const groups = useGetAll("groups").allGroups;
  const history = useHistory();

  return (
    <div>
      {Object.values(groups).map((group) => {
        return (
          <div
            key={group.id}
            onClick={() => history.push(`/groups/${group.id}`)}
          >
            <GroupEventCard
              groupId={group.id}
              name={group.name}
              description={group.about}
              city={group.city}
              state={group.state}
              visibility={group.private ? "Private" : "Public"}
            >
              <CardImage
                imageWidth="200px"
                imageHeight="200px"
                imageUrl={checkForImage(
                  [group.previewImage],
                  defaultImages.groups,
                  "previewImage"
                )}
              />
            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
