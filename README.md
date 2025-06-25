# Financial Control Front

A web dashboard for managing personal finances. The app communicates with the Financial Control API and provides screens for authentication, viewing financial dashboards, and CRUD management of expenses, income, cards, categories, types and objectives.

## Features

- Sign up and sign in forms with token storage
- Dashboard with charts summarizing spending and income
- Management screens for expenses, income, cards, categories, types and objectives
- Dark mode built with Tailwind CSS and Radix UI components

## Environment Variables

Create a `.env.local` file and define:

```
NEXT_PUBLIC_API_URL=<Financial Control API base URL>
```

This URL is used by Axios in `src/lib/axios.ts` to communicate with the backend.

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000.

## Build

Generate a production build with:

```bash
npm run build
```

Run the built app locally using:

```bash
npm start
```

## Deployment

The project is a standard Next.js application and can be deployed on platforms such as Vercel or any environment capable of running Node.js.
