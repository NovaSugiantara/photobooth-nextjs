import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPdf = async (element: HTMLElement, filename: string = 'photobooth.pdf') => {
    try {
        // Create canvas from the element
        const canvas = await html2canvas(element, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // Enable CORS for images
            allowTaint: true,
            backgroundColor: null, // Transparent background
            logging: false, // Disable logging
        });

        // Get dimensions
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm (210mm)
        const pageHeight = 297; // A4 height in mm (297mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

        // Save the PDF
        pdf.save(filename);

        return true;
    } catch (error) {
        console.error('Error exporting to PDF:', error);
        return false;
    }
};
