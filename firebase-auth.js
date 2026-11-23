// Firebase Authentication Service (With UID Check)
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authorized Admin UID
const AUTHORIZED_ADMIN_UID = 'nXUfSk9iMVVoctVAeMBE7ys4XC13';

// Authentication Functions
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Verify UID
      if (userCredential.user.uid !== AUTHORIZED_ADMIN_UID) {
        await signOut(auth);
        return { success: false, error: 'Unauthorized access' };
      }
      
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Check if user is logged in and authorized
  isAdmin: () => {
    const user = auth.currentUser;
    return user !== null && user.uid === AUTHORIZED_ADMIN_UID;
  },

  // Get authorized UID
  getAuthorizedUID: () => {
    return AUTHORIZED_ADMIN_UID;
  },

  // Auth state observer
  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};

export { auth };
