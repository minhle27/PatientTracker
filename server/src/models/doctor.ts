import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { InferSchemaType } from "mongoose";

// define database schema
const doctorSchema = new mongoose.Schema({
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
  name: {
    type: String, 
    required: true
  },
  // list of patients that is managed by a doctor
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
});

type doctorSchemaInferType = InferSchemaType<typeof doctorSchema>;
const doctorModel = mongoose.model<doctorSchemaInferType>("Doctor", doctorSchema);

doctorSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique",
});

export default doctorModel;
