import { useHistory } from "react-router-dom";
import { useGetAll } from "../../hooks";
import { CardImage, GroupEventCard } from "../../components";

export default function GroupsListPage() {
  const groups = useGetAll("groups").allGroups;
  const history = useHistory()

  // const testText = [
  //   'background: yellow',
  //   'font-size: 16px',
  //   'color: blue'
  // ].join(';')
  // console.log("%cGroup List group", testText)
  // console.dir(groups)

  return (
    <div>
      {Object.values(groups).map((group) => {
        return (
          <div key={group.id} onClick={() => history.push(`/groups/${group.id}`)}>
            <GroupEventCard
              name={group.name}
              description={group.about}
              city={group.city}
              state={group.state}
              type={group.type}
            >
              <CardImage />
            </GroupEventCard>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
