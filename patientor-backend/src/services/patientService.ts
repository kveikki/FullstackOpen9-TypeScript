import data from '../../data/patients';
import { NonSensitivePatient } from '../types';

const getPatients = (): Array<NonSensitivePatient> => {
    return data.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

export default {
    getPatients
};