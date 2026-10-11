# ZipFolio public site

The page visitors see. It shows one user's portfolio at
`<name>.zipfolio.xyz`. The site name is the first part of the address; the
content comes from the backend.

## What it uses

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- React Router
- GitHub Actions, Vercel

## How it works

1. It takes the first part of the address (`john` in `john.zipfolio.xyz`).
2. It asks the backend for that site (`GET /site/john`) and for the feature
   flags (`GET /flags`).
3. It draws the site: name, links, skills and one page per tab.

There are two designs. Template 1 shows the tabs across the top. Template 2
shows them in a side menu and is only used when the `template2` feature flag
is on and the user picked it. Otherwise the site uses Template 1.

## Run it locally

You need Node 20 and the backend running (see the backend README).

```bash
npm install
echo "VITE_API_URL_DEV=http://localhost:3000" > .env
npm run dev            # http://localhost:5173
```

In development the site name is fixed to `sing` (set in `src/App.tsx`), so the
database needs a user whose site name is `sing`.

Settings:

| Variable | Used when |
|---|---|
| `VITE_API_URL_DEV` | Running `npm run dev` |
| `VITE_API_URL_PROD` | Building for production; set in the Vercel project |

## Checks

```bash
npm run lint      # ESLint
npm run build     # type check (tsc) and production build
```

There are no automated tests in this repo, only lint and the build. The backend
has the tests.

## How it is checked and deployed

- **Every pull request:** GitHub Actions runs lint and the build. CodeQL scans
  the code.
- **Merge to `main`:** after those checks pass, GitHub Actions builds the site
  and deploys it to Vercel with the Vercel CLI. Vercel's own automatic deploys are
  turned off in `vercel.json`, so nothing reaches production without passing the checks.
- **`vercel.json`** also sends every path to `index.html`, which the single-page
  app needs.
- **`main` is protected:** changes go through a pull request, and the CI check
  must pass.
- **Dependabot** opens weekly pull requests for npm packages.

The deploy step needs three GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID` and
`VERCEL_PROJECT_ID`.

Live: `https://<name>.zipfolio.xyz`
