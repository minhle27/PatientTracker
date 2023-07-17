import { TextField, InputLabel, Input } from "@mui/material";

type Props = {
    employerName: string;
    setEmployerName: React.Dispatch<React.SetStateAction<string>>;
    sickLeaveStart: string;
    setSickLeaveStart:  React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcare = ({ employerName, setEmployerName, sickLeaveStart, setSickLeaveStart } : Props) => {
    return (
        <div>
            <div style={{ marginTop: 20 }} />
            <TextField 
                label="Employee"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
            />
            <div>
                <InputLabel style={{ marginTop: 20 }}>Sickleave</InputLabel>
                <div style={{marginLeft: 10}}>
                    <InputLabel style={{ marginTop: 20 }}>start</InputLabel>
                    <Input 
                        type="date"
                        fullWidth
                        value={sickLeaveStart}
                        onChange={({ target }) => setSickLeaveStart(target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default OccupationalHealthcare;