# Local Development Setup

## Prerequisites

- Node.js and npm. The repository does not declare a supported Node.js version; use a version compatible with the dependencies in `package-lock.json`.
- A MongoDB database URL.

## Install and start

```sh
npm install
npm start
```

`npm start` runs `nodemon index.js`, so the process restarts when watched files change. The source has no working automated test command; `npm test` is only a placeholder.

## Environment variables used by the source

Create a `.env` file in the repository root and keep real values out of Git:

```dotenv
PORT=3001
DB_ATLAS_URL=mongodb+srv://<username>:<password>@<cluster>/<database>
PRIVATE_KEY=<long-random-secret>
AccountSID=<Twilio-account-sid>
AuthToken=<Twilio-auth-token>
```

- `PORT` is used by one Express listener. The entrypoint also creates a second listener on hard-coded port `3002`; see the security and known-limitations document.
- `DB_ATLAS_URL` is used by the Mongoose connection.
- `PRIVATE_KEY` signs and verifies JWTs and refresh tokens.
- `AccountSID` and `AuthToken` are read by the Twilio helper. OTP delivery is currently commented out in the auth controller, so verify the current flow before configuring or relying on SMS.

Do not copy real credentials into this file in a public commit. `.env` is listed in `.gitignore`.

## Local frontend connection

The Express CORS and Socket.IO settings currently allow `http://localhost:4200`. The API port is read from `PORT`, while the startup log prints `http://localhost:3001` regardless of the configured value. Confirm the actual listening port and update the frontend API URL to match.

## Root endpoint

When the Express app is reachable, `GET /` responds with `API is running...`. The endpoint does not confirm that MongoDB or external services are healthy.

## Uploads

Uploaded files are written to the repository's `uploads/` directory and served from `/uploads`. Do not upload identity, driving licence, or other private documents to a publicly accessible deployment without first adding access control and storage safeguards. Check the existing tracked files in `uploads/` before publishing or sharing a build.
