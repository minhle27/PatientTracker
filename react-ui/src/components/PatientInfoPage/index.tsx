import { Patient, Gender } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Diagnosis } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from "../../services/patients";
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryInfo from "./EntryInfo/EntryInfo";
import AddEntryForm from "./AddEntryForm/AddEntryForm";
import Togglable from "../Toggalable/Toggalable";
import "./index.css"

const PatientInfoPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
	const [patientDisplay, setPatientDisplay] = useState<Patient|null>(null);

	const getGenderIcon = (gender: Gender) => {
		switch(gender) {
			case Gender.Male:
				return <MaleIcon />
			case Gender.Female:
				return <FemaleIcon />
			default:
				return <TransgenderIcon />
		}
	};

	const id = useParams().id;

	useEffect(() => {
    	const fetchPatientById = async () => {
			if (id){
				const patient =  await patientService.getAPatient(id as string);
				setPatientDisplay(patient);
			}
		};
    	void fetchPatientById();
  	}, [id]);


	if (!patientDisplay){
		return (
			<p>Patient Not Found</p>
		)
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
			<Togglable buttonLabel="Add New Entry">
				<AddEntryForm diagnoses={diagnoses}/>
			</Togglable>
			<section>
				<h2>Entries</h2>
				{patientDisplay.entries?.map(each => 
					<EntryInfo key={each.id} entry={each} diagnoses={diagnoses}/>
				)}
				{patientDisplay.entries?.length === 0 ? <p>Entry not found for this patient</p> : null}
			</section>
		</div>
	);
};

export default PatientInfoPage;