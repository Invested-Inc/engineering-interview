import { User } from "../types";

interface AttendeeListProps {
  attendees: User[];
  title: string;
  emptyMessage: string;
  onRemove?: (userId: string) => void;
  showPosition?: boolean;
}

export function AttendeeList({
  attendees,
  title,
  emptyMessage,
  onRemove,
  showPosition,
}: AttendeeListProps) {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      {attendees.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        <ul className="attendee-list">
          {attendees.map((user, index) => (
            <li key={user.id}>
              <div>
                {showPosition && (
                  <span className="waitlist-position">#{index + 1}</span>
                )}
                <span className="attendee-name">{user.name}</span>
                <br />
                <span className="attendee-email">{user.email}</span>
              </div>
              {onRemove && (
                <button className="danger" onClick={() => onRemove(user.id)}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
