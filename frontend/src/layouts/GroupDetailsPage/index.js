import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as groupActions  from "../../store/groups";


export default function GroupDetailsPage() {
    const {groupId} = useParams()
    const dispatch = useDispatch()
    const group = useSelector(state => state.groups)[groupId]
    console.log("group detial useSelector group", group)

    useEffect(() => {
        dispatch(groupActions.getGroup(groupId))
    }, [dispatch, groupId])

    return (
        <div>
            Group Details Page
        </div>
    )
}