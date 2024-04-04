/*
  Module Tested: DatabaseOps
  Author(s): Nathaniel Hu
  Last Modified Date: 2024-04-04
  Description: Contains unit tests defined for testing the DatabaseOps module
*/

// import database-ops module for testing
const { writeUserData, readUserData, deleteUserData, writePatientData,
  readPatientData, deletePatientData, readAllPatientData, writeActivePatientID,
readActivePatientID } = require('./database-ops');

// import user-auth-mgmt module functions for testing
const { createNewUser, deleteAUser } = require('./user-auth-mgmt');

import { error } from "console";
// import necessary firebase configuration setup
import { auth, db } from "./backend-config";

// BT18. Write User Data Unauthenticated
test('BT18. Write User Data Unauthenticated', async () => {
  await writeUserData(db, "74c16ea1d4e62e2d6cd5a0fb5e04", "StaffUser88",
    "staff.user88@mailsac.com", "atom!@#", "Staff", "User88", [], false
  )
  .then((userDataWritten) => {
    expect(userDataWritten).toBe(false);
  })
  .catch((error) => expect(error).toBe(false));
});

// BT19. Read User Data Unauthenticated
test('BT19. Read User Data Unauthenticated', async () => {
  await readUserData(db, "74c16ea1d4e62e2d6cd5a0fb5e04")
    .then((userData) => {
      expect(userData).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT20. Delete User Data Unauthenticated
test('BT20. Delete User Data Unauthenticated', async () => {
  await deleteUserData(db, "74c16ea1d4e62e2d6cd5a0fb5e04")
    .then((userDataDeleted) => {
      expect(userDataDeleted).toBe(false);
    })
    .catch((error) => expect(error).toBe(false));
});

// BT21. Write Patient Data Unauthenticated
test('BT21. Write Patient Data Unauthenticated', async () => {
  await writePatientData(db, 88, 88, "Patient", "No88", "03-30-2001", "M",
    "404-404-4040", "Dr. Mehdi Moradi", "03-30-2021"
  )
  .then((patientDataWritten) => {
    expect(patientDataWritten).toBe(false);
  })
  .catch((error) => expect(error).toBe(false));
});

// BT22. Read Patient Data Unauthenticated
test('BT22. Read Patient Data Unauthenticated', async () => {
  await readPatientData(db, 88)
    .then((patientData) => {
      expect(patientData).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT23. Delete Patient Data Unauthenticated
test('BT23. Delete Patient Data Unauthenticated', async () => {
  await deletePatientData(db, 88)
    .then((deletionSuccess) => {
      expect(deletionSuccess).toBe(false);
    })
    .catch((error) => expect(error).toBe(false));
});

// BT24. Read All Patient Data Unauthenticated
test('BT24. Read All Patient Data Unauthenticated', async () => {
  await readAllPatientData(db)
    .then((allPatientData) => {
      expect(allPatientData).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT25. Write Active Patient ID Unauthenticated
test('BT25. Write Active Patient ID Unauthenticated', async() => {
  await writeActivePatientID(db, 88)
    .then((writeSuccess) => {
      expect(writeSuccess).toBe(false);
    })
    .catch((error) => expect(error).toBe(false));
});

// BT26. Read Active Patient ID Unauthenticated
test('BT26. Read Active Patient ID Unauthenticated', async () => {
  await readActivePatientID(db)
    .then((patientId) => {
      expect(patientId).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT27. Read Non-Existent User Data Authenticated
test('BT27. Read Non-Existent User Data', async () => {
  await createNewUser(auth, "staff.user88@mailsac.com", "atom!@#")
    .then((user_id) => {
      expect(user_id).not.toBeNull();
      readUserData(db, user_id)
        .then((userData) => {
          expect(userData).toBeNull();
        })
        .catch((error) => {
          expect(error).toBeNull();
          deleteAUser(auth, "staff.user88@mailsac.com")
            .then((userDeleted) => {
              expect(userDeleted).toBe(true);
            })
            .catch((error) => console.log(error));
        });
    })
    .catch((error) => console.log(error));
});
