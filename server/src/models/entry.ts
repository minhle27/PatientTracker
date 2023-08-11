import mongoose from "mongoose";
import { Diagnosis, HealthCheckRating } from "../types";

const entrySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    description: {
        type: String,
        required: [true, 'Required'],
    },
    date: {
        type: String,
        required: [true, 'Required'],
    },
    specialist: {
        type: String,
        required: [true, 'Required'],
    },
    diagnosisCodes: {
        type: Array<Diagnosis['code']>,
    },
    type: {
        type: String,
        required: [true, 'Required'],
    },
    healthCheckRating: HealthCheckRating,
    employerName: String,
    sickLeave: {
        startDate: String,
        endDate: String,
    },
    discharge: {
        date: String,
        criteria: String
    }
});

const entryModel = mongoose.model('Entry', entrySchema);
export default entryModel;