import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllGroups } from "../../store/groups";

export default function GroupsListPage() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state?.groups);
  // console.log(groups["1"]);

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <div>
     Group List Page
    </div>
  );
}
