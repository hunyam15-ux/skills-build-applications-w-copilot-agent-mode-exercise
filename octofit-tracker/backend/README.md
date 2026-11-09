# OctoFit Tracker API

The Express API listens on port `8000` and connects to the `octofit_db`
MongoDB database.

## Run locally

Start MongoDB, then run the API from the repository root:

```bash
npm --prefix octofit-tracker/backend run dev
```

Without `CODESPACE_NAME`, the API base URL is `http://localhost:8000`. In
Codespaces, it is `https://$CODESPACE_NAME-8000.app.github.dev`.

## Check the API

```bash
curl http://localhost:8000/api/users
curl http://localhost:8000/api/activities
```

In Codespaces, replace `http://localhost:8000` with
`https://$CODESPACE_NAME-8000.app.github.dev`.
