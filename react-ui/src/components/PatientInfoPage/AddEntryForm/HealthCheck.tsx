import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type Props = {
    rating: string;
    setRating: React.Dispatch<React.SetStateAction<string>>
}

const HealthCheck = ({ rating, setRating } : Props) => {
    const healthCheckOptions = ['0', '1', '2', '3'];

    const onHealthCheckChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === 'string'){
            const value = event.target.value;
            setRating(value);
        }
    }

    return (
        <div>
            <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
            <Select
                fullWidth
                value={rating}
                onChange={onHealthCheckChange}
            >
                {healthCheckOptions.map(each => 
                    <MenuItem key={each} value={each}>
                        {each}
                    </MenuItem>
                )}
            </Select>
            <div style={{ marginBottom: 20 }} />
        </div>
    )
}

export default HealthCheck;