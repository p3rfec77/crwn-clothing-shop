import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWr6J7rSrOELNYi8XbwY4z7oTFGnXrL1k",
    authDomain: "crwn-clothing-e9a67.firebaseapp.com",
    projectId: "crwn-clothing-e9a67",
    storageBucket: "crwn-clothing-e9a67.appspot.com",
    messagingSenderId: "365488675931",
    appId: "1:365488675931:web:9a7c8aa2cb4461e50d337e"
};

const firebaseApp = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
        } catch (error) {
            console.log('error creating the user');
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);