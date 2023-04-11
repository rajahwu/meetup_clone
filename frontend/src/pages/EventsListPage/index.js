import { CardImage, GroupEventCard } from "../../components";
import { useGetAll } from "../../hooks";

export default function EventsListPage() {
  const events = useGetAll("events");

  return (
    <div>
      {Object.values(events).map((event) => {
        return (
          <div key={event.id}>
            <GroupEventCard
              name={event.name}
              description={event.about}
              city={event.city}
              state={event.state}
              type={event.type}
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
