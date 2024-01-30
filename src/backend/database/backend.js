// import needed externally defined modules
const initializeApp = require("firebase/app").initializeApp;
const getAuth = require("firebase/auth").getAuth;

// import needed internally defined modules
const user_auth_mgmt = require("./user-auth-mgmt");

// backend module definition
var backend = (function () {
  // necessary firebase configuration setup
  const firebaseConfig = {
    apiKey: "AIzaSyB5RHIQl0a8nzZ2bMUwTMJ6XNYWciBaneM",
    authDomain: "chest-x-ray-ai-f0b4a.firebaseapp.com",
    databaseURL: "https://chest-x-ray-ai-f0b4a-default-rtdb.firebaseio.com",
    projectId: "chest-x-ray-ai-f0b4a",
    storageBucket: "chest-x-ray-ai-f0b4a.appspot.com",
    messagingSenderId: "106488932425",
    appId: "1:106488932425:web:74c67977d47848d27f3798",
    measurementId: "G-085B846RRX",
  };

  // necessary constants for various firebase functionalities (i.e. backend authentication, databases, etc.)
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // list function definitions here

  // create new user
  var createNewUser = (email, password) => {
    user = user_auth_mgmt.createNewUser(auth, email, password);
    return user.uid;
  }

  // delete user
  var deleteTheUser = (user) => {
    userDeleted = user_auth_mgmt.deleteTheUser(user);
    return userDeleted;
  }

  // sign in user
  var signInUser = (email, password) => {
    user = user_auth_mgmt.signInUser(auth, email, password);
    return user;
  }

  // export public functions
  return {
    // list public functions here
    createNewUser: createNewUser,
    deleteTheUser: deleteTheUser,
    signInUser: signInUser
  }
})();

// export the module
module.exports = backend;
