import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import axios from 'axios';
import SearchBar from "../SearchBar/SearchBar";

import {
  Link
} from 'react-router-dom';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";

import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import { useStateValue } from "../../state";
import { addPatient } from "../../state";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  
  const [filter, setFilter] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const newPatient = await patientService.create(values);
      dispatch(addPatient(newPatient));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const byFilterField = (p: Patient) => p.name.toLowerCase().includes(filter.toLowerCase());
  const patientsToShow = filter ? patients.filter(byFilterField) : patients;

  return (
    <div className="App">
      <SearchBar filter={filter} setFilter={setFilter} />
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patientsToShow).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" color="info" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
