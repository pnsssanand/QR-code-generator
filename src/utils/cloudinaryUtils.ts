
import html2canvas from 'html2canvas';

export const uploadToCloudinary = async (element: HTMLElement): Promise<string> => {
  try {
    // Generate canvas from QR code element
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
    });
    
    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    });
    
    // Create form data
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', 'qr code generator');
    formData.append('cloud_name', 'dlvjvskje');
    
    // Upload to Cloudinary
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dlvjvskje/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to upload to Cloudinary');
    }
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
