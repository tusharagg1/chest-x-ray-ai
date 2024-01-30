// import needed externally defined modules
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

// user-auth-mgmt module definition
var user_auth_mgmt = (function () {
  // list function definitions here

  // create new user
  var createNewUser = async (auth, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((_error) => {
        return null;
      });
  }

  // delete user
  var deleteTheUser = async (user) => {
    await user.delete()
      .then(() => {
        return true;
      })
      .catch((_error) => {
        return false;
      });
  };

  // sign in user
  var signInUser = async (auth, email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((_error) => {
        return null;
      });
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
module.exports = user_auth_mgmt;
