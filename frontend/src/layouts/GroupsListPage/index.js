import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGroups } from "../../store/groups";
import { CardImage, GroupEventCard } from "../../components";

export default function GroupsListPage() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state?.groups);
  console.log(groups["1"]);

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

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
