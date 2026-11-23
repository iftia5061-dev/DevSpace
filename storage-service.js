// Firebase Storage Service
import { initializeApp } from 'firebase/app';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Storage Service
export const storageService = {
  // Upload Image
  uploadImage: async (file, path) => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { success: true, url: downloadURL, path };
    } catch (error) {
      console.error('Upload image error:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete Image
  deleteImage: async (path) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { success: true };
    } catch (error) {
      console.error('Delete image error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get Download URL
  getDownloadURL: async (path) => {
    try {
      const storageRef = ref(storage, path);
      const url = await getDownloadURL(storageRef);
      return { success: true, url };
    } catch (error) {
      console.error('Get download URL error:', error);
      return { success: false, error: error.message };
    }
  }
};

export { storage };
