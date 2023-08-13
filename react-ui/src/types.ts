export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  username: string;
  password: string;
  email: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[];
}

export interface Doctor {
  id: string;
  username: string;
  password: string;
  name: string;
  patients: Array<Patient>;
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type NewEntry = UnionOmit<Entry, "id">;

export type EntryFormValues = {
  type: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
  description: string;
  date: string;
  specialist: string;
  rating: string;
  diagnosisCodes: string[];
  dischargeDate: string;
  dischargeCriteria: string;
  employerName: string;
  sickLeaveStart: string;
  sickLeaveEnd: string;
};

export type PatientFormValues = Omit<Patient, "id" | "entries">;
