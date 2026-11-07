# TripSync Server

TripSync Server is the Express and MongoDB backend for a car-pooling application. It exposes REST endpoints for accounts, profiles, vehicles, rides, reviews, and administrative operations, and uses Socket.IO for chat and typing events.

This repository documents the behavior visible in the current source. Some endpoints and security controls need review before the application is run outside a trusted local environment; see [Security and known limitations](docs/security-and-known-limitations.md).

## Main capabilities

- Account registration, password login, OTP-related routes, profile and account updates
- Vehicle registration, details, document and photo upload, and vehicle management
- Ride publishing, search, requests, acceptance/rejection, cancellation, and payment-related operations
- Profiles, following, comments, replies, and likes
- Administrative user, vehicle, ride, dashboard, and review operations
- Socket.IO room join, message, and typing events

## Technology

- Node.js and Express 4
- MongoDB through Mongoose
- JWT authentication and bcrypt password hashing
- Socket.IO for chat events
- Multer for uploads
- Razorpay and Twilio packages are present in the dependencies

## Run locally

1. Install a compatible Node.js version and MongoDB access.
2. Install packages: `npm install`.
3. Create a `.env` file in the repository root. See [Local development setup](docs/development-setup.md) for variable names and current entrypoint details.
4. Start the development server with `npm start`.

The root health response is `GET /`. API route details are in [API reference](docs/api-reference.md), and the code structure is described in [Architecture](docs/architecture.md).

## Project structure

| Path | Purpose |
| --- | --- |
| `index.js` | Express app, route mounting, HTTP listeners, and Socket.IO initialization |
| `routes/` | HTTP route definitions and middleware wiring |
| `controller/` | Request handlers and application operations |
| `models/` | Mongoose schemas |
| `database/` | MongoDB connection setup |
| `middleware/` | JWT and blocked-account checks |
| `utils/` | Token helpers and Socket.IO chat module |
| `uploads/` | Locally stored uploaded files, also exposed under `/uploads` |
| `dist/client/` | Checked-in generated client build output |

## Documentation

- [Local development setup](docs/development-setup.md)
- [API reference](docs/api-reference.md)
- [Architecture](docs/architecture.md)
- [Security and known limitations](docs/security-and-known-limitations.md)

## Tests

There is no automated test suite in the repository at present. The `npm test` script is a placeholder that exits with an error.
