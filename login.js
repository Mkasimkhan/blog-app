import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
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
  const signupForm = document.querySelector("#login");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.querySelector("#email").value;
    const passwordInput = document.querySelector("#password").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
      .then((userCredential) => {
        // Signed in
        displayAlert("Login Successfully", "green");
        const user = userCredential.user;
        console.log(user);
        const currentUserUID = user.uid;
        const currentUserName = user.displayName;
        sessionStorage.setItem("currentUserUID", currentUserUID);
        sessionStorage.setItem("currentUserName", currentUserName);
        setTimeout(() => {
          location.assign("home.html");
        }, 2000);
        // ...
        signupForm.reset();
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