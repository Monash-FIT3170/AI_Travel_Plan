import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from "@mui/material";

export const PdfDownload = ({rootElementId , downloadFileName}) => {

    const [showLoader, setLoader] = useState(false);

    const downloadPdfDocument = () => {
        
        setTimeout(() => {
            setTimeout(() => {
                setLoader(true);
            }, 100);
            const input = document.getElementById(rootElementId);
            input.scrollTo(0, 0);
            html2canvas(input, {
                useCORS: true, allowTaint: true, scale: '1', backgroundColor: '#87CEEB',
                height: input.scrollHeight, windowHeight: input.scrollHeight
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = 210;
                const pageHeight = 290;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight  - (200*('[id^=media]').length);
                const doc = new jsPDF('pt', 'mm');
                let position = 0;
                doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                doc.save(`${downloadFileName}.pdf`);
                setLoader(false);
            });
        }, 1000);
    };

    return <Button variant="contained" endIcon={<DownloadIcon />} 
		onClick={downloadPdfDocument}>Download Itinerary</Button>
}

export default PdfDownload;