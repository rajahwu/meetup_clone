import CardImage from "../CardImage";

export default function GroupDetailCard({ group, children }) {
  if (group)
    return (
      <div style={{ display: "flex" }}>
        <CardImage imageWidth="300px" imageHeight="250px" />
        <div>
          <h2>{group.name}</h2>
          <p>
            {group.city}, {group.state}
          </p>
          <div>
            <p>## events</p>
            <p>{group.private ? "Private" : "Public"}</p>
          </div>
          <p>
            Organized by {group.Organizer?.firstName} {group.Orginzer?.lastName}
          </p>
          {children}
        </div>
      </div>
    );
}
