import './CorrectionMessage.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { Divider } from '@mui/material';
import { blue } from '@mui/material/colors';

export default function CorrectionMessage({ message, issueType, shortMessage, replacements, incorrectText }) {
    const color = issueType === 'misspelling' ? 'var(--red)' : 'var(--blue)'

    return (
        <div className='CorrectionMessage'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<UnfoldMoreIcon />}
                    aria-controls="panel1a-content"
                    id={issueType}
                >
                <Typography>
                    <span className='dot' style={{backgroundColor: color}}></span>
                    <span>{incorrectText}</span>
                    {shortMessage ? <span className='short-msg'> · {shortMessage}</span> : ''}
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {replacements
                        ? 
                            <div className='suggestion'>
                                <span className='incorrect-txt'>{incorrectText} → </span>
                                <span className='replacement'>{ replacements[0].value}</span>
                            </div>
                        : 
                            ''
                        }
                    </Typography>
                    <Divider/>
                    <Typography>
                        {message}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}