/*
  Module Tested: Backend
  Author(s): Nathaniel Hu
  Last Modified Date: 2024-04-03
  Description: Contains unit tests defined for testing the Backend module
*/

// import backend module for testing
const {
  createANewUser,
  deleteUser,
  signInAUser,
  signOutAUser,
  getCurrentUser,
  createANewPatient,
  getAPatientsData,
  deleteAPatientsData,
  getAllPatientData,
  setActivePatientId,
  getActivePatientId,
} = require("./backend");

// BT01. Create a new Staff User
test("BT01. Create Staff User", async () => {
  await createANewUser(
    "StaffUser99",
    "staff.user99@mailsac.com",
    "atom!@#",
    "Staff",
    "User99",
    [],
    false,
  )
    .then((user_id) => {
      expect(user_id).not.toBeNull();
    })
    .catch((error) => console.log(error));
});

// BT02. Sign In a new Staff User
test("BT02. Sign In Staff User", async () => {
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

// BT03. Get the Current User
test("BT03. Get Current User", async () => {
  await signInAUser("staff.user99@mailsac.com", "atom!@#")
    .then(() => {
      getCurrentUser()
        .then((user) => {
          expect(user).not.toBeNull();
          expect(user.userName).toBe("StaffUser99");
          expect(user.email).toBe("staff.user99@mailsac.com");
          expect(user.password).toBe("atom!@#");
          expect(user.firstName).toBe("Staff");
          expect(user.lastName).toBe("User99");
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

// BT04. Create a new Patient Record
test("BT04. Create Patient Record", async () => {
  await createANewPatient(
    99,
    99,
    "Patient",
    "No99",
    "03-30-2001",
    "M",
    "404-404-4040",
    "Dr. Mehdi Moradi",
    "03-30-2021",
  )
    .then((patientId) => {
      expect(patientId).toBe(99);
    })
    .catch((error) => console.log(error));
});

// BT05. Retrieve Patient Record
test("BT05. Retrieve Patient Record", async () => {
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

// BT06. Set Active Patient ID
test("BT06. Set Active Patient ID", async () => {
  await setActivePatientId(99)
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// BT07. Retrieve Active Patient ID
test("BT07. Retrieve Active Patient ID", async () => {
  await getActivePatientId()
    .then((patientId) => {
      expect(patientId).toBe(99);
    })
    .catch((error) => console.log(error));
});

// BT08. Delete Patient Record
test("BT08. Delete Patient Record", async () => {
  await deleteAPatientsData(99)
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// BT09. Retrieve Non-Existent Patient Record
test("BT09. Retrieve Non-Existent Patient Record", async () => {
  await getAPatientsData(99)
    .then((patient) => {
      expect(patient).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT10. Delete Non-Existent Patient Record
test("BT10. Delete Non-Existent Patient Record", async () => {
  await deleteAPatientsData(999)
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// BT11. Retrieve All Patient Records
test("BT11. Retrieve All Patient Records", async () => {
  await getAllPatientData()
    .then((patients) => {
      expect(patients).not.toBeNull();
    })
    .catch((error) => console.log(error));
});

// BT12. Sign Out the new Staff User
test("BT12. Sign Out Staff User", async () => {
  await signOutAUser()
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// BT13. Sign In Staff User with Invalid Email
test("BT13. Sign In Staff User with Invalid Email", async () => {
  await signInAUser("staff.user99mailsac.com", "atom!@#")
    .then((user) => {
      expect(user).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT14. Sign In Staff User with Incorrect Password
test("BT14. Sign In Staff User with Incorrect Password", async () => {
  await signInAUser("staff.user99@mailsac.com", "atom!@")
    .then((user) => {
      expect(user).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT15. Delete new Staff User
test("BT15. Delete Staff User", async () => {
  await deleteUser("staff.user99@mailsac.com", "atom!@#")
    .then((result) => {
      expect(result).toBe(true);
    })
    .catch((error) => console.log(error));
});

// BT16. Create Staff User with Invalid Email
test("BT16. Create Staff User with Invalid Email", async () => {
  await createANewUser(
    "StaffUser99",
    "staff.user99mailsac.com",
    "atom!@#",
    "Staff",
    "User99",
    [],
    false,
  )
    .then((user_id) => {
      expect(user_id).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT17. Delete Staff User with Invalid Email
test("BT17. Delete Staff User with Invalid Email", async () => {
  await deleteUser("staff.user99mailsac.com", "atom!@#")
    .then((result) => {
      expect(result).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});
