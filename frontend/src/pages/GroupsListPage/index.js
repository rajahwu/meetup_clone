import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetAll } from "../../hooks";
import { CardImage, GroupEventCard } from "../../components";

import { checkForImage } from "../../utils/checkForImage";
import { defaultImages } from "../../utils/defaultImages";
import { getGroup } from "../../store/groups";

export default function GroupsListPage() {
  const groups = useGetAll("groups").allGroups;
  const history = useHistory();
  const dispatch = useDispatch()

  return (
    <div >
      {Object.values(groups).map((group) => {
        return (
          <div
            className="card card-side bg-base-100 shadow-xl my-5"
            key={group.id}
            onClick={() => {
              dispatch(getGroup(group.id))
              history.push(`/groups/${group.id}`)
            }}
          >
            <figure>
              <CardImage
                imageWidth="350px"
                imageHeight="200px"
                imageUrl={checkForImage(
                  [group.previewImage],
                  defaultImages.groups,
                  "previewImage"
                )}
              />
            </figure>

            <GroupEventCard
              groupId={group.id}
              name={group.name}
              description={group.about}
              city={group.city}
              state={group.state}
              visibility={group.private ? "Private" : "Public"}
            >

            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
