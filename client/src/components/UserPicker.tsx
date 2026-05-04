import { useState, useEffect } from "react";
import { User } from "../types";
import { fetchJson } from "../api";

interface UserPickerProps {
  eventId: string;
  onJoined: () => void;
  disabledUserIds: string[];
}

export function UserPicker({ eventId, onJoined, disabledUserIds }: UserPickerProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<User[]>("/users").then((res) => {
      if (res.success && res.data) {
        setUsers(res.data);
      }
    });
  }, []);

  const availableUsers = users.filter((u) => !disabledUserIds.includes(u.id));

  const handleJoin = async () => {
    if (!selectedUserId) return;

    setJoining(true);
    setError(null);

    try {
      const res = await fetchJson(`/events/${eventId}/join`, {
        method: "POST",
        body: JSON.stringify({ userId: selectedUserId }),
      });

      if (res.success) {
        setSelectedUserId("");
        onJoined();
      } else {
        setError(res.error || "Failed to join");
      }
    } catch {
      setError("Network error");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div className="user-picker">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a user to join...</option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          className="primary"
          onClick={handleJoin}
          disabled={!selectedUserId || joining}
        >
          {joining ? "Joining..." : "Join Event"}
        </button>
      </div>
    </div>
  );
}
