import diagnosesData from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnose = (): Diagnose[] => {
    return diagnosesData;
};

export default {
    getDiagnose
};