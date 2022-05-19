import { NewPatient, Gender, Entry, EntryType } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseField = (text: unknown, errorMessage: string): string => {
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
    if (!Array.isArray(entries)){
        throw new Error(`Entries is not an array: ${entries}`);
    }

    entries.forEach(entry => {
        if (typeof entry != "object"){
            throw new Error(`Entries' member is not an object: ${entry}`);
        }

        if (!('type' in entry)) {
            throw new Error(`Entries' member has no type field: ${(JSON.stringify(entry))}`);
        }

        if (!entry.type || !(Object.values(EntryType).includes(entry.type as EntryType))){
            throw new Error(`Entries' member has an invalid type: ${entry.type}`);
        }
    });
    return entries as Array<Entry>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any)
    : NewPatient => {
    const newPatient: NewPatient = {
        name: parseField(object.name, "Incorrect or missing name"),
        dateOfBirth: parseField(object.dateOfBirth, "Incorrect or missing date of birth"),
        ssn: parseField(object.ssn, "Incorrect or missing social security number"),
        gender: parseGender(object.gender),
        occupation: parseField(object.occupation, "Incorrect or missing occupation"),
        entries: parseEntries(object.entries)
    };

    return newPatient;
};