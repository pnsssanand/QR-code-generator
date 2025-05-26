
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadQRCode = async (element: HTMLElement, filename: string, format: 'png' | 'jpeg' = 'png') => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    });
    
    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw error;
  }
};

export const downloadQRAsPDF = async (element: HTMLElement, filename: string) => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    
    // Calculate dimensions to center the QR code
    const imgWidth = 100;
    const imgHeight = 100;
    const x = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
    const y = (pdf.internal.pageSize.getHeight() - imgHeight) / 2;
    
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};
