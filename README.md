# Lofi Chill

A lofi music web app with ambient sounds, animated backgrounds, and a Pomodoro timer.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **AWS S3 + CloudFront** — media assets (music, videos, images)
- **AWS Amplify** — app hosting via GitHub Actions

## Features

- 3 music moods: Chill, Jazzy, Sleepy (41 tracks total)
- 16 ambient noise layers (rain, fire, birds, keyboard, etc.)
- 42 animated background scenes with day / night / rainy variants
- Pomodoro timer with customizable sessions
- Draggable modal panels
- Persistent user preferences via `localStorage`

## Getting Started

```bash
yarn install
yarn start        # dev server at http://localhost:5173
```

## Commands

| Command | Description |
|---|---|
| `yarn start` | Start dev server |
| `yarn build` | Production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Run ESLint with auto-fix |
| `yarn format` | Format with Prettier |
| `yarn format:check` | Check formatting |

## Project Structure

```
src/
├── assets/
│   ├── icons/          # SVG icons (bundled)
│   ├── chill/          # URL exports → CloudFront
│   ├── jazzy/          # URL exports → CloudFront
│   ├── sleepy/         # URL exports → CloudFront
│   ├── noises/         # URL exports → CloudFront
│   ├── videos/         # URL exports → CloudFront
│   └── images/         # URL exports → CloudFront
│
├── component/
│   ├── Audio.tsx        # Music player controls
│   ├── Background.tsx   # Video background renderer
│   ├── Control.tsx      # Bottom control bar
│   ├── Navbar.tsx       # Side navigation bar
│   ├── NavbarSwitch.tsx # Navbar toggle
│   ├── menu/
│   │   ├── Focus.tsx    # Ambient noise mixer
│   │   ├── Mood.tsx     # Music mood selector
│   │   ├── MoodItem.tsx
│   │   ├── Set.tsx      # Background scene selector
│   │   ├── Menu.tsx
│   │   └── MenuItem.tsx
│   └── modal/
│       ├── Pomodoro.tsx     # Pomodoro timer
│       ├── SettingPomo.tsx  # Timer settings
│       ├── ChangeTime.tsx
│       ├── ItemModal.tsx
│       └── Button.tsx
│
├── constants/
│   ├── cdn.ts           # CloudFront base URL
│   ├── audio.ts
│   ├── colors.ts
│   ├── icon.ts
│   ├── noises.ts
│   ├── pomodoro.ts
│   ├── sets.ts
│   └── links/
│       ├── chill.ts     # CHILL_LINKS array
│       ├── jazzy.ts     # JAZZY_LINKS array
│       ├── sleepy.ts    # SLEEPY_LINKS array
│       ├── noises.ts    # NOISE_LINKS array
│       ├── videos.ts    # BACKGROUND_LINKS_LIST array
│       └── alarm.ts
│
├── context/
│   └── index.tsx        # Global state (React Context)
│
├── hooks/
│   ├── useAudioPlayer.ts
│   ├── useBackground.ts
│   ├── usePomodoro.ts
│   └── useUIState.ts
│
├── utils/
│   ├── handleAudio.ts
│   ├── newBackground.ts
│   └── timer.ts
│
├── types.ts             # Shared TypeScript types
└── App.tsx
```

## Deployment

Push to `main` triggers GitHub Actions:

1. Build → `dist/`
2. Sync `dist/` to S3 under `releases/<commit-sha>/`
3. Trigger Amplify deployment from that S3 prefix

Media assets (music, video, images) are hosted separately on **CloudFront** (`dc32dm88mobw7.cloudfront.net`) and are not part of the build.
