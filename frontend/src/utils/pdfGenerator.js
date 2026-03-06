import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Universal PDF Generator for Library Reports
 * @param {string} title - Report header title
 * @param {string[]} columns - Array of column headers
 * @param {any[][]} data - Array of arrays containing the row data
 * @param {string} fileName - Name for the generated file
 */
export const generateUniversalPDF = (title, columns, data, fileName = "report") => {
    const doc = new jsPDF('p', 'pt', 'a4');

    // --- Header Section ---
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80); // Dark Blue/Grey
    doc.text(title.toUpperCase(), 40, 50);

    doc.setFontSize(10);
    doc.setTextColor(100);
    const dateStr = new Date().toLocaleString();
    doc.text(`Library Management System - Generated on: ${dateStr}`, 40, 65);

    doc.setDrawColor(200);
    doc.line(40, 75, 550, 75);

    autoTable(doc, {
        startY: 90,
        head: [columns],
        body: data,
        theme: 'striped',
        headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontSize: 10,
            halign: 'center'
        },
        styles: {
            fontSize: 7.5, 
            cellPadding: 2, 
            rowHeight: 12   
        },
        margin: { top: 40, bottom: 40 }, 
        alternateRowStyles: {
            fillColor: [245, 247, 250]
        },


        didDrawPage: (data) => {
            const str = "Page " + doc.internal.getNumberOfPages();
            doc.setFontSize(9);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 20);
        }
    });

    const blob = doc.output('bloburl');
    window.open(blob, '_blank');
};