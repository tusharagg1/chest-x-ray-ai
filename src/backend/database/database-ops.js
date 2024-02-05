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
          const userData = snapshot.val();
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
