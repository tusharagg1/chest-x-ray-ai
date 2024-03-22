// import needed externally defined modules
import { ref, set, child, get } from 'firebase/database';

// write user data
export async function writeUserData(db, userId, userName, email, password, firstName, lastName, medInsts, isAdminUser) {
  const writeUserDataRef = ref(db, `users/${userId}`);
  await set(writeUserDataRef, {
    userName: userName,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    medInsts: medInsts,
    isAdminUser: isAdminUser
  })
  .then(() => {
    return true;
  })
  .catch((_error) => {
    return false;
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

// transform raw user data
function transformRawUserData(rawUserData) {
  const fields = ["userName", "email", "password", "firstName", "lastName", "medInsts", "isAdminUser"];
  var userData = new Object();
  for (var field of fields) {
    if (rawUserData[field] != null) {
      userData[field] = rawUserData[field];
    }
    else {
      userData[field] = "-";
    }
  }
  return userData;
}

// write patient data
export async function writePatientData(db, patientId, mrn, firstName, lastName, email, dob, gender, phone, refPhys, lastVisit, notes) {
  const writePatientDataRef = ref(db, `patients/${patientId}`);
  await set(writePatientDataRef, {
    mrn: mrn,
    firstName: firstName,
    lastName: lastName,
    email: email,
    dob: dob,
    gender: gender,
    phone: phone,
    refPhys: refPhys,
    lastVisit: lastVisit,
    notes: notes
  })
  .then(() => {
    return true;
  })
  .catch((_error) => {
    return false;
  });
}

// read patient data
export async function readPatientData(db, patientId) {
  return new Promise((resolve, reject) => {
    const readPatientDataRef = ref(db);
    get(child(readPatientDataRef, `patients/${patientId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const patientData = snapshot.val();
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

// get all patients data
export async function readAllPatientData(db) {
  return new Promise((resolve, reject) => {
    const readAllPatientDataRef = ref(db);
    let patientsData = [];
    get(child(readAllPatientDataRef, 'patientsData')).then((patients) => {
      patients.forEach(pt => {
        patientsData.push(addPatientAsListItem(pt));
      });
      if (patientsData) {
        resolve(patientsData);
      } else {
        reject(null);
      }
    }).catch((error) => {
      console.log(error);
      reject(null);
    });

    function addPatientAsListItem(pt) {
      let key = pt.key;
      let value = pt.val();
      value["patientID"] = key;
      return value;
    }
  })
}
