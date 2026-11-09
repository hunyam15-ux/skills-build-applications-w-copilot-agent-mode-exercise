import express from 'express';
import { apiBaseUrl } from './config/api';
import { connectDatabase } from './config/database';
import apiRouter from './routes/api';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start the OctoFit Tracker API:', error);
  process.exitCode = 1;
});
