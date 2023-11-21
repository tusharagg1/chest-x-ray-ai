import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB5RHIQl0a8nzZ2bMUwTMJ6XNYWciBaneM",
    authDomain: "chest-x-ray-ai-f0b4a.firebaseapp.com",
    databaseURL: "https://chest-x-ray-ai-f0b4a-default-rtdb.firebaseio.com",
    projectId: "chest-x-ray-ai-f0b4a",
    storageBucket: "chest-x-ray-ai-f0b4a.appspot.com",
    messagingSenderId: "106488932425",
    appId: "1:106488932425:web:74c67977d47848d27f3798",
    measurementId: "G-085B846RRX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

/**
 * The primary way of writing the user's data to the database.
 * 
 * @param {string}   userId    User's user id.
 * @param {string}   userName  User's username.
 * @param {string}   password  User's password.
 * @param {string}   email     User's email address.
 * @param {string}   firstName User's first name.
 * @param {string}   lastName  User's last name.
 * @param {[string]} medInsts  User's associated medical institution(s).
 */
export function writeUserData(userId, userName, password, email, firstName, lastName, medInsts) {
    const writeUserRef = ref(db, `users/${userId}`);
    set(writeUserRef, {
        userName: userName,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        medInsts: medInsts
    });
}

/**
 * The primary way of retrieving the user's saved data from the database.
 * 
 * @param {string}  userId           User's user id.
 * @param {boolean} [onlyOnce=false] Set to true to retrieve the user's data once. Otherwise (default) set to false to also retrieve updates.
 * 
 * @returns {object} User's saved data from the database.
 */
export function getUserData(userId, onlyOnce = false) {
    const getUserRef = ref(db, `users/${userId}`);
    var userData;
    onValue(getUserRef, (snapshot) => {
        userData = snapshot.val();
        console.log("UserId: %s\nUserName: %s\nPassword: %s\nEmail: %s\nFirst Name: %s\nLast Name: %s\nMedical Institution(s): %s",
            userId, userData.userName, userData.password, userData.email, userData.firstName, userData.lastName, userData.medInsts);
    }, {
        onlyOnce: onlyOnce
    });

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
export function writePatientData(patientId, firstName, lastName, email, patientDiseaseRisks = {}) {
    const writePatientRef = ref(db, `patients/${patientId}`);
    set(writePatientRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        patientDiseaseRisks: patientDiseaseRisks
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
    const getPatientRef = ref(db, `patients/${patientId}`);
    var patientData;
    onValue(getPatientRef, (snapshot) => {
        patientData = snapshot.val();
        console.log("PatientId: %s\nFirst Name: %s\nLast Name: %s\nEmail: %s\nPatient Disease Risks: %s",
            patientId, patientData.firstName, patientData.lastName, patientData.email, patientData.patientDiseaseRisks);
    }, {
        onlyOnce: onlyOnce
    });

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
export function writeScanResultsData(scanResultsId, patientId, firstName, lastName, email, patientDiseaseRisks, chestXrayImage) {
    const writeScanResultsRef = ref(db, `scanResults/${scanResultsId}`);
    set(writeScanResultsRef, {
        patientId: patientId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        patientDiseaseRisks: patientDiseaseRisks,
        chestXrayImage: chestXrayImage
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
    const getScanResultsRef = ref(db, `scanResults/${scanResultsId}`);
    var scanResultsData;
    onValue(getScanResultsRef, (snapshot) => {
        scanResultsData = snapshot.val();
        console.log("ScanResultsId: %s\nPatientId: %s\nFirst Name: %s\nLast Name: %s\nEmail: %s\nPatient Disease Risks: %s\nChest X-Ray Image (URL): %s",
            scanResultsId, scanResultsData.patientId, scanResultsData.firstName, scanResultsData.lastName, scanResultsData.patientDiseaseRisks, scanResultsData.chestXrayImage);
    }, {
        onlyOnce: onlyOnce
    });

    return scanResultsData;
}
