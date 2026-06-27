# Shiori-notes-app-frontend
https://shiori-notes-app-frontend.vercel.app/
# Shiori Notes — Frontend

A React-based frontend for the Shiori AI Notes app. Built with **React**, **Vite**, and **React Router DOM**. Connects to the Shiori Notes backend API for authentication and note management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (JavaScript) |
| Build Tool | Vite |
| Routing | React Router DOM |
| Styling | CSS (App.css, index.css) |
| HTTP | Fetch API / Axios (via backend calls) |

---

## Project Structure

```
notes-app/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint config
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx                # ReactDOM render root
    ├── App.jsx                 # Root component — defines all routes
    ├── App.css                 # Global app styles
    ├── index.css               # Base/reset styles
    ├── pages/
    │   └── mainGrid.jsx        # Main dashboard — displays all notes in a grid
    └── component/
        ├── loginCard.jsx       # Login form
        ├── signupCard.jsx      # Register form
        ├── forgotPassword.jsx  # Forgot password — enter email to get OTP
        ├── verifyOTP.jsx       # OTP verification form
        ├── notesCard.jsx       # Individual note card component
        └── newNote.jsx         # Create new note form
```

---

## Routes (React Router)

| Path | Component | Description |
|---|---|---|
| `/` | `LoginCard` | Login page — default landing |
| `/register` | `SignUpCard` | Registration page |
| `/forgotPassword` | `ForgotPasswordCard` | Enter email to receive OTP |
| `/verifyOTP` | `VerifyOtp` | Enter OTP to verify identity |
| `/landingPage` | `MainGrid` | Main notes dashboard (protected) |
| `/newNote` | `NewNote` | Create a new note |

---

## Installation & Running

```bash
# Navigate to the project folder
cd NotesAppFrontend/notes-app

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173` by default.

---

## Connecting to Backend

The frontend communicates with the backend running at `http://localhost:3000`.

Since JWT auth uses **httpOnly cookies**, all API requests must include:

```js
fetch('http://localhost:3000/notes/getNotes', {
  credentials: 'include',   // Required for cookies to be sent cross-origin
})
```

Make sure the backend has CORS configured to allow `http://localhost:5173` in production or development.

---

## User Flow

```
/ (Login)
  └──> /landingPage (Main notes grid)
         └──> /newNote (Create note)
         └──> Note card → view/edit/summarize

/ (Login)
  └──> /register (Sign up)

/ (Login)
  └──> /forgotPassword
         └──> /verifyOTP
                └──> / (back to login after reset)
```

---

## Pages & Components Overview

### `LoginCard`
- Inputs: `email`, `password`
- On submit: `POST /auth/login`
- On success: redirects to `/landingPage`
- Links to `/register` and `/forgotPassword`

### `SignUpCard`
- Inputs: `email`, `password`
- On submit: `POST /auth/register`
- On success: redirects to `/` (login)

### `ForgotPasswordCard`
- Input: `email`
- On submit: `POST /auth/forgotPassword` → triggers OTP email
- Redirects to `/verifyOTP`

### `VerifyOtp`
- Input: 6-digit OTP
- On submit: `POST /auth/verifyOTP`
- On success: allows password reset → redirects to `/`

### `MainGrid`
- Fetches all notes: `GET /notes/getNotes`
- Renders a grid of `NoteCard` components
- Contains a button to navigate to `/newNote`

### `NoteCard`
- Displays title + content preview of a single note
- Can trigger edit, delete, or summarize actions

### `NewNote`
- Inputs: `title`, `content`
- On submit: `POST /notes/sendNotes`
- On success: redirects back to `/landingPage`

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy this folder to **Vercel**, **Netlify**, or any static host.

---

## Notes

- Authentication relies on **httpOnly cookies** set by the backend — no tokens are stored in localStorage
- All protected pages should check for valid session and redirect to `/` if unauthenticated
- The app is currently set up for development — update the API base URL before deploying to production
