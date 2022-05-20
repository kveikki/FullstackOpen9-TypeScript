import data from '../../data/patients';
import { v4 as uuid } from 'uuid';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';


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

const addEntry = (patient: Patient, newEntry: NewEntry): Entry => {
    const id = uuid();

    const entry: Entry = {
        id: id,
        ...newEntry
    };
    console.log(entry);

    patient.entries = patient.entries.concat(entry);
    return entry;
};

export default {
    getPatients,
    getPatient,
    addPatient,
    addEntry
};