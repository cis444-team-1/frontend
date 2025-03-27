<img width="1724" alt="image" src="https://github.com/user-attachments/assets/09129109-33e0-457d-81de-f1189ac0941e" />

# Melo - Music Streaming App

This repository holds the frontend for the music streaming app, Melo.

## Features

- Create user accounts with credentials or OAuth authentication
- Upload, Edit, and Share music
- Create, Edit, and Share playlists
- Search for new music, albums, artists, and public playlists
- Uses the MediaSession API to handle audio
- Has keyboard event handlers to skip, replay, pause, or play music in a playlist
- Users dashboard for admin users

# Tech stack explained

Melo is built with,
- react
- typescript
- vite
- react-router
- react-query

> [!NOTE]
> This is a client-side only application, for our server-side code and REST api, check out our backend repository

# CIS444 Related Information

All of CSS has been validated with the CSS validator checker (https://validator.w3.org/)

The validation for HTML is a bit tricky since we are not using pure HTML in our files, so it is not possible to directly validate .tsx files with the validator.

However, we do have a testing framework setup with Vitest and Jest, allowing us to create unit tests for our react components to ensure the validity of our HTML.

# File structure

```
.
├── public
├── src/
│   ├── api
│   ├── components/
│   │   ├── button/
│   │   │   ├── button.tsx        # Reusable component
│   │   │   └── button.module.css # Styles for component
│   │   └── ...more
│   ├── context
│   ├── hooks
│   ├── lib
│   ├── features/
│   │   ├── home/
│   │   │   ├── components
│   │   │   ├── styles/
│   │   │   │   └── page.module.css
│   │   │   ├── tests
│   │   │   └── page.tsx
│   │   └── ...more
│   ├── supabase # Supabase auth client
│   ├── types/
│   │   ├── song.ts
│   │   ├── user.ts
│   │   └── ...more
│   ├── index.css    # Global CSS classes and variables
│   └── main.tsx     # Root react DOM
├── .env
├── index.html       # Root html document
└── readme.md
```


# Installation for Local Development
Here's a markdown guide for installing, setting up, and running a Vite React project with `.env` variables.  

This guide walks you through setting up the Vite + React project, configuring environment variables, and running the development server.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the project

   ```sh
   git clone https://github.com/cis444-team-1/frontend
   ```

2. Create a new branch

   ```sh
   git checkout -b new-branch
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

## Environment Variables

This app uses environment variables defined in `.env` files.

1. Create a `.env` file in the root of your project:

   ```sh
   touch .env
   ```

2. Add variables prefixed with `VITE_`:

   ```env
   VITE_SUPABASE_URL=redacted
   VITE_SUPABASE_ANON_KEY=123
   VITE_FRONTEND_URL=http://localhost:5173
   VITE_BACKEND_URL=http://localhost:8080
   PROJECT_REF=redacted
   ```

## Running the Development Server

Start the Vite development server with:

```sh
npm run dev
```

This will start the server and provide a local development URL.

## Building for Production

To create an optimized production build, run:

```sh
npm run build
```

## Running the Production Build Locally

To preview the production build locally:

```sh
npm run preview
```

## Additional Notes

- `.env` files are **not committed** to version control by default. Add `.env` to `.gitignore` to keep secrets safe.
- Use `.env.development` and `.env.production` for environment-specific settings.

---

Now you're ready to build!
