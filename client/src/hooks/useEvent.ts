import { useState, useEffect, useCallback } from "react";
import { Event } from "../types";
import { fetchJson } from "../api";

export function useEvent(eventId: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetchJson<Event>(`/events/${eventId}`);
      if (res.success && res.data) {
        setEvent(res.data);
        setError(null);
      } else {
        setError(res.error || "Failed to load event");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { event, loading, error, refresh };
}
