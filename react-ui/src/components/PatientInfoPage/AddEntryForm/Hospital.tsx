import { InputLabel, Input, TextField } from "@mui/material";
import { useState } from "react";

const Hospital = () => {
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');

    return (
        <div>
            <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
            <div style={{marginLeft: 10}}>
                <InputLabel style={{ marginTop: 10 }}>Date</InputLabel>
                <Input 
                    type="date"
                    fullWidth
                    value={dischargeDate}
                    onChange={({ target }) => setDischargeDate(target.value)}
                />
                <div style={{ marginBottom: 20 }} />
                <TextField 
                    label="condition"
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({ target }) => setDischargeCriteria(target.value)}
                />
                <div style={{ marginBottom: 20 }} />
            </div>
        </div>
    )
}

export default Hospital;