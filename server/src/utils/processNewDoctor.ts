import { NewDoctor } from "../types";

export const processNewDoctor = (object: unknown): NewDoctor => {
    return object as NewDoctor;
};