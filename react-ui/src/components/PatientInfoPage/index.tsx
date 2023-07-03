import { Patient } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from "../../services/patients";
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Entry } from "../../types";

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

const Entries = ({ entries }: { entries: Array<Entry> }) => {
	return (
		<div>
			{entries && entries.length > 0 ? (
				<div>
					<h2>Entries</h2>
					<ul>
						{entries.map(entry => 
							<li key={entry.id}>
								<p>{entry.date} {entry.description}</p>
								{entry.diagnosisCodes ? (
									<ul>
										{entry.diagnosisCodes.map(code => 
											<li key={code}>{code}</li>	
										)}
									</ul>
								) : (
									<p>No diagnosis code</p>
								)}
							</li>	
						)}
					</ul>
				</div>
			) : (
				<p>Entry Not found</p>
			)}
		</div>
	)
}

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
					<section>
						<h2>
							{patientDisplay.name}
							<Gender gender={patientDisplay.gender} />
						</h2>
						<p>ssn: {patientDisplay.ssn}</p>
						<p>occupation: {patientDisplay.occupation}</p>
					</section>
					<section>
						<Entries entries={patientDisplay.entries as Array<Entry>} />
					</section>
				</div>
			) : (
				<p>Patient not found</p>
			)}
		</div>
	);
};

export default PatientInfoPage;