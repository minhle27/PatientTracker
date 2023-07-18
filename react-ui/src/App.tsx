import { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis, Patient } from "./types";
import { pingBackend } from './utils';

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    pingBackend();

    const fetchInitialData = async () => {
      try {
        const patients = await patientService.getAll();
        const diagnoses = await diagnosisService.getAll();
        setPatients(patients);
        setDiagnoses(diagnoses);
      } catch (e) {
        console.log(e);
      }
    };
    
    void fetchInitialData();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="info">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/patients/:id" element={<PatientInfoPage diagnoses={diagnoses} />} />
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
