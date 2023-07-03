import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnose = (): Diagnosis[] => {
    return diagnosesData;
};

export default {
    getDiagnose
};