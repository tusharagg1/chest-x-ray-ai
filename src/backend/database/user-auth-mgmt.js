// import needed externally defined modules
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";

// create a new user
export function createNewUser(auth, email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        resolve(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(null);
      });
  });
}

// delete a user
export async function deleteAUser(auth, email, password) {
  const user = auth.currentUser;

  if (user === null || user.email !== email || user.password !== password) {
    return false;
  }

  await deleteUser(user).then(() => {
    // User deleted.
    return true;
  }).catch((_error) => {
    // An error happened.
    return false;
  });
}

// sign in a user
export function signInUser(auth, email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        resolve(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(null);
      });
  });
}

// sign out a user
export function signOutUser(auth) {
  return new Promise((resolve, reject) => {
    auth.signOut().then(() => {
      // Sign-out successful.
      resolve(true);
    }).catch((_error) => {
      // An error happened.
      reject(false);
    });
  });
}
