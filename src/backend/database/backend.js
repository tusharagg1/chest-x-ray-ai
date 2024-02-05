// import needed externally defined modules
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

// import needed internally defined modules
import { createNewUser, deleteAUser, signInUser, signOutUser } from './user-auth-mgmt';
import { readUserData, writeUserData, writePatientData } from './database-ops';
import { resolve } from "path";

// necessary firebase configuration setip
const firebaseConfig = {
  apiKey: "AIzaSyB5RHIQl0a8nzZ2bMUwTMJ6XNYWciBaneM",
  authDomain: "chest-x-ray-ai-f0b4a.firebaseapp.com",
  databaseURL: "https://chest-x-ray-ai-f0b4a-default-rtdb.firebaseio.com",
  projectId: "chest-x-ray-ai-f0b4a",
  storageBucket: "chest-x-ray-ai-f0b4a.appspot.com",
  messagingSenderId: "106488932425",
  appId: "1:106488932425:web:74c67977d47848d27f3798",
  measurementId: "G-085B846RRX"
}

// necessary constnats for various firebase cuntionalities (i.e. auth, database)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// create a new user
export function createANewUser(userName, email, password, firstName, lastName, medInsts, isAdminUser) {
  return new Promise((resolve, reject) => {
    createNewUser(auth, email, password)
      .then((userId) => {
        const userDataWritten = writeUserData(db, userId, userName, email, password, firstName, lastName, medInsts, isAdminUser);
        if (userDataWritten) {
          resolve(userId);
        }
        else {
          reject(null);
        }
      })
      .catch((_error) => {
        reject(null);
      });
  });
}

// delete a user
export async function deleteUser(email, password) {
  const userDeleted = await deleteAUser(auth, email, password);
  return userDeleted;
}

// sign in a user
export function signInAUser(email, password) {
  return new Promise((resolve, reject) => {
    signInUser(auth, email, password)
      .then((userId) => {
        const userData = readUserData(db, userId);
        if (userData !== null) {
          resolve(userData);
        }
        else {
          reject(null);
        }
      })
      .catch((_error) => {
        reject(null);
      });
  });
}

// sign out a user
export function signOutAUser() {
  return new Promise((resolve, reject) => {
    signOutUser(auth)
      .then((userSignedOut) => {
        resolve(userSignedOut);
      })
      .catch((_error) => {
        reject(null);
      });
  });
}

// get current user
export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const userId = auth.currentUser.uid;
    const userData = readUserData(db, userId);
    if (userData !== null) {
      resolve(userData);
    }
    else {
      reject(null);
    }
  });
}

// create a new patient
export function createANewPatient(patientId, mrn, firstName, lastName, email, dob, gender, phone, refPhys, lastVisit, notes) {
  return new Promise((resolve, reject) => {
    const patientDataWritten = writePatientData(db, patientId, mrn, firstName, lastName, email, dob, gender, phone, refPhys, lastVisit, notes);
    if (patientDataWritten) {
      resolve(patientId);
    }
    else {
      reject(false);
    }
  });
}
