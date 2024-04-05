// import necessary libraries and functions
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref as refd,
  set,
  onValue,
  update,
} from "firebase/database";
import {
  getStorage,
  ref as refs,
  uploadBytes,
  listAll,
} from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  reload,
} from "firebase/auth";
import { useState } from "react";

// necessary firebase configuration setup
const firebaseConfig = {
  apiKey: "AIzaSyB5RHIQl0a8nzZ2bMUwTMJ6XNYWciBaneM",
  authDomain: "chest-x-ray-ai-f0b4a.firebaseapp.com",
  databaseURL: "https://chest-x-ray-ai-f0b4a-default-rtdb.firebaseio.com",
  projectId: "chest-x-ray-ai-f0b4a",
  storageBucket: "chest-x-ray-ai-f0b4a.appspot.com",
  messagingSenderId: "106488932425",
  appId: "1:106488932425:web:74c67977d47848d27f3798",
  measurementId: "G-085B846RRX",
};

// necessary constants for various firebase functionalities (i.e. backend authentication, databases, etc.)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

/**
 * The primary way of creating a new user (account). This function also populates the user's data into the database.
 *
 * @param {string} userName   User's user id (uid).
 * @param {string} email      User's username.
 * @param {string} password   User's email address.
 * @param {string} firstName  User's first name.
 * @param {string} lastName   User's last name.
 * @param {[string]} medInsts User's associated medical institution(s).
 */
export const createNewUser = async (
  userName,
  email,
  password,
  firstName,
  lastName,
  medInsts,
) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (userCredentials.user != null) {
      updateProfile(userCredentials.user, { userName });
      await reload(userCredentials.user);
      // console.log(userCredentials.user);
    }
    writeUserData(
      userCredentials.user.uid,
      userName,
      email,
      firstName,
      lastName,
      medInsts,
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * The primary way of logging in as a specific user.
 *
 * @param {string} email    User's email address.
 * @param {string} password User's password.
 * @param {function} func   Any other functions to be run after user successfully logs in.
 */
export const loginUser = async (email, password, func = null) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // console.log(userCredentials.user);
    func();
  } catch (error) {
    console.log(error);
  }
};

/**
 * The primary way of logging out a specific user.
 *
 * @param {string} email User's email address.
 */
export const logoutUser = async (email) => {
  if (auth.currentUser && auth.currentUser.email == email) {
    await signOut(auth)
      .then(() => {
        console.log("User %s was logged out.", email);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("User %s is not currently logged in.", email);
  }
};

// listener for monitoring the authentication state of the current user (i.e. logged in or not)
export const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User %s is currently logged in", user.email);
      return true;
    } else {
      console.log("No user currently logged in.");
      return false;
    }
  });
};

/**
 * The primary way of writing the user's data to the database.
 *
 * @param {string}   userId    User's user id (uid).
 * @param {string}   userName  User's username.
 * @param {string}   email     User's email address.
 * @param {string}   firstName User's first name.
 * @param {string}   lastName  User's last name.
 * @param {[string]} medInsts  User's associated medical institution(s).
 */
export async function writeUserData(
  userId,
  userName,
  email,
  firstName,
  lastName,
  medInsts,
) {
  const writeUserRef = refd(db, `users/${userId}`);
  set(writeUserRef, {
    userName: userName,
    email: email,
    firstName: firstName,
    lastName: lastName,
    medInsts: medInsts,
  })
    .then(() => {
      console.log(
        "User data for %s was written to the database successfully!",
        userName,
      );
    })
    .catch((error) => {
      console.log(
        "User data for %s was not written to the database successfully. The following error was returned:\n%s",
        userName,
        error,
      );
    });
}

/**
 * The primary way of retrieving the user's saved data from the database.
 *
 * @param {string}  userId           User's user id (uid).
 * @param {boolean} [onlyOnce=false] Set to true to retrieve the user's data once. Otherwise (default) set to false to also retrieve updates.
 *
 * @returns {object} User's saved data from the database.
 */
export function getUserData(userId, onlyOnce = false) {
  const getUserRef = refd(db, `users/${userId}`);
  var userData;
  onValue(
    getUserRef,
    (snapshot) => {
      userData = snapshot.val();
      console.log(
        "UserId: %s\nUserName: %s\nEmail: %s\nFirst Name: %s\nLast Name: %s\nMedical Institution(s): %s",
        userId,
        userData.userName,
        userData.email,
        userData.firstName,
        userData.lastName,
        userData.medInsts,
      );
    },
    {
      onlyOnce: onlyOnce,
    },
  );

  return userData;
}

/**
 * The primary way of writing the patient's data to the database.
 *
 * @param {string}           patientId           Patient's patient id.
 * @param {string}           firstName           Patient's first name.
 * @param {string}           lastName            Patient's last name.
 * @param {string}           email               Patient's email address.
 * @param {{string, number}} patientDiseaseRisks Patient's risks for each disease. This set of values is regularly updated with the results from the latest chest x-ray AI scan.
 */
export function writePatientData(
  patientId,
  firstName,
  lastName,
  email,
  patientDiseaseRisks = {},
) {
  const writePatientRef = refd(db, `patients/${patientId}`);
  set(writePatientRef, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    patientDiseaseRisks: patientDiseaseRisks,
  })
    .then(() => {
      console.log(
        "Patient data for %s was written to the database successfully!",
        patientId,
      );
    })
    .catch((error) => {
      console.log(
        "Patient data for %s was not written to the database successfully. The following error was returned:\n%s",
        patientId,
        error,
      );
    });
}

/**
 * The primary way of retrieving the patient's saved data from the database.
 *
 * @param {string}  patientId        Patient's patient id.
 * @param {boolean} [onlyOnce=false] Set to true to retrieve the patient's data once. Otherwise (default) set to false to also retrieve updates.
 *
 * @returns {object} Patient's saved data from the database.
 */
export function getPatientData(patientId, onlyOnce = false) {
  const getPatientRef = refd(db, `patients/${patientId}`);
  var patientData;
  onValue(
    getPatientRef,
    (snapshot) => {
      patientData = snapshot.val();
      console.log(
        "PatientId: %s\nFirst Name: %s\nLast Name: %s\nEmail: %s\nPatient Disease Risks: %s",
        patientId,
        patientData.firstName,
        patientData.lastName,
        patientData.email,
        patientData.patientDiseaseRisks,
      );
    },
    {
      onlyOnce: onlyOnce,
    },
  );

  return patientData;
}

/**
 * The primary way of writing the AI scan results' data to the database.
 *
 * @param {string} scanResultsId       AI scan results' scan results id.
 * @param {string} patientId           Patient's patient id.
 * @param {string} firstName           Patient's first name.
 * @param {string} lastName            Patient's last name.
 * @param {string} email               Patient's email address.
 * @param {string} patientDiseaseRisks Patient's risks for each disease. This set of values is also propagated to the patient's saved data.
 * @param {string} chestXrayImage      The URL for the patient's chest x-ray image that was scanned and annotated by the AI to produce the scan results.
 */
export function writeScanResultsData(
  scanResultsId,
  patientId,
  firstName,
  lastName,
  email,
  patientDiseaseRisks,
  chestXrayImage,
) {
  const writeScanResultsRef = refd(db, `scanResults/${scanResultsId}`);
  set(writeScanResultsRef, {
    patientId: patientId,
    firstName: firstName,
    lastName: lastName,
    email: email,
    patientDiseaseRisks: patientDiseaseRisks,
    chestXrayImage: chestXrayImage,
  })
    .then(() => {
      console.log(
        "Scan results data for %s for %s was written to the database successfully!",
        scanResultsId,
        userId,
      );
    })
    .catch((error) => {
      console.log(
        "Scan results data for %s for %s was not written to the database successfully. The following error was returned:\n%s",
        scanResultsId,
        userId,
        error,
      );
    });

  const updates = {};
  updates[`/patients/${patientId}/patientDiseaseRisks`] = patientDiseaseRisks;
  update(ref(db), updates);
}

/**
 * The primary way of retrieving the AI scan results' saved data from the database.
 *
 * @param {string} scanResultsId    AI scan results' scan results id.
 * @param {string} [onlyOnce=false] Set to true to retrieve the AI scan results' data once. Otherwise set to false to also retrieve updates.
 *
 * @returns {object} AI scan results' saved data from the database.
 */
export function getScanResultsData(scanResultsId, onlyOnce = false) {
  const getScanResultsRef = refd(db, `scanResults/${scanResultsId}`);
  var scanResultsData;
  onValue(
    getScanResultsRef,
    (snapshot) => {
      scanResultsData = snapshot.val();
      console.log(
        "ScanResultsId: %s\nPatientId: %s\nFirst Name: %s\nLast Name: %s\nEmail: %s\nPatient Disease Risks: %s\nChest X-Ray Image (URL): %s",
        scanResultsId,
        scanResultsData.patientId,
        scanResultsData.firstName,
        scanResultsData.lastName,
        scanResultsData.patientDiseaseRisks,
        scanResultsData.chestXrayImage,
      );
    },
    {
      onlyOnce: onlyOnce,
    },
  );

  return scanResultsData;
}

// WIP code
export function uploadPatientXrayImage(scanId, xrayImageUpload) {
  const [xrayImageUpload, setXrayImageUpload] = useState(null);
  const uploadXrayImage = () => {
    if (xrayImageUpload == null) return;
    const xrayImageRef = refs(storage, `chest-xrays/${scanId}.jpg`);
    uploadBytes(xrayImageRef, xrayImageUpload).then(() => {
      console.log("Image %s.jpg uploaded successfully.", scanId);
    });
  };

  return (
    <div className="uploadXrayImage">
      <input
        type="file"
        onChange={(event) => {
          setXrayImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadXrayImage}>Upload Chest X-ray Image</button>
    </div>
  );
}

// export const imagePaths = listAll();
