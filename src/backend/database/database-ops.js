/*
  Module Name: DatabaseOps
  Author(s): Nathaniel Hu
  Date Modified: 2024-04-04
  Description: Contains database operations functionality to read and write user
               and patient data
*/

// import needed externally defined modules
import { ref, set, child, get } from "firebase/database";

// write user data
export async function writeUserData(
  db,
  userId,
  userName,
  email,
  password,
  firstName,
  lastName,
  medInsts,
  isAdminUser,
) {
  return new Promise((resolve, reject) => {
    const writeUserDataRef = ref(db, `users/${userId}`);
    set(writeUserDataRef, {
      userName: userName,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      medInsts: medInsts,
      isAdminUser: isAdminUser,
    })
      .then(() => {
        resolve(true);
      })
      .catch((_error) => {
        reject(false);
      });
  });
}

// read user data
export async function readUserData(db, userId) {
  return new Promise((resolve, reject) => {
    const readUserDataRef = ref(db);
    get(child(readUserDataRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const rawUserData = snapshot.val();
          var userData = transformRawUserData(rawUserData);
          userData["uid"] = userId;
          resolve(userData);
        } else {
          reject(null);
        }
      })
      .catch((_error) => {
        reject(null);
      });
  });
}

// delete user data
export async function deleteUserData(db, userId) {
  return new Promise((resolve, reject) => {
    const deleteUserDataRef = ref(db, `users/${userId}`);
    set(deleteUserDataRef, null)
      .then(() => {
        resolve(true);
      })
      .catch((_error) => {
        reject(false);
      });
  });
}

// transform raw user data
function transformRawUserData(rawUserData) {
  const fields = [
    "userName",
    "email",
    "password",
    "firstName",
    "lastName",
    "medInsts",
    "isAdminUser",
  ];
  var userData = new Object();
  for (var field of fields) {
    if (rawUserData[field] != null) {
      userData[field] = rawUserData[field];
    } else {
      userData[field] = "-";
    }
  }
  return userData;
}

// write patient data
export async function writePatientData(
  db,
  patientId,
  mrn,
  firstName,
  lastName,
  dob,
  gender,
  contact,
  refPhys,
  lastVisit,
) {
  return new Promise((resolve, reject) => {
    const writePatientDataRef = ref(db, `patientsData/${patientId}`);
    set(writePatientDataRef, {
      mrn: mrn,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      gender: gender,
      contact: contact,
      refPhys: refPhys,
      lastVisit: lastVisit,
    })
      .then(() => {
        resolve(true);
      })
      .catch((_error) => {
        reject(false);
      });
  });
}

// read patient data
export async function readPatientData(db, patientId) {
  return new Promise((resolve, reject) => {
    const readPatientDataRef = ref(db);
    get(child(readPatientDataRef, `patientsData/${patientId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let patientData = snapshot.val();
          patientData["patientID"] = patientId;
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

// delete patient data
export async function deletePatientData(db, patientId) {
  return new Promise((resolve, reject) => {
    const deletePatientDataRef = ref(db, `patientsData/${patientId}`);
    set(deletePatientDataRef, null)
      .then(() => {
        resolve(true);
      })
      .catch((_error) => {
        reject(false);
      });
  });
}

// get all patients data
export async function readAllPatientData(db) {
  return new Promise((resolve, reject) => {
    const readAllPatientDataRef = ref(db);
    let patientsData = [];
    get(child(readAllPatientDataRef, "patientsData"))
      .then((patients) => {
        patients.forEach((pt) => {
          patientsData.push(addPatientAsListItem(pt));
        });
        if (patientsData) {
          resolve(patientsData);
        } else {
          reject(null);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(null);
      });

    function addPatientAsListItem(pt) {
      let key = pt.key;
      let value = pt.val();
      value["patientID"] = key;
      return value;
    }
  });
}

// write active patient id
export async function writeActivePatientID(db, patientId) {
  return new Promise((resolve, reject) => {
    const writeActivePatientIDRef = ref(db, "activePatient");
    set(writeActivePatientIDRef, {
      patientID: patientId,
    }).catch((_error) => {
      reject(false);
    });
  });
}

// read active patient id
export async function readActivePatientID(db) {
  return new Promise((resolve, reject) => {
    const readActivePatientIDRef = ref(db, "activePatient");
    get(child(readActivePatientIDRef, "patientID"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let patientID = snapshot.val();
          resolve(patientID);
        } else {
          reject(null);
        }
      })
      .catch((_error) => {
        reject(null);
      });
  });
}
