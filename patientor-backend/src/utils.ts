import { NewPatient, Gender, Entry, EntryType, NewEntry, Diagnosis, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseStringField = (text: unknown, errorMessage: string): string => {
    if (!text || !isString(text)) {
        throw new Error(errorMessage + `: ${text}`);
    }
    return text;
};

const isGender = (param: unknown): param is Gender => {
    return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${gender}`);
    }
    return gender;
};

const parseEntries = (entries: unknown): Array<Entry> => {
    if (!Array.isArray(entries)) {
        throw new Error(`Entries is not an array: ${entries}`);
    }

    entries.forEach(entry => {
        if (typeof entry != "object") {
            throw new Error(`Entries' member is not an object: ${entry}`);
        }

        if (!('type' in entry)) {
            throw new Error(`Entries' member has no type field: ${(JSON.stringify(entry))}`);
        }

        if (!entry.type || !(Object.values(EntryType).includes(entry.type as EntryType))) {
            throw new Error(`Entries' member has an invalid type: ${entry.type}`);
        }
    });
    return entries as Array<Entry>;
};

const parseDiagnosisCodes = (newCodes: unknown): Array<Diagnosis['code']> => {
    if(!newCodes || !Array.isArray(newCodes)){
        throw new Error(`Entry's diagnosis codes isn't an array: ${JSON.stringify(newCodes)}`);
    }
    const parsedCodes: Array<Diagnosis['code']> = newCodes.map(
        value => parseStringField(value, "Member of diagnosis codes is not a string")
    );

    return  parsedCodes;
};

const parseHealthCheckRatingField = (rating: unknown):HealthCheckRating => {
    if(typeof rating != "number") {
        throw new Error(`Entry's health check rating is not a number: ${rating}`);
    }

    if (!(Object.values(HealthCheckRating).includes(rating as HealthCheckRating))){
        throw new Error(`Entry's health check rating has an invalid value: ${rating}`);
    }

    return rating as HealthCheckRating;
};
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any)
    : NewPatient => {
    const newPatient: NewPatient = {
        name: parseStringField(object.name, "Incorrect or missing name"),
        dateOfBirth: parseStringField(object.dateOfBirth, "Incorrect or missing date of birth"),
        ssn: parseStringField(object.ssn, "Incorrect or missing social security number"),
        gender: parseGender(object.gender),
        occupation: parseStringField(object.occupation, "Incorrect or missing occupation"),
        entries: parseEntries(object.entries)
    };

    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
    if (typeof object != "object") throw new Error(`New entry is not an object: ${toNewPatient}`);

    if (!("type" in object)) throw new Error(`New entry has no type field: ${JSON.stringify(object)}`);

    if (!object.type || !(Object.values(EntryType).includes(object.type as EntryType))) throw new Error(`Entry's type is not valid: ${object.type}`);

    switch(object.type){
        case "Hospital": return toHospitalEntry(object);
        case "OccupationalHealthCare": return toOccupationalHealthCareEntry(object);
        case "HealthCheck": return toHealthCheckEntry(object);
        default:
            throw new Error(`Entry type not implemented: ${object.type}`);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHospitalEntry = (entry: any): NewEntry => {
    if (!("discharge" in entry)) throw new Error("Missing discharge field");

    const hospitalEntry: NewEntry = {
        type: EntryType.Hospital,
        description: parseStringField(entry.description, "Incorrect or missing description"),
        date: parseStringField(entry.date, "Incorrect or missing date"),
        specialist: parseStringField(entry.specialist, "Incorrect or missing specialist"),
        discharge: {
            date: parseStringField(entry.discharge.date, "Incorrect or missing stardate in discharge"),
            criteria: parseStringField(entry.discharge.criteria, "Incorrect or missing criteria in discharge"),
        }
    };

    if ("diagnosisCodes" in entry){
        hospitalEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }

    return hospitalEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toOccupationalHealthCareEntry = (entry: any): NewEntry => {
    const occupationalHealthCareEntry: NewEntry = {
        type: EntryType.OccupationalHealthCare,
        description: parseStringField(entry.description, "Incorrect or missing description"),
        date: parseStringField(entry.date, "Incorrect or missing date"),
        specialist: parseStringField(entry.specialist, "Incorrect or missing specialist"),
        employerName: parseStringField(entry.employerName, "Incorrect or missing employer name")
    };
    
    if("sickLeave" in entry){
        occupationalHealthCareEntry.sickLeave = {
            startDate: parseStringField(entry.sickLeave.startDate, "Incorrect or missing startDate in sickLeave"),
            endDate: parseStringField(entry.sickLeave.endDate, "Incorrect or missing endDate in sickleave")
        };
    }

    if ("diagnosisCodes" in entry){
        occupationalHealthCareEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }

    return occupationalHealthCareEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toHealthCheckEntry = (entry: any): NewEntry => {
    const healthCheckEntry: NewEntry = {
        type: EntryType.HealthCheck,
        description: parseStringField(entry.description, "Incorrect or missing description"),
        date: parseStringField(entry.date, "Incorrect or missing date"),
        specialist: parseStringField(entry.specialist, "Incorrect or missing specialist"),
        healthCheckRating: parseHealthCheckRatingField(entry.healthCheckRating)
    };
    if ("diagnosisCodes" in entry){
        healthCheckEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
    }

    return healthCheckEntry;
};