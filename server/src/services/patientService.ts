import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatient, NonSensitivePatient, EntryWithoutId } from '../types';

const getPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patientData.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, newEntry: EntryWithoutId): Patient | undefined => {
    const patient = patientData.find(p => p.id === patientId);
    console.log(newEntry);

    if (patient) {
        patient.entries = patient.entries.concat({...newEntry, id: uuid()});
    }
    
    return patient;
};

const findByID = ( id: string ): Patient | undefined => {
    const patient = patientData.find(patient => patient.id === id);
    return patient;
};

export default {
    getPatients,
    addPatient,
    findByID,
    addEntry
};