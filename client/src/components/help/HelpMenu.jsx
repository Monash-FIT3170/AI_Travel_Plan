import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

/**
 * Contains the entire code for the help accordian menu
 * @returns
 */
export default function HelpMenu() {
  return (
    <div>
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
          <Typography>Question 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Response 2</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
