import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctor";
import { processNewDoctor } from "../utils/processNewDoctor";
import { processNewPatient } from "../utils/processNewPatient";
import { processCredentials } from "../utils/processCredentials";
import patientModel from "../models/patient";
import { Request, Response } from "express";

const authController = {
  //-----------------------------------------RESGISTER----------------------------------------------

  // Register Doctor
  registerDoctor: async (req: Request, res: Response) => {
    try {
      // process req body and return a standard doctor object
      const doctor = processNewDoctor(req.body);
      const { username, password, name } = doctor;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newDoctor = new doctorModel({
        username,
        password: passwordHash,
        name,
      });

      // save new doctor to database
      const savedDoctor = await newDoctor.save();
      // send saveDoctor as response
      return res.status(200).json(savedDoctor);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong: ";
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  },

  // Register Patient
  registerPatient: async (req: Request, res: Response) => {
    try {
      // process req body and return a standard doctor object
      const patient = processNewPatient(req.body);
      const {
        username,
        password,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        email,
      } = patient;

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newPatient = new patientModel({
        username,
        password: passwordHash,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        email,
      });

      const savedPatient = await newPatient.save();

      return res.status(200).json(savedPatient);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong: ";
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  },
  //-------------------------------------------------------------------------------------------

  //-----------------------------------------LOGIN----------------------------------------------
  loginDoctor: async (req: Request, res: Response) => {
    try {
      const { username, password } = processCredentials(req.body);

      const doctor = await doctorModel.findOne({ username });
      if (!doctor?.password) {
        return res.status(401).json({ error: "invalid username or password" });
      }
      const passwordCorrect =
        doctor === null
          ? false
          : await bcrypt.compare(password, doctor.password);

      if (!(doctor && passwordCorrect)) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }

      // Create token
      const userForToken = {
        username: doctor.username,
        id: doctor._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET as string);

      // return the whole doctor object with token
      return res.status(200).send({ token, doctor });
    } catch (error: unknown) {
      let errorMessage = "Something went wrong: ";
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  },

  loginPatient: async (req: Request, res: Response) => {
    try {
      const { username, password } = processCredentials(req.body);

      const patient = await patientModel.findOne({ username });
      if (!patient?.password) {
        return res.status(401).json({ error: "invalid username or password" });
      }
      const passwordCorrect =
        patient === null
          ? false
          : await bcrypt.compare(password, patient.password);

      if (!(patient && passwordCorrect)) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }

      // Create token
      const userForToken = {
        username: patient.username,
        id: patient._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET as string);

      // return the whole doctor object with token
      return res.status(200).send({ token, patient });
    } catch (error: unknown) {
      let errorMessage = "Something went wrong: ";
      if (error instanceof Error) {
        errorMessage += error.message;
      }
      return res.status(500).json({ error: errorMessage });
    }
  }, 

  //-------------------------------------------------------------------------------------------
};

export default authController;
