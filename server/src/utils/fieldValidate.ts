// import { NewPatient, Gender, EntryWithoutId, Diagnosis } from "../types";

// // Validate req body fields when adding new patient
// export const processNewPatient = (object: unknown): NewPatient => {
//     // type narrowing object paremeter (unknown -> object)
//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }

//     // now object parameter has type 'object'
//     if ('name' in object && 'dateOfBirth' in object 
//     && 'ssn' in object && 'gender' in object && 'occupation' in object) {
//         const newPatient: NewPatient = {
//             name: parseString(object.name, 'name'),
//             dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
//             ssn: parseString(object.ssn, 'ssn'),
//             gender: parseGender(object.gender),
//             occupation: parseString(object.occupation, 'occupation'),
//             entries: []
//         };
//         return newPatient;
//     }

//     throw new Error('Incorrect data: some fields are missing');
// };


// // Parse each field of the input object to verify that it is of desired type

// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//     return Boolean(Date.parse(date));
// };

// const isGender = (gender: string): gender is Gender => {
//     return Object.values(Gender).map(v => v.toString()).includes(gender);
// };

// const isNumber = (value: unknown): value is number => {
//     return typeof value === 'number';
// };


// const parseString = (value: unknown, what: string): string => {
//     if (!isString(value)) {
//         throw new Error(`Value of ${what} incorrect: ${value}`);
//     }
//     return value;
// };

// const parseDate = (value: unknown, what: string): string => {
//     if (!isString(value) || !isDate(value)) {
//         throw new Error(`Value of ${what} incorrect: ${value}`);
//     }
//     return value;
// };

// const parseGender = (gender: unknown): Gender => {
//     if (!isString(gender) || !isGender(gender)){
//         throw new Error(`Value of gender incorrect: ${gender}`);
//     }
//     return gender;
// };

// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
//     if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)){
//         return [] as Array<Diagnosis['code']>;
//     }
//     return object.diagnosisCodes as Array<Diagnosis['code']>;
// };

// const parseHealtCheckRating = (value: unknown, what: string): 0 | 1 | 2 | 3 => {
//     if (isNumber(value) && ( value === 0 || value === 1 || value === 2 || value === 3 ) ) {
//       return value;
//     }
//     throw new Error(`Value of ${what} incorrect: ${value}`);
// };

// type SickLeaveType = {
//     startDate: string;
//     endDate: string;
// };

// const parseSickLeave = (object: unknown): SickLeaveType | undefined => {
//     if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
//         return undefined;
//     }
//     const sickLeave = object.sickLeave;
//     if (!sickLeave || typeof sickLeave !== 'object' ) throw new Error('invalid sickLeave');
//     if (!('startDate' in sickLeave) || !isString(sickLeave.startDate) || !isDate(sickLeave.startDate))  {
//         throw new Error('sickLeave startDate missing or wrong type');
//     }
//     if (!('endDate' in sickLeave) || !isString(sickLeave.endDate) || !isDate(sickLeave.endDate))  {
//         throw new Error('sickLeave endDate missing or wrong type');
//     }

//     return {
//         startDate: sickLeave.startDate,
//         endDate: sickLeave.endDate
//     };
// };

// type DischargeType = {
//     date: string;
//     criteria: string;
// };

// const parseDischarge = (object: unknown): DischargeType | undefined => {
//     if (!object || typeof object !== 'object' || !('discharge' in object)){
//         return undefined;
//     }

//     const discharge = object.discharge;

//     if (!discharge || typeof discharge !== 'object' ) throw new Error('invalid discharge');

//     if (!('date' in discharge) || !isString(discharge.date) || !isDate(discharge.date))  {
//         throw new Error('discharge date missing or wrong type');
//     }

//     if (!('criteria' in discharge) || !isString(discharge.criteria)) {
//         throw new Error('discharge criteria missing or wrong type');
//     }

//     return {
//         date: discharge.date,
//         criteria: discharge.criteria
//     };
// };


// // Validate req body fields when adding new entry of a patient
// export const processNewEntry = (object: unknown): EntryWithoutId => {
//     if (!object || typeof object !== 'object') {
//         throw new Error('Incorrect or missing data');
//     }

//     if (!('type' in object)) throw new Error('type missing');
//     if (!('date' in object)) throw new Error('date missing');
//     if (!('specialist' in object)) throw new Error('specialist missing');
//     if (!('description' in object)) throw new Error('description missing');

//     const basicEntry = {
//         date: parseDate(object.date, 'date'),
//         specialist: parseString(object.specialist, 'specialist'),
//         description: parseString(object.description, 'description'),
//         diagnosisCodes: parseDiagnosisCodes(object)
//     };
//     switch (object.type) {
//         case 'HealthCheck': {
//             if (!('healthCheckRating' in object)) throw new Error('healthCheckRating missing');
//             return {
//                 ...basicEntry,
//                 type: 'HealthCheck',
//                 healthCheckRating: parseHealtCheckRating(object.healthCheckRating, 'healthCheckRating')
//             };
//         }

//         case 'OccupationalHealthcare': {
//             if (!('employerName' in object)) throw new Error('employerName missing');
//             return {
//                 ...basicEntry,
//                 type: 'OccupationalHealthcare',
//                 employerName: parseString(object.employerName, 'employerName'),
//                 sickLeave: parseSickLeave(object)
//             };
//         }

//         case 'Hospital': {
//             return {
//                 ...basicEntry,
//                 type: 'Hospital',
//                 discharge: parseDischarge(object)
//             };
//         }

//         default:
//             throw new Error(`Incorrect type: ${object.type}`);
//     }
// };