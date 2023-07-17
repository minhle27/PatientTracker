import { TextField, InputLabel, MenuItem, Select, Grid, Button, Input, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { Diagnosis } from '../../../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';

type Props  = {
    diagnoses: Diagnosis[];
};

const AddEntryForm = ({ diagnoses } : Props) => {
    const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
    const [description, setDescription] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [rating, setRating] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');

    const style = {
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        borderStyle: 'dashed'
    }

    const typeOptions = ['HealthCheck', 'Hospital', 'OccupationalHealthcare'];
    const diagnosisOptions = diagnoses.map(d => d.code);

    const addEntry = () => {
        console.log('Form submitted');
    }

    const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
        event.preventDefault();
        //console.log(event.target.value);
        if (Array.isArray(event.target.value)) {
            const codes = event.target.value;
            setDiagnosisCodes(codes);
        }
    }

    const onTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === 'string'){
            const value = event.target.value;
            if (value === 'HealthCheck' || value==='Hospital' || value==='OccupationalHealthcare'){
                setType(value);
            }
        }
    }

    return (
        <form style={style} onSubmit={addEntry}>
            <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
            <Select
                fullWidth
                value={type}
                onChange={onTypeChange}
            >
                {typeOptions.map(type => 
                    <MenuItem key={type} value={type} >
                        {type}
                    </MenuItem>
                )}
            </Select>
            <div style={{ marginBottom: 20 }} />
            <TextField 
                label="Description"
                fullWidth
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
            <Input
                type="date"
                fullWidth
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />
            <div style={{ marginBottom: 20 }} />
            <TextField
                label="Specialist"
                fullWidth  
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
            <Select
                fullWidth
                multiple
                value={diagnosisCodes}
                onChange={onDiagnosisChange}
            >
                {diagnosisOptions.map(type => 
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                )}
            </Select>
            {type === 'HealthCheck' && <HealthCheck rating={rating} setRating={setRating} />}
            {type === 'Hospital' && <Hospital />}
            
        </form>
    )
}

export default AddEntryForm;