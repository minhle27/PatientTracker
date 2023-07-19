import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../../types";
import './EntryDetails.css'

import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const style = {
    marginTop: 10,
    marginBottom: 5,
}

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    const colors = {
        0: 'red',
        1: 'yellow',
        2: 'lime',
        3: 'green',
    };

    return (
        <div style={style}>
            <FavoriteIcon style={{ color: colors[entry.healthCheckRating] }}/>
            <div className="diagnose-by">diagnose by {entry.specialist}</div>
        </div> 
    );
}

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div style={style}>
            {entry.discharge && (
                <div>
                    discharged {entry.discharge.date}: {entry.discharge.criteria}
                </div>
            )}
            <div>diagnose by {entry.specialist}</div>
        </div>
    )
}

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <div style={style}>
            <div>{entry.employerName}</div>
            {entry.sickLeave && (
                <div>
                    sickleave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                </div>
            )}
            <div>diagnose by {entry.specialist}</div>
        </div>
    )
}

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'HealthCheck': {
            return (
                <HealthCheck entry={entry} />
            )
        }
        case 'Hospital': {
            return (
                <Hospital entry={entry} />
            )
        }
        case 'OccupationalHealthcare': {
            return (
                <OccupationalHealthcare entry={entry} />
            )
        }
        default:
            return assertNever(entry);  
    }
}

export default EntryDetails;