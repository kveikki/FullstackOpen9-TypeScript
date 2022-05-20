export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type Entry =
    | HealthCheckEntry
    | HospitalEntry
    | OccupationalHealthCareEntry;

interface BaseEntry {
    id: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis['code']>
    type: EntryType
}

export enum EntryType {
    HealthCheck = "HealthCheck",
    Hospital = "Hospital",
    OccupationalHealthCare = "OccupationalHealthCare"
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck,
    healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}


export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital,
    discharge: {
        date: string,
        criteria: string
    }
}

export interface OccupationalHealthCareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthCare,
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;