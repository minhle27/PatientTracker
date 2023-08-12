import mongoose from "mongoose";

import uniqueValidator from "mongoose-unique-validator";
import { InferSchemaType } from "mongoose";

const patientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Required"],
    minlength: [6, "Must be at least 6 characters"],
    maxlength: [20, "Must be less than 20 characters"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Required"],
    minlength: [8, "Must be 8 characters at least"],
  },
  // id of doctor that manages this patient
  doctorId: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Required"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "Required"],
  },
  ssn: {
    type: String,
    required: [true, "Required"],
  },
  gender: {
    type: String,
    required: [true, "Required"],
  },
  occupation: {
    type: String,
    required: [true, "Required"],
  },
  email: {
    type: String,
    required: [true, "Required"]
  },
  entries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry",
    },
  ],
});

type patientSchemaInferType = InferSchemaType<typeof patientSchema>;
patientSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique",
});

const patientModel = mongoose.model<patientSchemaInferType>("Patient", patientSchema);

export default patientModel;
