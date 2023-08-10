import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const doctorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Required"],
    minlength: [6, "Must be at least 6 characters"],
    maxlength: [20, "Must be less than 20 characters"],
    unique: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Required"],
    minlength: [8, "Must be 8 characters at least"],
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

doctorSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique",
});

export default Doctor;
