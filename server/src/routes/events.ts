import { Router, Request, Response } from "express";
import { events, users } from "../data/seed";
import { ApiResponse, Event, User } from "../types";

const router = Router();

// GET /api/events — list all events
router.get("/", (_req: Request, res: Response<ApiResponse<Event[]>>) => {
  res.json({ success: true, data: events });
});

// GET /api/events/:id — get a single event
router.get("/:id", (req: Request, res: Response<ApiResponse<Event>>) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, error: "Event not found" });
  }
  res.json({ success: true, data: event });
});

// POST /api/events/:id/join — add a user as attendee or to the waitlist
router.post("/:id/join", (req: Request, res: Response<ApiResponse<Event>>) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, error: "Event not found" });
  }

  const { userId } = req.body as { userId: string };
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  const alreadyAttending = event.attendees.some((a) => a.id === userId);
  const alreadyWaitlisted = event.waitlist.some((w) => w.id === userId);
  if (alreadyAttending || alreadyWaitlisted) {
    return res
      .status(400)
      .json({ success: false, error: "User already joined" });
  }

  if (event.attendees.length < event.maxCapacity) {
    event.attendees.push(user);
  } else {
    event.waitlist.push(user);
  }

  res.json({ success: true, data: event });
});

// POST /api/events/:id/remove — remove a user and auto-promote from waitlist
router.post(
  "/:id/remove",
  (req: Request, res: Response<ApiResponse<Event>>) => {
    const event = events.find((e) => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    const { userId } = req.body as { userId: string };

    const attendeeIndex = event.attendees.findIndex((a) => a.id === userId);
    if (attendeeIndex !== -1) {
      event.attendees.splice(attendeeIndex, 1);

      // Auto-promote first waitlisted user
      if (event.waitlist.length > 0) {
        const promoted = event.waitlist.shift()!;
        event.attendees.push(promoted);
      }

      return res.json({ success: true, data: event });
    }

    const waitlistIndex = event.waitlist.findIndex((w) => w.id === userId);
    if (waitlistIndex !== -1) {
      event.waitlist.splice(waitlistIndex, 1);
      return res.json({ success: true, data: event });
    }

    return res
      .status(404)
      .json({ success: false, error: "User not found in event" });
  }
);

export default router;
