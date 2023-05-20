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
      <Accordion className="accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="accordion-summary"
        >
          <Typography>How do I navigate this page?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The top navigation menu allows you to move between the important
            pages. This includes the Travel Planner, where you can chat with the
            AI chatbot, the Itinerary, where you can view the itinerary and
            other information, and Help, where you can understand what you can
            do in order to maximise your experience using this website.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="accordion-summary"
        >
          <Typography>How do I add items to the itinerary?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can add items to the itinerary by simply talking with our AI
            travel planer, who will add destinations that you would like to
            visit in the itinerary.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="accordion-summary"
        >
          <Typography>
            Is there a way for me to export/download my itinerary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you can download your itinerary. Head to the Itinerary tab, and
            under extra information, you should be able to see a button that
            allows you to download the itinerary{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="accordion-summary"
        >
          <Typography>Is my itinerary information up to date?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, all your itinerary information is up to date, and this includes
            all the extra information provided such as the forex exchange rate
            and weather
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          className="accordion-summary"
        >
          <Typography>
            Where can I find emergency contact information about the place I am
            visiting?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            All emergency information regarding your destination can be found in
            the Itinerary page, as part of the extra information provided. These
            emergency contacts include Ambulance, Police, Fire department and
            more.{" "}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
