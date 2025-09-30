import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export interface TrainingRegistration {
  name: string;
  email: string;
  program: string;
  experience: string;
  submittedAt: Timestamp;
}

export const submitTrainingRegistration = async (data: TrainingRegistration) => {
  try {
    const registrationRef = await addDoc(collection(db, 'training_registrations'), {
      ...data,
      submittedAt: Timestamp.now()
    });
    return registrationRef.id;
  } catch (error) {
    console.error('Error submitting training registration:', error);
    throw error;
  }
};