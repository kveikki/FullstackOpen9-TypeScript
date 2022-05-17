import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log("Getting patients");
    res.send(patientService.getPatients());
});

export default router;