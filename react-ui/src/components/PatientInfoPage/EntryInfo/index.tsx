import { Entry, Diagnosis } from "../../../types";
import EntryDetails from "../EntryDetail";
import './EntryInfo.css'
import { Work, MedicalServices, LocalHospital } from '@mui/icons-material';

interface Props {
    entry: Entry,
    diagnoses: Diagnosis[]
};

const EntryInfo = ({ entry, diagnoses }: Props) => {
    const findDescription = (code: string): string => {
        const foundDiagnosis = diagnoses.find(d => d.code === code);
        if (!foundDiagnosis) return "unknown";
        return foundDiagnosis.name;
    };

    const style = {
        margin: 10,
        padding: 10,
        borderRadius: 14,
        borderStyle: 'solid',
        backgroundColor: '#aee683',
        maxWidth: '500px',
    };

    const matchIcon = (type: string) => {
        if (type === 'HealthCheck'){
            return <MedicalServices />;
        }

        if (type === 'OccupationalHealthcare') {
            return <Work />;
        }

        return <LocalHospital />;
    }

    return (
        <div style={style}>
            <p className="entry-date">Date: {entry.date} {matchIcon(entry.type)}</p>
            <p className="entry-description">{entry.description}</p>
            <EntryDetails entry={entry} />
            {entry.diagnosisCodes && (
                <ul>
                    {entry.diagnosisCodes.map(code => 
                        <li key={code}>
                            {code} {findDescription(code)}
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default EntryInfo;