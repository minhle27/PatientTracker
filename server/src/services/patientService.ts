import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatient } from '../types';
import { NonSensitivePatient } from '../types';

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

const findByID = ( id: string ): Patient | undefined => {
    const patient = patientData.find(patient => patient.id === id);
    return patient;
};

export default {
    getPatients,
    addPatient,
    findByID
};