import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});