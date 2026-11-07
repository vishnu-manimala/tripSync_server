# Architecture

## Request flow

1. `index.js` creates the Express application, configures JSON and URL-encoded request parsing, cookies, and CORS, then mounts route modules.
2. Route modules map HTTP methods and paths to controllers. Most account, profile, ride, and user-facing vehicle routes apply JWT verification and a blocked-account check.
3. Controllers read or update Mongoose models and return HTTP responses.
4. `database/mongo.db.js` connects to the MongoDB URL in `DB_ATLAS_URL`.
5. Socket.IO is attached to the Express listener created from `PORT`; `utils/chatModule.js` handles chat room events and persists messages through the chat model.

## Source layout

```text
controller/   Request handlers and domain operations
database/     MongoDB connection
middleware/   JWT verification and blocked-account check
models/       Mongoose schemas for users, rides, vehicles, reviews, chats, and tokens
routes/       HTTP route declarations and middleware chains
utils/        Authentication helpers and Socket.IO chat logic
uploads/      Local uploaded files, statically exposed under /uploads
dist/client/  Generated client files checked into this repository
```

## Data model overview

- Users hold account details, profile media, verification flags, and follow relationships.
- Vehicles belong to users and store vehicle and verification information.
- Rides refer to a user and vehicle and include origin/destination, schedule, seats, settings, likes, ride requests, and payment identifiers.
- Reviews and chats have separate Mongoose models.
- Refresh-token records are represented by a JWT model.

See `models/` for the authoritative field definitions. This document intentionally avoids claiming an API schema beyond what those files and the route declarations establish.

## Authentication and real-time behavior

JWT checks are applied in the route declarations for most user-facing account, profile, vehicle, and ride operations. The admin router currently mounts handlers without JWT or role-check middleware. The review router is also mounted without authentication middleware. Socket.IO room and message events are accepted without socket authentication in the current chat module.

The `join` event joins the supplied room and creates a chat record when one is not found. The `message` event broadcasts the supplied user and message to that room and stores it. The `typing` event relays typing status to other room members.

These statements describe current code behavior, not a security recommendation. See [Security and known limitations](security-and-known-limitations.md) before deployment.
