// import backend module for testing
const { createANewUser, deleteUser, signInAUser, signOutAUser, getCurrentUser,
  createANewPatient, getAPatientsData, deleteAPatientsData, getAllPatientData,
  setActivePatientID, getActivePatientId } = require('./backend');

// define backend module unit tests here

// creates new staff user
test('Create Staff User 099', async () => {
  await createANewUser("StaffUser99", "staff.user99@mailsac.com", "atom!@#", "Staff", "User99", [], false)
    .then((user_id) => {
      expect(user_id).not.toBeNull();
    })
    .catch((error) => console.log(error));
});

// signs in new staff user
test('Sign In Staff User 099', async () => {
  await signInAUser("staff.user99@mailsac.com", "atom!@#")
    .then((user) => {
      expect(user).not.toBeNull();
      expect(user.userName).toBe("StaffUser99");
      expect(user.email).toBe("staff.user99@mailsac.com");
      expect(user.password).toBe("atom!@#");
      expect(user.firstName).toBe("Staff");
      expect(user.lastName).toBe("User99");
    })
    .catch((error) => console.log(error));
});

// gets current user
test('Get Current User', async () => {
  await signInAUser("staff.user99@mailsac.com", "atom!@#")
    .then(() => {
      getCurrentUser()
        .then((userData) => {
          expect(userData).not.toBeNull();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

// creates a new patient
test('Create New Patient 99', async () => {
  await createANewPatient(99, 99, "Patient", "No99", "03-30-2001", "M", "404-404-4040", "Dr. Mehdi Moradi", "03-30-2021")
    .then((patientId) => {
      expect(patientId).toBe(99);
    })
    .catch((error) => console.log(error));
});

// retrieves a patient's data
test('Retrieve Patient 99 Data', async () => {
  await getAPatientsData(99)
    .then((patient) => {
      expect(patient).not.toBeNull();
      expect(patient.mrn).toBe(99);
      expect(patient.firstName).toBe("Patient");
      expect(patient.lastName).toBe("No99");
      expect(patient.dob).toBe("03-30-2001");
      expect(patient.gender).toBe("M");
      expect(patient.contact).toBe("404-404-4040");
      expect(patient.refPhys).toBe("Dr. Mehdi Moradi");
      expect(patient.lastVisit).toBe("03-30-2021");
    })
    .catch((error) => console.log(error));
});

// set active patient id
test('Set Active Patient ID', async () => {
  await setActivePatientID(99)
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// retrieve active patient id
test('Retrieve Active Patient ID', async () => {
  await getActivePatientId()
    .then((patientId) => {
      expect(patientId).toBe(99);
    })
    .catch((error) => console.log(error));
});

// deletes a patient's data
test('Delete Patient 99 Data', async () => {
  await deleteAPatientsData(99)
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// attempts to retrieve non-existent patient's data
test('Retrieve Non-Existent Patient Data', async () => {
  await getAPatientsData(99)
    .then((patient) => {
      expect(patient).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// attempts to delete non-existent patient's data
test('Delete Non-Existent Patient Data', async () => {
  await deleteAPatientsData(999)
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// retrieves all patient data
test('Retrieve All Patient Data', async () => {
  await getAllPatientData()
    .then((patients) => {
      expect(patients).not.toBeNull();
    })
    .catch((error) => console.log(error));
});

// signs out new staff user
test('Sign Out Staff User 099', async () => {
  await signOutAUser()
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// deletes new staff user
test('Delete Staff User 099', async () => {
  await deleteUser("staff.user99@mailsac.com", "atom!@#")
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// attempts to create user with invalid email
test('Create User with Invalid Email', async () => {
  await createANewUser("StaffUser99", "staff.user99mailsac.com", "atom!@#", "Staff", "User99", [], false)
    .then((user_id) => {
      expect(user_id).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// attempts to delete user with invalid email
test('Delete User with Invalid Email', async () => {
  await deleteUser("staff.user99mailsac.com", "atom!@#")
    .then((result) => {
      expect(result).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});
