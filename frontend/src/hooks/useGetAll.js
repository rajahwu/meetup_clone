import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllGroups } from "../store/groups";
import { getAllEvents } from "../store/events";

export default function useGetAll(type) {
    const dispatch = useDispatch();
    const groups = useSelector((state) => state.groups)
    const events = useSelector((state) => state.events);
  
    useEffect(() => {
        if(type === "groups") dispatch(getAllGroups());
        if(type === "events") dispatch(getAllEvents())
    }, [dispatch, type]);

    return type === "groups" ? groups : events
}