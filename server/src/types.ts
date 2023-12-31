export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticialRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge?: {
        date: string;
        criteria: string;
    }
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    username: string,
    password: string,
    email: string,
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export interface Doctor {
    id: string;
    username: string;
    password: string;
    name: string,
    patients: Array<Patient>;
}

export interface Credentials {
    username: string,
    password: string,
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NewPatient = Omit<Patient, 'id'>;
export type NewDoctor = Omit<Doctor, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;