// import needed externally defined modules
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

// import needed internally defined modules
import { createNewUser, deleteAUser, signInUser, signOutUser } from './user-auth-mgmt';
import { readUserData, writeUserData, deleteUserData, writePatientData, readPatientData,
  deletePatientData, readAllPatientData, writeActivePatientID, readActivePatientID } from './database-ops';

// necessary firebase configuration setup
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

// necessary constants for various firebase functionalities (i.e. auth, database)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// create a new user
export function createANewUser(userName, email, password, firstName, lastName, medInsts, isAdminUser) {
  return new Promise((resolve, reject) => {
    createNewUser(auth, email, password)
      .then((userId) => {
        writeUserData(db, userId, userName, email, password, firstName, lastName, medInsts, isAdminUser)
          .then((_userDataWritten) => {
            resolve(userId);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// delete a user
export function deleteUser(email, password) {
  return new Promise((resolve, reject) => {
    signInAUser(email, password)
      .then((user) => {
        deleteUserData(db, user.uid)
          .then((_userDataDeleted) => {
            deleteAUser(auth, email)
              .then((userDeleted) => {
                resolve(userDeleted);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
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
      .catch((error) => {
        console.log(error);
        reject(null);
      });
  });
}

// get current user
export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    readUserData(db, auth.currentUser.uid)
      .then((userData) => {
        resolve(userData);
      })
      .catch((error) => {
        console.log(error);
        reject(null);
      });
  });
}

// get current user after initial authentication
export function getCurrentUserAfterInitAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        readUserData(db, user.uid)
          .then((userData) => {
            resolve(userData);
          })
          .catch((error) => {
            console.log(error);
            reject(null);
          });
      } else {
        reject(null);
      }
    });
  });
}

// create a patient's data
export function createANewPatient(patientId, mrn, firstName, lastName, dob, gender, contact, refPhys, lastVisit) {
  return new Promise((resolve, reject) => {
    writePatientData(db, patientId, mrn, firstName, lastName, dob, gender, contact, refPhys, lastVisit)
      .then((_patientDataWritten) => {
        resolve(patientId);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// delete a patient's data
export function deleteAPatientsData(patientId) {
  return new Promise((resolve, reject) => {
    deletePatientData(db, patientId)
      .then((_deleteSuccess) => {
        resolve(true);
      })
      .catch((_error) => {
        reject(false);
      });
  });
}

// read a patient's data
export function getAPatientsData(patientId) {
  return new Promise((resolve, reject) => {
    readPatientData(db, patientId)
      .then((patientData) => {
        if (patientData) {
          resolve(patientData);
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

// read all patient data
export function getAllPatientData() {
  return new Promise((resolve, reject) => {
    readAllPatientData(db)
      .then((patientData) => {
        if (patientData) {
          resolve(patientData);
        } else {
          reject(null);
        }
      })
      .catch((_error) => {
        reject(null);
      });
  });
}

// set active patient id
export function setActivePatientID(patientId) {
  return new Promise((resolve, reject) => {
    writeActivePatientID(db, patientId)
      .then((setSuccess) => {
        if (setSuccess) {
          resolve(true);
        }
        else {
          reject(false);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  });
}

// read active patient id
export function getActivePatientId() {
  return new Promise((resolve, reject) => {
    readActivePatientID(db)
      .then((patientID) => {
        if (patientID) {
          resolve(patientID);
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

// export all functions
// module.exports = { createANewUser, deleteUser, signInAUser, signOutAUser, getCurrentUser,
//   createANewPatient, getAPatientsData, deleteAPatientsData, getAllPatientData,
//   setActivePatientID, getActivePatientId };
