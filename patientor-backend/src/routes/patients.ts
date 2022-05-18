import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log("Getting patients");
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatient(req.params.id);
    console.log(patient);
    if (patient) res.send(patient);
    else res.status(404).send({});
});

router.post('/', (req, res) => {
    console.log('Saving patient');
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientService.addPatient(newPatient);
        res.send(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';

        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }

        console.log(errorMessage);
        res.status(400).send(errorMessage);
    }
});

export default router;