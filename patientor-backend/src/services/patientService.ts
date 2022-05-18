import data from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { NewPatient, Patient, PublicPatient } from '../types';


let patients: Array<Patient> = data;

const getPatients = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
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
    getPatient,
    addPatient
};