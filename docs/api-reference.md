# API Reference

This is an inventory of the routes declared in `routes/`. It lists paths and middleware behavior from source; request and response schemas should be confirmed in the corresponding controller before building a client integration.

Use the server origin configured for your environment, for example `http://localhost:3001`. All route paths below are relative to that origin. The root health endpoint is `GET /`.

## Authentication

These routes are mounted at `/auth` and have no JWT middleware in the route declarations.

| Method | Path | Handler |
| --- | --- | --- |
| POST | `/auth/register` | Register |
| POST | `/auth/password_login` | Password login |
| POST | `/auth/send_otp` | Send OTP |
| POST | `/auth/verify_otp` | Verify OTP |
| POST | `/auth/reset_password` | Reset password |
| GET | `/auth/chatroom` | Chat room lookup |

## Accounts

Mounted at `/accounts`. Each route uses JWT verification and blocked-account checking.

| Method | Path | Handler |
| --- | --- | --- |
| PATCH | `/accounts/updateName` | Update name |
| POST | `/accounts/saveProfilephoto` | Save profile photo; multipart field `file` |
| POST | `/accounts/saveIdPhotos` | Save ID photos; multipart field `files` |
| POST | `/accounts/saveLicensePhotos` | Save licence photos; multipart field `files` |
| GET | `/accounts/getUserData` | Get user data |

## Profiles

Mounted at `/profile`. Each route uses JWT verification and blocked-account checking.

| Method | Path | Handler |
| --- | --- | --- |
| GET | `/profile/getProfileData` | Get profile data |
| PATCH | `/profile/followProfile` | Follow a profile |
| PATCH | `/profile/unfollowProfile` | Unfollow a profile |

## Vehicles

Mounted at `/vehicle`. The routes below generally use JWT verification and blocked-account checking. The final administrative vehicle routes use JWT verification only; the router does not add a role/administrator check.

| Method | Path | Handler |
| --- | --- | --- |
| GET | `/vehicle/get.vehicles.info` | Get vehicle list (declared twice) |
| POST | `/vehicle/add.vehicle` | Add vehicle |
| GET | `/vehicle/vehicle.types` | Get vehicle types |
| POST | `/vehicle/save.vehicle` | Save vehicle |
| POST | `/vehicle/save.registration.data` | Save registration data |
| POST | `/vehicle/save.insurance.data` | Save insurance data |
| POST | `/vehicle/save.vehicle.photos` | Save vehicle photos; multipart field `files` |
| GET | `/vehicle/get.vehicle.info` | Get vehicle info |
| DELETE | `/vehicle/delete` | Delete vehicle |
| PATCH | `/vehicle/update.vehicle` | Update vehicle |
| PATCH | `/vehicle/update.registration` | Update registration |
| PATCH | `/vehicle/update.insurance` | Update insurance |
| PATCH | `/vehicle/update.image` | Update images; multipart field `files` |
| POST | `/vehicle/delete.image` | Delete image; multipart field `files` |
| GET | `/vehicle/get.pages` | Get vehicle pages |
| GET | `/vehicle/getVehicles` | Get vehicles |
| GET | `/vehicle/get.vehicle.list` | Get single vehicle info (JWT only) |
| GET | `/vehicle/block.vehicle` | Block vehicle (JWT only) |
| GET | `/vehicle/unBlock.vehicle` | Unblock vehicle (JWT only) |
| GET | `/vehicle/verify.vehicle` | Verify vehicle (JWT only) |
| DELETE | `/vehicle/cancelPublishing` | Cancel publishing (JWT only) |

## Rides

Mounted at `/ride`. Every declared route uses JWT verification and blocked-account checking.

| Method | Path | Handler |
| --- | --- | --- |
| GET | `/ride/getAllPublishedRides` | List published rides |
| GET | `/ride/getPublishedRide` | Get published ride |
| POST | `/ride/saveRideBasic` | Save basic ride details |
| POST | `/ride/saveRideRoute` | Save route details |
| POST | `/ride/saveRideVehicle` | Save ride vehicle |
| POST | `/ride/saveRideSettings` | Save contact options |
| POST | `/ride/saveRideRPayments` | Save ride payment settings |
| POST | `/ride/getSearchedRide` | Search rides |
| GET | `/ride/get.pages` | Get ride pages |
| PATCH | `/ride/requestRide` | Request a ride |
| PATCH | `/ride/cancelRideRequest` | Cancel a ride request |
| GET | `/ride/getRide` | Get ride |
| POST | `/ride/get.rideRequestedUser` | Get users who requested a ride |
| PATCH | `/ride/acceptRequest` | Accept a request |
| PATCH | `/ride/rejectRequest` | Reject a request |
| PATCH | `/ride/cancelRequest` | Cancel a ride request |
| POST | `/ride/createOrder` | Create payment order |
| PATCH | `/ride/savePayment` | Save payment result |
| DELETE | `/ride/deleteUnfinishedRide` | Delete unfinished ride |
| PATCH | `/ride/deleteRide` | Soft-delete ride |
| GET | `/ride/getRideData` | Get ride data |
| PATCH | `/ride/rideLike` | Like a ride |

## Administration

Mounted at `/admin`. **No JWT or administrator-role middleware is applied by this router in the current source.** Do not expose these endpoints until authorization is enforced server-side.

| Method | Path | Handler |
| --- | --- | --- |
| GET | `/admin/getAdminData` | Admin dashboard data |
| GET | `/admin/getPages` | Page data |
| GET | `/admin/users` | List users |
| PATCH | `/admin/block` | Block user |
| PATCH | `/admin/verify` | Verify user |
| PATCH | `/admin/verifyUser` | Verify user credential |
| PATCH | `/admin/unBlock` | Unblock user |
| GET | `/admin/get.user.pages` | User page counts |
| GET | `/admin/getFullVehicleList` | List vehicles |
| PATCH | `/admin/unblock.vehicles` | Unblock vehicles |
| PATCH | `/admin/block.vehicles` | Block vehicles |
| PATCH | `/admin/verify.vehicles` | Verify vehicles |
| GET | `/admin/get.pages` | Vehicle page counts |
| GET | `/admin/getRideList` | List rides |
| PATCH | `/admin/blockRide` | Block ride |
| PATCH | `/admin/unBlockRide` | Unblock ride |
| GET | `/admin/getHomeData` | Home dashboard data |
| GET | `/admin/getReviews` | List reviews |

## Reviews

Mounted at `/review`. These routes have no authentication middleware in the route declarations.

| Method | Path | Handler |
| --- | --- | --- |
| POST | `/review/saveComment` | Save comment |
| PATCH | `/review/reviewLike` | Like review |
| PATCH | `/review/replyLike` | Like reply |
| PATCH | `/review/saveReply` | Save reply |
| DELETE | `/review/deleteReview` | Delete review |
| DELETE | `/review/deleteReply` | Delete reply |

## Socket.IO events

Socket.IO is attached to the HTTP server created from `PORT`. The current server accepts these events without socket authentication:

| Incoming event | Data shape used by source | Server behavior |
| --- | --- | --- |
| `join` | `{ room }` | Joins the room and creates a chat record if not found |
| `message` | `{ room, user, message }` | Emits `new message` to the room and stores it |
| `typing` | Room-bearing data | Emits `typing` to other room members |

The exact expected data contracts, validation, and authorization should be confirmed and formalized before external clients depend on them.
