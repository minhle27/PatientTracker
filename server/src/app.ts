import express from "express";
import config from "./utils/config";
import cors from "cors";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
import diagnosesRouter from "./routes/diagnoses";
//import patientsRouter from "./routes/patients";
import doctorsRouter from "./routes/doctors";
import authRouter from "./routes2/auth";

mongoose.set("strictQuery", false);

console.log("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI as string)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/auth", authRouter);
app.use("/api/diagnoses", diagnosesRouter);
//app.use("/api/patients", patientsRouter);
app.use("/api/doctors", doctorsRouter);

export default app;
