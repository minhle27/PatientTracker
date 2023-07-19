import { Patient, Gender, NewEntry } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import patientService from "../../services/patients";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryInfo from "./EntryInfo/EntryInfo";
import AddEntryForm from "./AddEntryForm/AddEntryForm";
import Togglable from "../../components/Toggalable";
import "./index.css";
import { getErrorMessage } from "../../utils";
import { Alert } from "@mui/material";

const PatientInfoPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patientDisplay, setPatientDisplay] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  const id = useParams().id;

  useEffect(() => {
    const fetchPatientById = async () => {
      if (id) {
        const patient = await patientService.getAPatient(id);
        setPatientDisplay(patient);
      }
    };
    void fetchPatientById();
  }, [id]);

  const onNewEntry = async (values: NewEntry) => {
    if (!patientDisplay) return null;
    try {
      const updatedPatient = await patientService.addEntry(
        patientDisplay.id,
        values
      );
      setPatientDisplay(updatedPatient);
      setError(null);
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  if (!patientDisplay) {
    return <p>Patient Not Found</p>;
  }

  return (
    <div>
      <section>
        <div className="patient-info">
          <h2 className="item">
            {patientDisplay.name} {getGenderIcon(patientDisplay.gender)}
          </h2>
          <p className="item">ssn: {patientDisplay.ssn}</p>
          <p className="item">occupation: {patientDisplay.occupation}</p>
        </div>
      </section>
      {error && <Alert severity="error">{error}</Alert>}
      <Togglable buttonLabel="Add New Entry">
        <AddEntryForm diagnoses={diagnoses} submitEntry={onNewEntry} />
      </Togglable>
      <section>
        <h2>Entries</h2>
        {patientDisplay.entries?.map((each) => (
          <EntryInfo key={each.id} entry={each} diagnoses={diagnoses} />
        ))}
        {patientDisplay.entries?.length === 0 ? (
          <p>Entry not found for this patient</p>
        ) : null}
      </section>
    </div>
  );
};

export default PatientInfoPage;
