import { useState } from "react";
import { Button } from '@mui/material';

type Props = {
    children: JSX.Element,
    buttonLabel: string
};

const Togglable = (props: Props) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility} variant="contained" sx={{ml: '10px', mb: '20px'}}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility} variant="contained" sx={{ml: '10px', mb: '20px'}}>Cancel</Button>
            </div>
        </div>
    )
}

export default Togglable;