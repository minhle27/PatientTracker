import { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis } from "./types";
import { pingBackend } from './utils';

import { useAppSelector } from './redux/hook';
import { Navigate } from "react-router-dom";

import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";
import SignInForm from "./components/SignIn";

const App = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const isAuth = Boolean(useAppSelector((state) => state.auth.token));

  useEffect(() => {
    pingBackend();

    const fetchInitialData = async () => {
      try {
        // const patientListFromApi = await patientService.getAll();
        const diagnoses = await diagnosisService.getAll();
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
          <Route path="/" element={<SignInForm />} />
          <Route path="/patients/:id" element={<PatientInfoPage diagnoses={diagnoses} />} />
          <Route path="/home" element={isAuth ? <PatientListPage /> : <Navigate to="/" />} />
          <Route path="/sign-in" element={<SignInForm />}/>
        </Routes>
      </Container>
    </div>
  );
};

export default App;
