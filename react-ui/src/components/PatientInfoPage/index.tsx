import { Patient } from "../../types";
import { useState, useEffect } from "react";
import {
  useParams
} from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from "../../services/patients";
import TransgenderIcon from '@mui/icons-material/Transgender';

const Gender = ({ gender }: { gender: string }) => {
	switch(gender){
		case 'male':
			return <MaleIcon />
		case 'female':
			return <FemaleIcon />
		default:
			return <TransgenderIcon />
	}
};

const PatientInfoPage = () => {
	const [patientDisplay, setPatientDisplay] = useState<Patient>();
	const id = useParams().id;

	useEffect(() => {
    const fetchPatientById = async () => {
			const patient =  await patientService.getAPatient(id as string);
			console.log(patient);
			setPatientDisplay(patient);
		};

    void fetchPatientById();
  }, [id]);



	return (
		<div>
			{patientDisplay ? (
				<div>
					<h2>
						{patientDisplay.name}
						<Gender gender={patientDisplay.gender} />
					</h2>
					<p>ssn: {patientDisplay.ssn}</p>
					<p>occupation: {patientDisplay.occupation}</p>
				</div>
			) : (
				<p>Patient not found</p>
			)}
		</div>
	);
};

export default PatientInfoPage;