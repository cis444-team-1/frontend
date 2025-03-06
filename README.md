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
