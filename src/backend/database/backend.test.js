// import backend module for testing
const backend = require('./backend');

// define backend module unit tests here
test('Create Staff User 004', () => {
  user_id = backend.createNewUser("staff.user4@mailsac.com", "atom!@#");
  expect(user_id).not.toBeNull();
});

test('Sign In Staff User 004', () => {
  user = backend.signInUser("staff.user4@mailsac.com", "atom!@#");
  expect(user).not.toBeNull();
});
