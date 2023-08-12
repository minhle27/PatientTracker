import { NewPatient } from "../types";

export const processNewPatient = (object: unknown): NewPatient => {
    return object as NewPatient;
};