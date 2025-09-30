import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export interface ProjectData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  submittedAt: Timestamp;
}

export const submitProject = async (data: ProjectData) => {
  try {
    const projectRef = await addDoc(collection(db, 'projects'), {
      ...data,
      submittedAt: Timestamp.now()
    });
    return projectRef.id;
  } catch (error) {
    console.error('Error submitting project:', error);
    throw error;
  }
};