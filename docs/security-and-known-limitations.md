# Security and Known Limitations

This page records issues observed during a documentation review of the current repository. It is not a security certification. Address these items before deploying the server or using real user data.

## High priority

- **Hard-coded payment credential:** `controller/ride.controller.js` contains a Razorpay test key and secret in source. Remove the credential from source, rotate it in the payment dashboard, and load any required credentials from protected environment configuration. Do not reuse the current value.
- **Sensitive values printed to logs:** `utils/helper.functions.js` logs environment data including the Twilio authentication token. Remove this log and avoid printing credentials, database URLs, tokens, or personal data.
- **Admin routes have no route-level authorization:** `routes/admin.route.js` mounts administrative actions without JWT or role-check middleware. Enforce authentication and an administrator authorization check on every admin operation before deployment.
- **Socket.IO has no authentication or room authorization:** clients can join supplied rooms and submit messages under a supplied user value. Authenticate socket connections, authorize room membership, and validate message payloads.
- **Uploads are public and insufficiently constrained:** `uploads/` is exposed through Express static serving. Multer saves original filenames and no file type or size limits are configured in the route files. Add validation, random safe filenames, size limits, access control for private identity documents, and storage outside the public web root.
- **Uploaded images are committed to the repository:** inspect every tracked file under `uploads/` and confirm it is intended to be public. Remove private or unnecessary files from source control and rotate any credentials or personal data that has already been exposed.

## Other deployment concerns

- `index.js` starts the same Express app on a hard-coded port `3002` and again on `process.env.PORT`. The startup message always prints port `3001`, even if the configured port differs. Consolidate this to one HTTP server and attach Socket.IO to that server.
- CORS allows only `http://localhost:4200`. Configure allowed origins for each environment instead of using a fixed development origin.
- JWT middleware does not consistently return after a failed token verification before continuing its callback path. Review refresh-token handling, cookie flags, token rotation, and authorization behavior with tests.
- Review routes are mounted without authentication. Verify which actions should be public and enforce ownership/authorization for modifying or deleting another user's content.
- `npm test` is a placeholder that exits with an error; no automated tests are defined.
- The repository tracks generated `dist/client/` output and a Windows installer executable. Keep build artifacts and unrelated installers out of the application source repository unless there is a deliberate release process for them.
- Dependencies are from an older application baseline. Review versions and known vulnerabilities before deploying; do not upgrade blindly without regression coverage.

## Secret response

If any credential in this repository has ever been used against a live service, revoke or rotate it immediately. Removing a value from the latest commit does not remove it from Git history. Use a history rewrite only with a coordinated plan, and treat all prior copies as exposed.
