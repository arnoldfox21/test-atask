# ATASK GitHub User Explorer

A simple Next.js application to search for GitHub users and view their repositories. Built with React, TypeScript, React Query, and Tailwind CSS.

## Features

- Search for GitHub users by username
- View a list of matching users
- Expand a user to see their public repositories and star counts
- Responsive and clean UI

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## Getting Started

1. **Install dependencies:**
   ```sh
   yarn
   ```

2. **Run the development server:**
   ```sh
   yarn dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Testing

Run unit tests with:

```sh
yarn test
```

## Project Structure

- `pages/` — Next.js pages (including API routes)
- `components/` — Reusable React components
- `services/` — Data fetching hooks using React Query
- `utils/` — Utility functions (e.g., API request wrapper)
- `styles/` — Global styles (Tailwind CSS)
- `__test__/` — Unit tests

## License

MIT