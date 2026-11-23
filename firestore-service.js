// Firestore Database Service
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection Names
const COLLECTIONS = {
  PROFILE: 'profile',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  SERVICES: 'services',
  EXPERIENCE: 'experience',
  CERTIFICATES: 'certificates',
  MESSAGES: 'messages',
  SETTINGS: 'settings',
  ACTIVITY_LOGS: 'activityLogs'
};

// Firestore Service
export const firestoreService = {
  // Profile Operations
  getProfile: async () => {
    try {
      const docRef = doc(db, COLLECTIONS.PROFILE, 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      }
      return { success: false, error: 'Profile not found' };
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, error: error.message };
    }
  },

  updateProfile: async (data) => {
    try {
      const docRef = doc(db, COLLECTIONS.PROFILE, 'main');
      await updateDoc(docRef, data);
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  },

  // Skills Operations
  getSkills: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.SKILLS), orderBy('displayOrder', 'asc'));
      const querySnapshot = await getDocs(q);
      const skills = [];
      querySnapshot.forEach((doc) => {
        skills.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: skills };
    } catch (error) {
      console.error('Get skills error:', error);
      return { success: false, error: error.message };
    }
  },

  addSkill: async (skillData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.SKILLS), skillData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add skill error:', error);
      return { success: false, error: error.message };
    }
  },

  updateSkill: async (id, skillData) => {
    try {
      const docRef = doc(db, COLLECTIONS.SKILLS, id);
      await updateDoc(docRef, skillData);
      return { success: true };
    } catch (error) {
      console.error('Update skill error:', error);
      return { success: false, error: error.message };
    }
  },

  deleteSkill: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.SKILLS, id));
      return { success: true };
    } catch (error) {
      console.error('Delete skill error:', error);
      return { success: false, error: error.message };
    }
  },

  // Projects Operations
  getProjects: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.PROJECTS), orderBy('displayOrder', 'asc'));
      const querySnapshot = await getDocs(q);
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: projects };
    } catch (error) {
      console.error('Get projects error:', error);
      return { success: false, error: error.message };
    }
  },

  getPublishedProjects: async () => {
    try {
      const q = query(
        collection(db, COLLECTIONS.PROJECTS),
        where('status', '==', 'published'),
        orderBy('displayOrder', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const projects = [];
      querySnapshot.forEach((doc) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: projects };
    } catch (error) {
      console.error('Get published projects error:', error);
      return { success: false, error: error.message };
    }
  },

  getProjectBySlug: async (slug) => {
    try {
      const q = query(collection(db, COLLECTIONS.PROJECTS), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: { id: doc.id, ...doc.data() } };
      }
      return { success: false, error: 'Project not found' };
    } catch (error) {
      console.error('Get project by slug error:', error);
      return { success: false, error: error.message };
    }
  },

  addProject: async (projectData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.PROJECTS), projectData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add project error:', error);
      return { success: false, error: error.message };
    }
  },

  updateProject: async (id, projectData) => {
    try {
      const docRef = doc(db, COLLECTIONS.PROJECTS, id);
      await updateDoc(docRef, projectData);
      return { success: true };
    } catch (error) {
      console.error('Update project error:', error);
      return { success: false, error: error.message };
    }
  },

  deleteProject: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
      return { success: true };
    } catch (error) {
      console.error('Delete project error:', error);
      return { success: false, error: error.message };
    }
  },

  // Services Operations
  getServices: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.SERVICES), orderBy('displayOrder', 'asc'));
      const querySnapshot = await getDocs(q);
      const services = [];
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: services };
    } catch (error) {
      console.error('Get services error:', error);
      return { success: false, error: error.message };
    }
  },

  addService: async (serviceData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.SERVICES), serviceData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add service error:', error);
      return { success: false, error: error.message };
    }
  },

  updateService: async (id, serviceData) => {
    try {
      const docRef = doc(db, COLLECTIONS.SERVICES, id);
      await updateDoc(docRef, serviceData);
      return { success: true };
    } catch (error) {
      console.error('Update service error:', error);
      return { success: false, error: error.message };
    }
  },

  deleteService: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.SERVICES, id));
      return { success: true };
    } catch (error) {
      console.error('Delete service error:', error);
      return { success: false, error: error.message };
    }
  },

  // Experience Operations
  getExperience: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.EXPERIENCE), orderBy('startDate', 'desc'));
      const querySnapshot = await getDocs(q);
      const experience = [];
      querySnapshot.forEach((doc) => {
        experience.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: experience };
    } catch (error) {
      console.error('Get experience error:', error);
      return { success: false, error: error.message };
    }
  },

  addExperience: async (experienceData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.EXPERIENCE), experienceData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add experience error:', error);
      return { success: false, error: error.message };
    }
  },

  updateExperience: async (id, experienceData) => {
    try {
      const docRef = doc(db, COLLECTIONS.EXPERIENCE, id);
      await updateDoc(docRef, experienceData);
      return { success: true };
    } catch (error) {
      console.error('Update experience error:', error);
      return { success: false, error: error.message };
    }
  },

  deleteExperience: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.EXPERIENCE, id));
      return { success: true };
    } catch (error) {
      console.error('Delete experience error:', error);
      return { success: false, error: error.message };
    }
  },

  // Certificates Operations
  getCertificates: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.CERTIFICATES), orderBy('issueDate', 'desc'));
      const querySnapshot = await getDocs(q);
      const certificates = [];
      querySnapshot.forEach((doc) => {
        certificates.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: certificates };
    } catch (error) {
      console.error('Get certificates error:', error);
      return { success: false, error: error.message };
    }
  },

  addCertificate: async (certificateData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.CERTIFICATES), certificateData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add certificate error:', error);
      return { success: false, error: error.message };
    }
  },

  updateCertificate: async (id, certificateData) => {
    try {
      const docRef = doc(db, COLLECTIONS.CERTIFICATES, id);
      await updateDoc(docRef, certificateData);
      return { success: true };
    } catch (error) {
      console.error('Update certificate error:', error);
      return { success: false, error: error.message };
    }
  },

  deleteCertificate: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CERTIFICATES, id));
      return { success: true };
    } catch (error) {
      console.error('Delete certificate error:', error);
      return { success: false, error: error.message };
    }
  },

  // Messages Operations
  getMessages: async () => {
    try {
      const q = query(collection(db, COLLECTIONS.MESSAGES), orderBy('receivedDate', 'desc'));
      const querySnapshot = await getDocs(q);
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: messages };
    } catch (error) {
      console.error('Get messages error:', error);
      return { success: false, error: error.message };
    }
  },

  addMessage: async (messageData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MESSAGES), messageData);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Add message error:', error);
      return { success: false, error: error.message };
    }
  },

  markMessageAsRead: async (id) => {
    try {
      const docRef = doc(db, COLLECTIONS.MESSAGES, id);
      await updateDoc(docRef, { read: true });
      return { success: true };
    } catch (error) {
      console.error('Mark message as read error:', error);
      return { success: false, error: error.message };
    }
  },

  deleteMessage: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTIONS.MESSAGES, id));
      return { success: true };
    } catch (error) {
      console.error('Delete message error:', error);
      return { success: false, error: error.message };
    }
  },

  // Settings Operations
  getSettings: async () => {
    try {
      const docRef = doc(db, COLLECTIONS.SETTINGS, 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      }
      return { success: false, error: 'Settings not found' };
    } catch (error) {
      console.error('Get settings error:', error);
      return { success: false, error: error.message };
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const docRef = doc(db, COLLECTIONS.SETTINGS, 'main');
      await updateDoc(docRef, settingsData);
      return { success: true };
    } catch (error) {
      console.error('Update settings error:', error);
      return { success: false, error: error.message };
    }
  },

  // Real-time Listener
  subscribeToCollection: (collectionName, callback) => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        callback(data);
      }
    );
    return unsubscribe;
  }
};

export { db };
