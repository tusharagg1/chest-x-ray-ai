/*
  Module Tested: UserAuthMgmt
  Author(s): Nathaniel Hu
  Last Modified Date: 2024-04-04
  Description: Contains unit tests defined for testing the UserAuthMgmt module
*/

// import user-auth-mgmt module for testing
const { deleteAUser, signOutUser } = require("./user-auth-mgmt");

// import necessary firebase configuration setup
import { auth } from "./backend-config";

// BT28. Delete User Unauthenticated
test("BT28. Delete User Unauthenticated", async () => {
  await deleteAUser(auth, "staff.user77@mailsac.com")
    .then((deleteSuccess) => {
      expect(deleteSuccess).toBeNull();
    })
    .catch((error) => expect(error).toBeNull());
});

// BT29. Sign Out User Unauthenticated
test("BT29. Sign Out User Unauthenticated", async () => {
  await signOutUser(auth)
    .then((signOutSuccess) => {
      expect(signOutSuccess).toBe(true);
    })
    .catch((error) => console.log(error));
});
