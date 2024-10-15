// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyD4LspJzDdQm4PykruDE3viv0cB_tKEOB8",
    authDomain: "dbmsproject-302af.firebaseapp.com",
    projectId: "dbmsproject-302af",
    storageBucket: "dbmsproject-302af.appspot.com",
    messagingSenderId: "1092166912343",
    appId: "1:1092166912343:web:ca19b9b2d58fb538759612",
    measurementId: "G-RKQNEKXX9R"
  }

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = async (navigate) => {
try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User Info:', user);

    // Send user info to backend to add to MySQL database
    const response = await axios.post('http://localhost:3001/users', {
    name: user.displayName,
    email: user.email,
    profile_image: user.photoURL,
    });

    // Store user email in local storage
    localStorage.setItem('userEmail', user.email);

    // Redirect to home page
    navigate('/');
} catch (error) {
    console.error('Error during sign-in:', error);
}
};

export { auth, signInWithGoogle };