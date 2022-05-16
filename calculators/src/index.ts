import express from 'express';
import calculateBmi from './bmi';
import calculateExercises from './exercise';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi/', (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');

        const bmi = calculateBmi(height, weight);
        console.log(bmi);
        res.send({
            height: req.query.height,
            weight: req.query.weight,
            bmi
        });
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        console.log(errorMessage);
        res.send({
            error: errorMessage
        });
    }
});

app.post('/exercises/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const target: number = req.body.target;
        if (!target) throw new Error("parameters missing");
        if (isNaN(target)) throw new Error("malformatted parameters");

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const exercises: Array<number> = req.body.daily_exercises;
        if (!exercises) throw new Error("parameters missing");
        exercises.forEach(e => { if (!e || isNaN(e)) throw new Error("malformatted parameters"); });

        const result = calculateExercises(target, exercises);
        res.send(result);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        console.log(errorMessage);
        res.json({
            error: errorMessage
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});