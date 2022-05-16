import express from 'express';
const app = express();
import calculateBmi from './bmi';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
})

app.get('/bmi/', (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');

        const bmi = calculateBmi(height, weight);
        console.log(bmi)
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
})

const PORT = 3003;

app.listen (PORT, () => {
    console.log(`Server running on port ${PORT}`)
})