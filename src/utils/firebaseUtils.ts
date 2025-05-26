
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface QRData {
  text: string;
  imageUrl: string;
  fgColor: string;
  bgColor: string;
  timestamp: Date;
  views?: number;
}

export const saveQRToFirestore = async (qrData: QRData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'qrcodes'), {
      ...qrData,
      views: 0,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    throw error;
  }
};

export const getQRFromFirestore = async (id: string): Promise<QRData | null> => {
  try {
    const docRef = doc(db, 'qrcodes', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as QRData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting from Firestore:', error);
    throw error;
  }
};
