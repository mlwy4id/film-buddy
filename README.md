# 🎬 Film Buddy

A film catalog web application built with Next.js. Users can browse films, write reviews, and manage watchlists. Admins can manage the film catalog including adding films with images and genres.

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + shadcn/ui
- **State Management** — Zustand
- **Server State** — TanStack Query (React Query)
- **HTTP Client** — Axios
- **Form Handling** — React Hook Form

## Features

### User
- Browse and search film catalog
- View film details with genres, synopsis, and rating
- Write reviews and ratings
- React to other reviews
- Manage personal film watchlist

### Admin
- Add, edit, and delete films
- Upload film images (multi-image support)
- Manage genres
- View paginated film list

## Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/mlwy4id/film-buddy.git
cd film-buddy
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://your-backend-url/api/v1
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin pages (films, genres)
│   ├── films/          # Film catalog pages
│   └── ...
├── components/         # Reusable UI components
├── lib/
│   ├── api/            # API functions (film, genre, etc.)
│   └── axios.ts        # Axios instance & interceptors
├── store/              # Zustand stores (auth, toast)
└── types/              # TypeScript type definitions
```

## API

This frontend connects to a REST API. Key endpoints used:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register account |
| POST | `/auth/login` | Login |
| GET | `/films` | Get all films |
| POST | `/films` | Create film (Admin) |
| GET | `/genres` | Get all genres |
| POST | `/reviews` | Create review |
| POST | `/reactions` | React to a review |
