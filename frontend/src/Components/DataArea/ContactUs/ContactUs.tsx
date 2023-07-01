import "./ContactUs.css";
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

function ContactUs(): JSX.Element {

    return (
        <div className="ContactUs Box">

            <h2>Contact Us Page:</h2>
            <form>

                <TextField variant="outlined" label="name" className="TextBox" />
                <TextField variant="outlined" label="Email" type="email" className="TextBox" />
                <TextField variant="outlined" label="Message" className="TextBox" />

                <FormControlLabel label="send me CV" control={<Checkbox/>}/>
                <ButtonGroup  variant="contained" fullWidth>
                <Button color="primary">Clear</Button>
                <Button color="secondary" endIcon={<SendIcon/>}>send</Button>
                </ButtonGroup>
                    

                
            </form>
        </div>
    );
}

export default ContactUs;
