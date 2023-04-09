import { CardImage, GroupEventCard } from "../../components";
import { useGetAll } from "../../hooks";

export default function GroupsListPage() {
  const groups = useGetAll("groups");

  return (
    <div>
      {Object.values(groups).map((group) => {
        return (
          <div key={group.id}>
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
