# Invested Inc — Engineering Interview

## Setup

```bash
# Install all dependencies
npm run install:all

# Start both server and client
npm run dev

# Or run individually:
npm run dev:server   # Express API on http://localhost:3001
npm run dev:client   # React app on http://localhost:5173
```

You should see an event admin panel in your browser at `http://localhost:5173`.

## The App

An **admin panel for managing event attendance**. It supports:

- Adding users to an event from a dropdown
- Capacity enforcement — the event has a max capacity of 5
- Waitlist — when the event is full, new users are added to a waitlist
- Remove — admins can remove attendees or waitlisted users; removing an attendee auto-promotes the first person on the waitlist

There are **15 seed users** and **1 event**. All data is in-memory — restarting the server resets everything.

## Project Structure

```
├── server/
│   └── src/
│       ├── index.ts           # Express entry point
│       ├── types.ts           # Shared TypeScript types
│       ├── data/
│       │   └── seed.ts        # In-memory seed data (15 users, 1 event)
│       └── routes/
│           ├── events.ts      # Event endpoints (GET, POST /join, POST /remove)
│           └── users.ts       # User list endpoint
├── client/
│   └── src/
│       ├── App.tsx            # Root component
│       ├── api.ts             # Fetch helper
│       ├── types.ts           # Client-side types
│       ├── hooks/
│       │   └── useEvent.ts    # Event data hook
│       └── components/
│           ├── EventPage.tsx   # Main page
│           ├── AttendeeList.tsx # Attendee/waitlist rendering
│           └── UserPicker.tsx  # User dropdown + join button
```

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/events` | List all events |
| GET | `/api/events/:id` | Get single event with attendees and waitlist |
| POST | `/api/events/:id/join` | Add user as attendee or to waitlist (body: `{ userId }`) |
| POST | `/api/events/:id/remove` | Remove user and auto-promote from waitlist (body: `{ userId }`) |
| GET | `/api/users` | List all available users |
| GET | `/api/health` | Health check |

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Express + TypeScript (tsx for dev)
- **Data:** In-memory (no database, no API keys, no external dependencies)
