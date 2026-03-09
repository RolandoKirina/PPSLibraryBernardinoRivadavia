import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Universal PDF Generator for Library Reports
 * @param {string} title - Report header title
 * @param {string[]} columns - Array of column headers
 * @param {any[][]} data - Array of arrays containing the row data
 * @param {string} fileName - Name for the generated file
 */
export const generateUniversalPDF = (title, columns, data, fileName = "report", subtitle = "") => {
    const doc = new jsPDF('p', 'pt', 'a4');

    // --- Título Principal ---
    doc.setFontSize(18); // Bajamos un poco de 20 a 18 para que respire mejor
    doc.setTextColor(44, 62, 80);
    doc.text(title.toUpperCase(), 40, 45);

    // --- Subtítulo (Fechas) ---
    if (subtitle) {
        doc.setFontSize(11); // Tamaño más pequeño como pediste
        doc.setTextColor(52, 73, 94); // Un tono gris azulado
        doc.text(subtitle, 40, 62); // Ubicado justo debajo del título
    }

    // --- Línea de Generación ---
    doc.setFontSize(9);
    doc.setTextColor(120);
    const dateStr = new Date().toLocaleString();
    // Bajamos la posición de la fecha de generación a 75 para que no se superponga
    doc.text(`Biblioteca Rivadavia - Generado el: ${dateStr}`, 40, 78);

    // --- Línea Divisoria ---
    doc.setDrawColor(200);
    doc.line(40, 85, 550, 85); // Bajamos la línea a 85

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
            const str = "Pagina " + doc.internal.getNumberOfPages();
            doc.setFontSize(9);
            doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 20);
        }
    });

    const blob = doc.output('bloburl');
    window.open(blob, '_blank');
};