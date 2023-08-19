import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiD9IQQeWG8E94DmE2y-w3Ddt3f1_y4iM",
    authDomain: "thread-44691.firebaseapp.com",
    projectId: "thread-44691",
    storageBucket: "thread-44691.appspot.com",
    messagingSenderId: "1011750343430",
    appId: "1:1011750343430:web:e47456812bee562cbd4487"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.querySelector("#fname").value;
  const lastName = document.querySelector("#lname").value;
  const emailInput = document.querySelector("#email").value;
  const passwordInput = document.querySelector("#password").value;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, emailInput, passwordInput)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      await updateProfile(auth.currentUser, {
        displayName: firstName,
      })
        .then(() => {
          // Profile updated!
          // ...
          const currentUserName = user.displayName;
          sessionStorage.setItem("currentUserName", currentUserName);
          displayAlert("SignUp Successfully", "green");
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
      const currentUserUID = user.uid;
      console.log(currentUserUID);
      sessionStorage.setItem("currentUserUID", currentUserUID);
      setTimeout(() => {
        location.assign("login.html");
      }, 2000);
      signupForm.reset();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      displayAlert(errorMessage, "red");

      // ..
    });
});
const alertBox = document.querySelector("#alertBox");
const displayAlert = (txt, clss) => {
  alertBox.textContent = txt;
  alertBox.classList.add(clss);
  // remove alert
  setTimeout(() => {
    alertBox.textContent = "";
    alertBox.classList.remove(clss);
  }, 2000);
};