import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGroups } from "../../store/groups";
import { CardImage } from "../../components";

const GroupCard = ({ name, description, city, state, type }) => (
  <div style={{ display: "flex" }}>
    <CardImage />
    <div>
      <h2>{name}</h2>
      <p>
        {city}, {state}
      </p>
      <p>{description}</p>
      <div style={{display: "flex"}}>
        <p>## events</p>
        <p>&#183;</p>
        <p>public or privite, {type}</p>
      </div>
    </div>
  </div>
);

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
          <>
            <GroupCard
              name={group.name}
              description={group.about}
              city={group.city}
              state={group.state}
              type={group.type}
            />
            <hr />
          </>
        );
      })}
    </div>
  );
}
