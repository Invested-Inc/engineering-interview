import { useEvent } from "../hooks/useEvent";
import { AttendeeList } from "./AttendeeList";
import { UserPicker } from "./UserPicker";
import { fetchJson } from "../api";

interface EventPageProps {
  eventId: string;
}

export function EventPage({ eventId }: EventPageProps) {
  const { event, loading, error, refresh } = useEvent(eventId);

  if (loading) return <p>Loading event...</p>;
  if (error) return <div className="error-message">{error}</div>;
  if (!event) return <div className="error-message">Event not found</div>;

  const isFull = event.attendees.length >= event.maxCapacity;

  const handleRemove = async (userId: string) => {
    await fetchJson(`/events/${eventId}/remove`, {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
    refresh();
  };

  const allUserIds = [
    ...event.attendees.map((a) => a.id),
    ...event.waitlist.map((w) => w.id),
  ];

  return (
    <div>
      <h1>{event.title}</h1>
      <p className="event-date">
        {new Date(event.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <p className="event-description">{event.description}</p>

      <span className={`capacity-badge ${isFull ? "full" : ""}`}>
        {event.attendees.length} / {event.maxCapacity} spots filled
      </span>

      <UserPicker
        eventId={eventId}
        onJoined={refresh}
        disabledUserIds={allUserIds}
      />

      <AttendeeList
        attendees={event.attendees}
        title="Attendees"
        emptyMessage="No one has joined yet. Be the first!"
        onRemove={handleRemove}
      />

      {event.waitlist.length > 0 && (
        <AttendeeList
          attendees={event.waitlist}
          title="Waitlist"
          emptyMessage=""
          onRemove={handleRemove}
          showPosition
        />
      )}
    </div>
  );
}
