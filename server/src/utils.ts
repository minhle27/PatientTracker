import { NewPatient, Gender } from "./types";

const processNewPatient = (object: unknown): NewPatient => {
    // type narrowing object paremeter (unknown -> object)
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    // now object parameter has type 'object'
    if ('name' in object && 'dateOfBirth' in object 
    && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};


// Parse each field of the input object to verify that it is of desired type

// name field Parser
const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// dateOfBirth field Parser
const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// ssn field Parser
const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)){
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

// gender field Parser
const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

// occupation field Parser
const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)){
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

export default processNewPatient;