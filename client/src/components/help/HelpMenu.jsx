import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import "./HelpMenuStyles.css";

/**
 * Contains the entire code for the help accordian menu
 * @returns
 */
export default function HelpMenu() {
  return (
    <div className="help-menu">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How do I navigate this page?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Response 1</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>How do I add items to the itinerary?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>idk</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Is there a way for me to export my itinerary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Response 2</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Is my itinerary information up to date?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Response 2</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            Where can I find emergency contact information about the place I am
            visiting?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Response 2</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
