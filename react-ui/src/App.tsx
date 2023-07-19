import { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis } from "./types";
import { pingBackend } from './utils';
import { useStateValue } from "./state";
import { setPatientList } from "./state";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";

const App = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [, dispatch] = useStateValue();

  useEffect(() => {
    pingBackend();

    const fetchInitialData = async () => {
      try {
        const patientListFromApi = await patientService.getAll();
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.log(e);
      }
    };
    
    void fetchInitialData();
  }, [dispatch]);

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
          <Route path="/" element={<PatientListPage />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
