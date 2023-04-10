import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


export default function GroupDetailsPage() {
    const {groupId} = useParams()
    const group = useSelector(state => console.log(state))    
    console.log("GroupDetail", group)
    return (
        <div>
            Group Details Page
        </div>
    )
}