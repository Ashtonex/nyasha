/* =========================
src/firebase/firebaseConfig.js
- Replace the config object with your Firebase project details
========================= */
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
apiKey: "AIzaSyBmP_N5cu9sOqEw9fajYL4zSRB_mnDIQxg",
authDomain: "maasim-creatives.firebaseapp.com",
projectId: "maasim-creatives",
storageBucket: "maasim-creatives.firebasestorage.app",
messagingSenderId: "1036429929099",
appId: "1:1036429929099:web:e476ba656cbc7a42dd028e"
}


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)