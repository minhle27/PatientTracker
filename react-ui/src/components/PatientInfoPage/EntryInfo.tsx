import { Entry, Diagnosis } from "../../types";

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
        borderStyle: 'solid'
    };

    return (
        <div style={style}>
            {entry.date} {entry.description}
            <ul>
                {entry.diagnosisCodes?.map(code => 
                    <li key={code}>
                        {code} {findDescription(code)}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default EntryInfo;