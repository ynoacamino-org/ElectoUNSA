import { jsPDF } from 'jspdf';
import type { Integrante } from '../types';

/**
 * Genera y descarga un PDF genérico de Hoja de Vida para un integrante
 * @param member - Información del integrante
 */
export const generateCVPDF = (member: Integrante) => {
    // Crear nuevo documento PDF
    const doc = new jsPDF();

    // Colores UNSA
    const unsaGranate = [90, 22, 37]; // RGB de #5A1625
    const unsaAzul = [0, 51, 102]; // RGB de #003366

    // Configuración de página
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 20;

    // ENCABEZADO con color UNSA
    doc.setFillColor(unsaGranate[0], unsaGranate[1], unsaGranate[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Título en blanco
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('HOJA DE VIDA', pageWidth / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Universidad Nacional de San Agustín', pageWidth / 2, 30, { align: 'center' });

    yPosition = 55;

    // Resetear color de texto a negro
    doc.setTextColor(0, 0, 0);

    // INFORMACIÓN PERSONAL
    doc.setFillColor(unsaAzul[0], unsaAzul[1], unsaAzul[2]);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN PERSONAL', margin + 5, yPosition + 6);

    yPosition += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    // Nombre
    doc.setFont('helvetica', 'bold');
    doc.text('Nombre Completo:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(member.nombre, margin + 50, yPosition);
    yPosition += 8;

    // Cargo
    doc.setFont('helvetica', 'bold');
    doc.text('Cargo:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(member.cargo, margin + 50, yPosition);
    yPosition += 8;

    // Año
    doc.setFont('helvetica', 'bold');
    doc.text('Año:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(member.anio, margin + 50, yPosition);
    yPosition += 15;

    // FORMACIÓN ACADÉMICA
    doc.setFillColor(unsaAzul[0], unsaAzul[1], unsaAzul[2]);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FORMACIÓN ACADÉMICA', margin + 5, yPosition + 6);

    yPosition += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('• Universidad Nacional de San Agustín de Arequipa', margin, yPosition);
    yPosition += 6;
    doc.text('  Estudiante de pregrado', margin, yPosition);
    yPosition += 15;

    // EXPERIENCIA
    doc.setFillColor(unsaAzul[0], unsaAzul[1], unsaAzul[2]);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EXPERIENCIA', margin + 5, yPosition + 6);

    yPosition += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`• ${member.cargo}`, margin, yPosition);
    yPosition += 6;
    doc.text(`  Año: ${member.anio}`, margin, yPosition);
    yPosition += 15;

    // HABILIDADES Y COMPETENCIAS
    doc.setFillColor(unsaAzul[0], unsaAzul[1], unsaAzul[2]);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('HABILIDADES Y COMPETENCIAS', margin + 5, yPosition + 6);

    yPosition += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('• Liderazgo y trabajo en equipo', margin, yPosition);
    yPosition += 6;
    doc.text('• Comunicación efectiva', margin, yPosition);
    yPosition += 6;
    doc.text('• Compromiso con la comunidad universitaria', margin, yPosition);
    yPosition += 6;
    doc.text('• Capacidad de gestión y organización', margin, yPosition);
    yPosition += 15;

    // PROPUESTAS Y OBJETIVOS
    doc.setFillColor(unsaAzul[0], unsaAzul[1], unsaAzul[2]);
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PROPUESTAS Y OBJETIVOS', margin + 5, yPosition + 6);

    yPosition += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('• Promover la participación estudiantil activa', margin, yPosition);
    yPosition += 6;
    doc.text('• Mejorar la calidad educativa y servicios universitarios', margin, yPosition);
    yPosition += 6;
    doc.text('• Fomentar la transparencia en la gestión universitaria', margin, yPosition);
    yPosition += 6;
    doc.text('• Representar fielmente los intereses de la comunidad', margin, yPosition);

    // PIE DE PÁGINA
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.setFont('helvetica', 'italic');
    doc.text('Documento generado por ElectoUNSA', pageWidth / 2, footerY, { align: 'center' });
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-PE')}`, pageWidth / 2, footerY + 5, { align: 'center' });

    // Generar nombre de archivo limpio
    const fileName = `CV_${member.nombre.replace(/\s+/g, '_')}.pdf`;

    // Descargar el PDF
    doc.save(fileName);
};
