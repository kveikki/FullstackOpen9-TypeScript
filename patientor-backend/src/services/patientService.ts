import data from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { NewPatient, Patient, NonSensitivePatient } from '../types';


let patients: Array<Patient> = data;

const getPatients = (): Array<NonSensitivePatient> => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (newPatient: NewPatient): Patient => {

    const id = uuid();

    const patient: Patient = {
        id: id,
        ...newPatient
    };
    console.log(patient);
    
    patients = patients.concat(patient);
    return patient;
};

export default {
    getPatients,
    addPatient
};