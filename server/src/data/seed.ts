import { Event, User } from "../types";

// Pre-populated users that can join events.
// In a real app these would come from auth — here they're just for convenience.
export const users: User[] = [
  { id: "u1", name: "Alice Johnson", email: "alice@example.com" },
  { id: "u2", name: "Bob Smith", email: "bob@example.com" },
  { id: "u3", name: "Charlie Davis", email: "charlie@example.com" },
  { id: "u4", name: "Dana Lee", email: "dana@example.com" },
  { id: "u5", name: "Eli Morgan", email: "eli@example.com" },
  { id: "u6", name: "Faye Chen", email: "faye@example.com" },
  { id: "u7", name: "Gabe Wilson", email: "gabe@example.com" },
  { id: "u8", name: "Hana Park", email: "hana@example.com" },
  { id: "u9", name: "Ivan Torres", email: "ivan@example.com" },
  { id: "u10", name: "Jess Rivera", email: "jess@example.com" },
  { id: "u11", name: "Kyle Nguyen", email: "kyle@example.com" },
  { id: "u12", name: "Lena Brooks", email: "lena@example.com" },
  { id: "u13", name: "Mike Chang", email: "mike@example.com" },
  { id: "u14", name: "Nora Patel", email: "nora@example.com" },
  { id: "u15", name: "Oscar Ruiz", email: "oscar@example.com" },
];

export const events: Event[] = [
  {
    id: "evt-1",
    title: "TypeScript Workshop: Advanced Patterns",
    description:
      "A hands-on workshop covering advanced TypeScript patterns including discriminated unions, template literal types, and type-safe event systems.",
    date: "2026-04-15T14:00:00Z",
    maxCapacity: 5,
    attendees: [],
    waitlist: [],
  },
];
