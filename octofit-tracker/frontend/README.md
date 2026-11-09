# OctoFit Tracker frontend

The React 19 presentation layer uses Vite and React Router. Start the API on
port `8000` and MongoDB before launching the frontend.

## Configure the API URL

In Codespaces, create `octofit-tracker/frontend/.env.local` and set your
Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes this value through `import.meta.env.VITE_CODESPACE_NAME` and
builds the API URL as
`https://your-codespace-name-8000.app.github.dev`. Restart the Vite server
after changing `.env.local`.

If `VITE_CODESPACE_NAME` is not set, the frontend uses
`http://localhost:8000`, so no environment file is needed for local
development.

## Run and build

Run these commands from the repository root:

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
```
