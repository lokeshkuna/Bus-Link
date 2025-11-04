## Bus Navigation User Reviews

A Node.js/Express web app for bus information, navigation, and user reviews. It uses EJS for server‑rendered views, MongoDB via Mongoose for persistence, and session/cookie utilities for auth flows with admin and moderator roles.

### Features
- User signup/login and session/cookie handling
- Browse bus info and submit reviews/suggestions
- Admin and moderator dashboards for managing users, buses, and reviews
- EJS views with static assets served from `public` and `views`

### Tech Stack
- **Backend**: Node.js, Express, EJS, express‑session, cookie‑parser
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT), bcrypt

### Project Structure
- `server/` – Express app, routes, controllers, models, DB connection
  - `server/index.js` – App bootstrap, middleware, static, route mounting
  - `server/routes/` – Route modules (auth, home, admin, moderator, bus, reviews)
  - `server/controllers/` – Request handlers for each domain
  - `server/models/` – Mongoose schemas (users, buses, reviews, suggestions, etc.)
  - `server/DB/connect.js` – Mongo connection helper
- `views/` – EJS templates and CSS/JS used by views
- `public/` – Static assets (images, CSS/JS, HTML landing pages)
- `middleware/` – Auth/role middleware

### Prerequisites
- Node.js 18+ and npm
- MongoDB database/connection string

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root with:
   ```bash
   mongo_url="YOUR_MONGODB_CONNECTION_STRING"
   PORT=3000
   ```
   Notes:
   - The app reads `mongo_url` (lowercase) and falls back to a hardcoded URI if not set. Always set your own.
   - `PORT` defaults to 3000 if omitted.
3. Start the server (development):
   ```bash
   npm run dev
   ```
   Or production:
   ```bash
   npm start
   ```
4. Open the app:
   - Server runs at `http://localhost:3000` (or your `PORT`).
   - Static files are served from `public/` and `views/`.

### Available Scripts
- `npm run dev` – Start with nodemon (`server/index.js`)
- `npm start` – Start with Node (`server/index.js`)

### Key Routes (mounted in `server/routes/index.js`)
- Auth and landing: `signup-login.js`, `authRoutes.js`
- Home: `home.js`
- Admin: `adminRoutes.js`
- Moderator: `modRoutes.js`
- Bus info: `busInfo.js`, `apiBus.js`
- Reviews: `reviewRoutes.js`

### Environment Variables
- **mongo_url**: MongoDB connection string (required)
- **PORT**: Server port (default: 3000)
- **ADMIN_JWT_SECRET**: Secret key for admin JWT signing/verification
- **MOD_JWT_SECRET**: Secret key for moderator JWT signing/verification

### Security Notes
- Do not commit your `.env` or any credentials.
- The code contains a fallback MongoDB URI; override it with `mongo_url` in `.env`.

### License
ISC


