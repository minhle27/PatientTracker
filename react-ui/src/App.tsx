import { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis, Patient } from "./types";
import { pingBackend } from './utils';

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";
import SearchBar from "./components/SearchBar/SearchBar";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    pingBackend();

    const fetchInitialData = async () => {
      const patients = await patientService.getAll();
      const diagnoses = await diagnosisService.getAll();
      setPatients(patients);
      setDiagnoses(diagnoses);
    };
    
    void fetchInitialData();
  }, []);

  const byFilterField = (p: Patient) => p.name.toLowerCase().includes(filter.toLowerCase());
  const patientsToShow = filter ? patients.filter(byFilterField) : patients;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <SearchBar filter={filter} setFilter={setFilter} />
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/patients/:id" element={<PatientInfoPage diagnoses={diagnoses} />} />
          <Route path="/" element={<PatientListPage patients={patientsToShow} setPatients={setPatients} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
