import { Patient, Gender } from "../../types";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Diagnosis } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from "../../services/patients";
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryInfo from "./EntryInfo/EntryInfo";


// const Entries = ({ entries, diagnosisData }: { entries: Array<Entry>, diagnosisData: Map<string, string> }) => {
// 	return (
// 		<div>
// 			{entries && entries.length > 0 ? (
// 				<div>
// 					<h2>Entries</h2>
// 					<ul>
// 						{entries.map(entry => 
// 							<li key={entry.id}>
// 								<p>{entry.date} {entry.description}</p>
// 								{entry.diagnosisCodes ? (
// 									<ul>
// 										{entry.diagnosisCodes.map(code => 
// 											<li key={code}>
// 												<p>{code} {diagnosisData.get(code)}</p>
// 											</li>	
// 										)}
// 									</ul>
// 								) : (
// 									<p>No diagnosis code</p>
// 								)}
// 							</li>	
// 						)}
// 					</ul>
// 				</div>
// 			) : (
// 				<p>Entry Not found</p>
// 			)}
// 		</div>
// 	)
// }

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
				<h2>
					{patientDisplay.name} {getGenderIcon(patientDisplay.gender)}
				</h2>
				<p>ssn: {patientDisplay.ssn}</p>
				<p>occupation: {patientDisplay.occupation}</p>
			</section>
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