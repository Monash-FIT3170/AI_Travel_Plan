import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const PdfDownload = ({rootElementId , downloadFileName}) => {

    const [showLoader, setLoader] = useState(false);

    const downloadPdfDocument = () => {
        
        setTimeout(() => {
            setTimeout(() => {
                setLoader(true);
            }, 100);
            const input = document.getElementById(rootElementId);
            input.scrollTo(0, 0);
            html2canvas(input, {
                allowTaint: true, scale: '1', backgroundColor: '#000000',
                height: input.scrollHeight, windowHeight: input.scrollHeight}).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210;
                const pageHeight = 290;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                const doc = new jsPDF('pt', 'mm');
                let position = 0;
                doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight + 25);
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 25);
                    heightLeft -= pageHeight;
                }
                doc.save('download.pdf');
                setLoader(false);
            });
        }, 1000);
    };

    return <Button variant="contained" endIcon={<AddIcon />} 
		onClick={downloadPdfDocument}>Download </Button>
}

export default PdfDownload;