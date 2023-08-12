import { Credentials } from "../types";

export const processCredentials = (object: unknown): Credentials => {
    return object as Credentials;
};